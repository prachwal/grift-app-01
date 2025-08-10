import { z } from 'zod';

/**
 * HTTP Methods supported by API endpoints
 */
export const HttpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
export type HttpMethod = z.infer<typeof HttpMethodSchema>;

/**
 * Parameter types for API endpoints
 */
export const ParameterTypeSchema = z.enum(['string', 'number', 'boolean', 'array', 'object']);
export type ParameterType = z.infer<typeof ParameterTypeSchema>;

/**
 * Parameter definition schema
 */
export const ParameterSchema = z.object({
    name: z.string(),
    type: ParameterTypeSchema,
    required: z.boolean().default(false),
    description: z.string().optional(),
    defaultValue: z.unknown().optional(),
    example: z.unknown().optional(),
    enum: z.array(z.string()).optional(),
    pattern: z.string().optional(), // regex pattern for validation
    min: z.number().optional(), // min value for numbers, min length for strings
    max: z.number().optional(), // max value for numbers, max length for strings
    tags: z.array(z.string()).optional(), // categorization tags for parameters
    disabled: z.boolean().optional().default(false), // if true, parameter is read-only/disabled in UI
});
export type Parameter = z.infer<typeof ParameterSchema>;

/**
 * Response example schema
 */
export const ResponseExampleSchema = z.object({
    statusCode: z.number(),
    description: z.string(),
    body: z.unknown(),
    headers: z.record(z.string(), z.string()).optional(),
});
export type ResponseExample = z.infer<typeof ResponseExampleSchema>;

/**
 * Authentication requirements
 */
export const AuthSchema = z.object({
    type: z.enum(['none', 'bearer', 'apiKey', 'basic']),
    description: z.string().optional(),
    headerName: z.string().optional(), // for apiKey auth
    example: z.string().optional(),
});
export type Auth = z.infer<typeof AuthSchema>;

/**
 * Complete API endpoint definition
 */
export const ApiEndpointSchema = z.object({
    // Basic info
    id: z.string(),
    name: z.string(),
    description: z.string(),
    method: HttpMethodSchema,
    path: z.string(),
    baseUrl: z.string().optional(),

    // Parameters
    pathParameters: z.array(ParameterSchema).default([]),
    queryParameters: z.array(ParameterSchema).default([]),
    headers: z.array(ParameterSchema).default([]),
    bodySchema: z.object({
        type: z.enum(['json', 'form', 'multipart', 'text', 'binary']).default('json'),
        parameters: z.array(ParameterSchema).default([]),
        example: z.unknown().optional(),
    }).optional(),

    // Authentication
    auth: AuthSchema.default({ type: 'none' }),

    // Response examples
    responses: z.array(ResponseExampleSchema).default([]),

    // Testing
    testCases: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        parameters: z.record(z.string(), z.unknown()).default({}),
        expectedStatus: z.number().default(200),
        expectedBodyContains: z.array(z.string()).optional(),
    })).default([]),

    // Metadata
    tags: z.array(z.string()).default([]),
    version: z.string().optional(),
    deprecated: z.boolean().default(false),
});
export type ApiEndpoint = z.infer<typeof ApiEndpointSchema>;

/**
 * Collection of API endpoints
 */
export const ApiCollectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    baseUrl: z.string().optional(),
    version: z.string().optional(),
    endpoints: z.array(ApiEndpointSchema),
    globalAuth: AuthSchema.optional(),
    globalHeaders: z.array(ParameterSchema).default([]),
});
export type ApiCollection = z.infer<typeof ApiCollectionSchema>;

/**
 * Test execution result
 */
export const TestResultSchema = z.object({
    endpointId: z.string(),
    testCaseName: z.string(),
    success: z.boolean(),
    statusCode: z.number(),
    responseTime: z.number(), // in milliseconds
    responseBody: z.unknown(),
    responseHeaders: z.record(z.string(), z.string()),
    error: z.string().optional(),
    timestamp: z.string(),
});
export type TestResult = z.infer<typeof TestResultSchema>;
