import type { ApiResponse, ApiError, Metadata } from './api';
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
export declare function createApiResponse<T>({ payload, status, error, req, meta, requestId, }: ApiResponseConfig<T>): ApiResponse<T>;
/**
 * Creates a success response
 */
export declare const createSuccessResponse: <T>(payload: T, req?: Request, meta?: Partial<Metadata>) => ApiResponse<T>;
/**
 * Creates an error response
 */
export declare const createErrorResponse: <T = null>(error: ApiError, req?: Request, meta?: Partial<Metadata>) => ApiResponse<T>;
/**
 * Creates a validation error response
 */
export declare const createValidationErrorResponse: <T = null>(validationErrors: unknown, req?: Request) => ApiResponse<T>;
/**
 * HTTP status codes mapping
 */
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
};
