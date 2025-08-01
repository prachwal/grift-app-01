import type { Context } from '@netlify/functions';
import { z } from 'zod';
/**
 * Generic command handler type
 */
export type CommandHandler<TSchema extends z.ZodType, TResult = unknown> = (params: z.infer<TSchema>) => Promise<TResult> | TResult;
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
export declare const createHttpResponse: (body: unknown, status: number) => Response;
/**
 * Validates if command exists in registry
 */
export declare const isValidCommand: (cmd: string, registry: CommandRegistry) => cmd is keyof typeof registry;
/**
 * Parses URL parameters and converts special types
 */
export declare const parseUrlParameters: (url: URL) => Record<string, unknown>;
/**
 * Generic command processor
 */
export declare class CommandProcessor {
    private readonly registry;
    constructor(registry: CommandRegistry);
    /**
     * Processes a command request
     */
    processCommand(cmd: string, params: Record<string, unknown>, request: Request): Promise<Response>;
    /**
     * Main handler function for Netlify Functions
     */
    handle(request: Request, _context: Context): Promise<Response>;
    /**
     * Gets available commands info
     */
    getCommandsInfo(): Record<string, {
        schema: any;
    }>;
    /**
     * Extracts schema description for documentation
     */
    private getSchemaDescription;
    /**
     * Gets human-readable description of Zod type
     */
    private getZodTypeDescription;
}
/**
 * Creates a command processor instance
 */
export declare const createCommandProcessor: (registry: CommandRegistry) => CommandProcessor;
/**
 * Utility function to create a simple command config
 */
export declare const createCommand: <TSchema extends z.ZodType>(schema: TSchema, handler: CommandHandler<TSchema>) => CommandConfig<TSchema>;
