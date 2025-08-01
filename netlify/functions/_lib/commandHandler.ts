import type { Context } from '@netlify/functions';
import { z } from 'zod';
import {
    createSuccessResponse,
    createErrorResponse,
    createValidationErrorResponse,
    HTTP_STATUS
} from './apiResponse';

/**
 * Generic command handler type
 */
export type CommandHandler<TSchema extends z.ZodType, TResult = unknown> = (
    params: z.infer<TSchema>
) => Promise<TResult> | TResult;

/**
 * Command configuration interface
 */
export interface CommandConfig<TSchema extends z.ZodType = z.ZodType> {
    schema: TSchema;
    handler: CommandHandler<TSchema>;
}

/**
 * Command registry type
 */
export type CommandRegistry = Record<string, CommandConfig>;

/**
 * Creates HTTP Response with proper headers
 */
export const createHttpResponse = (body: unknown, status: number): Response =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });

/**
 * Validates if command exists in registry
 */
export const isValidCommand = (
    cmd: string,
    registry: CommandRegistry
): cmd is keyof typeof registry => cmd in registry;

/**
 * Parses URL parameters and converts special types
 */
export const parseUrlParameters = (url: URL): Record<string, unknown> => {
    const params: Record<string, unknown> = {};

    for (const [key, value] of url.searchParams.entries()) {
        // Skip the 'cmd' parameter as it's handled separately
        if (key === 'cmd') continue;

        // Convert boolean strings
        if (value === 'true') {
            params[key] = true;
        } else if (value === 'false') {
            params[key] = false;
        }
        // Convert array notation (e.g., "include=system,runtime,memory")
        else if (value.includes(',')) {
            params[key] = value.split(',').map(v => v.trim());
        }
        // Keep as string
        else {
            params[key] = value;
        }
    }

    return params;
};

/**
 * Generic command processor
 */
export class CommandProcessor {
    private readonly registry: CommandRegistry;

    constructor(registry: CommandRegistry) {
        this.registry = registry;
    }

    /**
     * Processes a command request
     */
    async processCommand(
        cmd: string,
        params: Record<string, unknown>,
        request: Request
    ): Promise<Response> {
        try {
            // Validate command existence
            if (!isValidCommand(cmd, this.registry)) {
                const errorResponse = createErrorResponse(
                    {
                        message: `Unknown command: ${cmd}. Available commands: ${Object.keys(this.registry).join(', ')}`,
                        status: HTTP_STATUS.BAD_REQUEST,
                        code: 'UNKNOWN_COMMAND'
                    },
                    request
                );
                return createHttpResponse(errorResponse, HTTP_STATUS.BAD_REQUEST);
            }

            const commandConfig = this.registry[cmd];

            // Validate parameters against schema
            const parseResult = commandConfig.schema.safeParse(params);

            if (!parseResult.success) {
                const validationResponse = createValidationErrorResponse(
                    parseResult.error.issues,
                    request
                );
                return createHttpResponse(validationResponse, HTTP_STATUS.UNPROCESSABLE_ENTITY);
            }

            // Execute command handler
            const result = await commandConfig.handler(parseResult.data);

            // Return success response
            const successResponse = createSuccessResponse(result, request);
            return createHttpResponse(successResponse, HTTP_STATUS.OK);

        } catch (error) {
            const errorResponse = createErrorResponse(
                {
                    message: error instanceof Error ? error.message : 'Internal server error',
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    code: 'INTERNAL_ERROR'
                },
                request
            );
            return createHttpResponse(errorResponse, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Main handler function for Netlify Functions
     */
    async handle(request: Request, _context: Context): Promise<Response> {
        try {
            const url = new URL(request.url);
            const cmd = url.searchParams.get('cmd') || Object.keys(this.registry)[0] || 'help';
            const params = parseUrlParameters(url);

            return await this.processCommand(cmd, params, request);
        } catch (error) {
            const errorResponse = createErrorResponse(
                {
                    message: error instanceof Error ? error.message : 'Request processing error',
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    code: 'REQUEST_ERROR'
                },
                request
            );
            return createHttpResponse(errorResponse, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Gets available commands info
     */
    getCommandsInfo(): Record<string, { schema: any }> {
        const info: Record<string, { schema: any }> = {};

        for (const [cmd, config] of Object.entries(this.registry)) {
            info[cmd] = {
                schema: this.getSchemaDescription(config.schema)
            };
        }

        return info;
    }

    /**
     * Extracts schema description for documentation
     */
    private getSchemaDescription(schema: z.ZodType): any {
        try {
            // This is a simplified schema description
            // In a real implementation, you might want to use a library like zod-to-json-schema
            if (schema instanceof z.ZodObject) {
                const shape = schema.shape;
                const description: Record<string, any> = {};

                for (const [key, value] of Object.entries(shape)) {
                    if (value instanceof z.ZodOptional) {
                        description[key] = `${this.getZodTypeDescription(value as any)} (optional)`;
                    } else {
                        description[key] = this.getZodTypeDescription(value as z.ZodType);
                    }
                }

                return description;
            }

            return 'complex schema';
        } catch {
            return 'schema description unavailable';
        }
    }

    /**
     * Gets human-readable description of Zod type
     */
    private getZodTypeDescription(schema: z.ZodType): string {
        if (schema instanceof z.ZodString) return 'string';
        if (schema instanceof z.ZodNumber) return 'number';
        if (schema instanceof z.ZodBoolean) return 'boolean';
        if (schema instanceof z.ZodArray) return 'array';
        if (schema instanceof z.ZodEnum) return `enum: ${schema.options.join('|')}`;
        if (schema instanceof z.ZodOptional) return `${this.getZodTypeDescription(schema as any)} (optional)`;
        if (schema instanceof z.ZodDefault) return this.getZodTypeDescription(schema as any);

        return 'unknown';
    }
}

/**
 * Creates a command processor instance
 */
export const createCommandProcessor = (registry: CommandRegistry): CommandProcessor =>
    new CommandProcessor(registry);

/**
 * Utility function to create a simple command config
 */
export const createCommand = <TSchema extends z.ZodType>(
    schema: TSchema,
    handler: CommandHandler<TSchema>
): CommandConfig<TSchema> => ({
    schema,
    handler,
});
