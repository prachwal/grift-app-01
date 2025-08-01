import { z } from 'zod';
/**
 * HTTP Methods supported by API endpoints
 */
export declare const HttpMethodSchema: z.ZodEnum<{
    GET: "GET";
    POST: "POST";
    PUT: "PUT";
    DELETE: "DELETE";
    PATCH: "PATCH";
}>;
export type HttpMethod = z.infer<typeof HttpMethodSchema>;
/**
 * Parameter types for API endpoints
 */
export declare const ParameterTypeSchema: z.ZodEnum<{
    string: "string";
    number: "number";
    boolean: "boolean";
    object: "object";
    array: "array";
}>;
export type ParameterType = z.infer<typeof ParameterTypeSchema>;
/**
 * Parameter definition schema
 */
export declare const ParameterSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        string: "string";
        number: "number";
        boolean: "boolean";
        object: "object";
        array: "array";
    }>;
    required: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    defaultValue: z.ZodOptional<z.ZodUnknown>;
    example: z.ZodOptional<z.ZodUnknown>;
    enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
    pattern: z.ZodOptional<z.ZodString>;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type Parameter = z.infer<typeof ParameterSchema>;
/**
 * Response example schema
 */
export declare const ResponseExampleSchema: z.ZodObject<{
    statusCode: z.ZodNumber;
    description: z.ZodString;
    body: z.ZodUnknown;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strip>;
export type ResponseExample = z.infer<typeof ResponseExampleSchema>;
/**
 * Authentication requirements
 */
export declare const AuthSchema: z.ZodObject<{
    type: z.ZodEnum<{
        none: "none";
        bearer: "bearer";
        apiKey: "apiKey";
        basic: "basic";
    }>;
    description: z.ZodOptional<z.ZodString>;
    headerName: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Auth = z.infer<typeof AuthSchema>;
/**
 * Complete API endpoint definition
 */
export declare const ApiEndpointSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    method: z.ZodEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        DELETE: "DELETE";
        PATCH: "PATCH";
    }>;
    path: z.ZodString;
    baseUrl: z.ZodOptional<z.ZodString>;
    pathParameters: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
            array: "array";
        }>;
        required: z.ZodDefault<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodUnknown>;
        example: z.ZodOptional<z.ZodUnknown>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        pattern: z.ZodOptional<z.ZodString>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    queryParameters: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
            array: "array";
        }>;
        required: z.ZodDefault<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodUnknown>;
        example: z.ZodOptional<z.ZodUnknown>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        pattern: z.ZodOptional<z.ZodString>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    headers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
            array: "array";
        }>;
        required: z.ZodDefault<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodUnknown>;
        example: z.ZodOptional<z.ZodUnknown>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        pattern: z.ZodOptional<z.ZodString>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    bodySchema: z.ZodOptional<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<{
            form: "form";
            text: "text";
            json: "json";
            multipart: "multipart";
            binary: "binary";
        }>>;
        parameters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                object: "object";
                array: "array";
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            description: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodUnknown>;
            example: z.ZodOptional<z.ZodUnknown>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            pattern: z.ZodOptional<z.ZodString>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        example: z.ZodOptional<z.ZodUnknown>;
    }, z.core.$strip>>;
    auth: z.ZodDefault<z.ZodObject<{
        type: z.ZodEnum<{
            none: "none";
            bearer: "bearer";
            apiKey: "apiKey";
            basic: "basic";
        }>;
        description: z.ZodOptional<z.ZodString>;
        headerName: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    responses: z.ZodDefault<z.ZodArray<z.ZodObject<{
        statusCode: z.ZodNumber;
        description: z.ZodString;
        body: z.ZodUnknown;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strip>>>;
    testCases: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        expectedStatus: z.ZodDefault<z.ZodNumber>;
        expectedBodyContains: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    version: z.ZodOptional<z.ZodString>;
    deprecated: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type ApiEndpoint = z.infer<typeof ApiEndpointSchema>;
/**
 * Collection of API endpoints
 */
export declare const ApiCollectionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    baseUrl: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodString>;
    endpoints: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        method: z.ZodEnum<{
            GET: "GET";
            POST: "POST";
            PUT: "PUT";
            DELETE: "DELETE";
            PATCH: "PATCH";
        }>;
        path: z.ZodString;
        baseUrl: z.ZodOptional<z.ZodString>;
        pathParameters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                object: "object";
                array: "array";
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            description: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodUnknown>;
            example: z.ZodOptional<z.ZodUnknown>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            pattern: z.ZodOptional<z.ZodString>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        queryParameters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                object: "object";
                array: "array";
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            description: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodUnknown>;
            example: z.ZodOptional<z.ZodUnknown>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            pattern: z.ZodOptional<z.ZodString>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        headers: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                object: "object";
                array: "array";
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            description: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodUnknown>;
            example: z.ZodOptional<z.ZodUnknown>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            pattern: z.ZodOptional<z.ZodString>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        bodySchema: z.ZodOptional<z.ZodObject<{
            type: z.ZodDefault<z.ZodEnum<{
                form: "form";
                text: "text";
                json: "json";
                multipart: "multipart";
                binary: "binary";
            }>>;
            parameters: z.ZodDefault<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<{
                    string: "string";
                    number: "number";
                    boolean: "boolean";
                    object: "object";
                    array: "array";
                }>;
                required: z.ZodDefault<z.ZodBoolean>;
                description: z.ZodOptional<z.ZodString>;
                defaultValue: z.ZodOptional<z.ZodUnknown>;
                example: z.ZodOptional<z.ZodUnknown>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                pattern: z.ZodOptional<z.ZodString>;
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>>;
            example: z.ZodOptional<z.ZodUnknown>;
        }, z.core.$strip>>;
        auth: z.ZodDefault<z.ZodObject<{
            type: z.ZodEnum<{
                none: "none";
                bearer: "bearer";
                apiKey: "apiKey";
                basic: "basic";
            }>;
            description: z.ZodOptional<z.ZodString>;
            headerName: z.ZodOptional<z.ZodString>;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        responses: z.ZodDefault<z.ZodArray<z.ZodObject<{
            statusCode: z.ZodNumber;
            description: z.ZodString;
            body: z.ZodUnknown;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>>>;
        testCases: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            expectedStatus: z.ZodDefault<z.ZodNumber>;
            expectedBodyContains: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
        version: z.ZodOptional<z.ZodString>;
        deprecated: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    globalAuth: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<{
            none: "none";
            bearer: "bearer";
            apiKey: "apiKey";
            basic: "basic";
        }>;
        description: z.ZodOptional<z.ZodString>;
        headerName: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    globalHeaders: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
            array: "array";
        }>;
        required: z.ZodDefault<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodUnknown>;
        example: z.ZodOptional<z.ZodUnknown>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        pattern: z.ZodOptional<z.ZodString>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type ApiCollection = z.infer<typeof ApiCollectionSchema>;
/**
 * Test execution result
 */
export declare const TestResultSchema: z.ZodObject<{
    endpointId: z.ZodString;
    testCaseName: z.ZodString;
    success: z.ZodBoolean;
    statusCode: z.ZodNumber;
    responseTime: z.ZodNumber;
    responseBody: z.ZodUnknown;
    responseHeaders: z.ZodRecord<z.ZodString, z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
}, z.core.$strip>;
export type TestResult = z.infer<typeof TestResultSchema>;
