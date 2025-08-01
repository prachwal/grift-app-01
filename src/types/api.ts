/**
 * @fileoverview Re-exports of shared API types from Netlify functions
 * @packageDocumentation
 */

// Re-export all types from the centralized location
export type {
    Metadata,
    ApiResponse,
    ApiError
} from '../../netlify/functions/_lib/api';
