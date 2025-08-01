/**
 * @fileoverview Shared API type definitions for frontend and backend
 * @packageDocumentation
 */
export interface Metadata {
    requestId?: string;
    timestamp?: string;
    durationMs?: number;
    path?: string;
    method?: string;
    pagination?: {
        page?: number;
        pageSize?: number;
        total?: number;
        totalPages?: number;
    };
    [key: string]: unknown;
}
export interface ApiResponse<T> {
    payload: T;
    status: boolean;
    metadata: Metadata;
    error?: ApiError;
}
export interface ApiError {
    message: string;
    status: number;
    code?: string;
}
