/**
 * API Service for handling HTTP requests
 * Centralized place for all API calls and data fetching
 */
import type { ApiResponse } from '../types/api';
/**
 * Base API client with common configurations
 */
declare class ApiClient {
    private baseURL;
    constructor(baseURL?: string);
    private request;
    get<T>(endpoint: string): Promise<ApiResponse<T>>;
    post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>>;
    put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>>;
    delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}
export declare const apiClient: ApiClient;
/**
 * Example service functions using the API client
 */
export declare const userService: {
    getCurrentUser(): Promise<ApiResponse<{
        id: string;
        name: string;
        email: string;
    }>>;
    updateUser(userData: {
        name: string;
        email: string;
    }): Promise<ApiResponse<{
        id: string;
        name: string;
        email: string;
    }>>;
};
export declare const authService: {
    login(credentials: {
        email: string;
        password: string;
    }): Promise<ApiResponse<{
        token: string;
        user: {
            id: string;
            name: string;
        };
    }>>;
    logout(): Promise<ApiResponse<{
        success: boolean;
    }>>;
    register(userData: {
        name: string;
        email: string;
        password: string;
    }): Promise<ApiResponse<{
        token: string;
        user: {
            id: string;
            name: string;
        };
    }>>;
};
export {};
