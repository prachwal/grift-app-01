import type { ApiResponse, ApiError, Metadata } from './api';
import { v4 as uuidv4 } from 'uuid';

/**
 * Configuration options for creating API response
 */
export interface ApiResponseConfig<T> {
    payload: T;
    status?: boolean;
    error?: ApiError;
    req?: Request;
    meta?: Partial<Metadata>;
    requestId?: string;
}

/**
 * Creates a standardized API response with metadata
 * @param config - Response configuration options
 * @returns Formatted API response
 */
export function createApiResponse<T>({
    payload,
    status = true,
    error,
    req,
    meta = {},
    requestId,
}: ApiResponseConfig<T>): ApiResponse<T> {
    const timestamp = new Date().toISOString();
    const url = req ? new URL(req.url) : undefined;

    return {
        payload,
        status,
        error,
        metadata: {
            requestId: requestId ?? uuidv4(),
            timestamp,
            path: url?.pathname,
            method: req?.method,
            ...meta,
        },
    };
}

/**
 * Creates a success response
 */
export const createSuccessResponse = <T>(
    payload: T,
    req?: Request,
    meta?: Partial<Metadata>
): ApiResponse<T> =>
    createApiResponse({ payload, status: true, req, meta });

/**
 * Creates an error response
 */
export const createErrorResponse = <T = null>(
    error: ApiError,
    req?: Request,
    meta?: Partial<Metadata>
): ApiResponse<T> =>
    createApiResponse({
        payload: null as T,
        status: false,
        error,
        req,
        meta
    });

/**
 * Creates a validation error response
 */
export const createValidationErrorResponse = <T = null>(
    validationErrors: unknown,
    req?: Request
): ApiResponse<T> =>
    createErrorResponse(
        {
            message: 'Validation failed',
            status: 422,
            code: 'VALIDATION_ERROR'
        },
        req,
        { validation: validationErrors }
    );

/**
 * HTTP status codes mapping
 */
export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;
