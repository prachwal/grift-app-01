/**
 * API Service for handling HTTP requests
 * Centralized place for all API calls and data fetching
 */

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
}

/**
 * Base API client with common configurations
 */
class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = '/api') {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            return {
                data,
                status: response.status,
            };
        } catch (error) {
            throw {
                message: error instanceof Error ? error.message : 'Unknown error',
                status: 500,
            } as ApiError;
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

/**
 * Example service functions using the API client
 */
export const userService = {
    async getCurrentUser() {
        return apiClient.get<{ id: string; name: string; email: string }>('/user/me');
    },

    async updateUser(userData: { name: string; email: string }) {
        return apiClient.put<{ id: string; name: string; email: string }>('/user/me', userData);
    },
};

export const authService = {
    async login(credentials: { email: string; password: string }) {
        return apiClient.post<{ token: string; user: { id: string; name: string } }>('/auth/login', credentials);
    },

    async logout() {
        return apiClient.post<{ success: boolean }>('/auth/logout', {});
    },

    async register(userData: { name: string; email: string; password: string }) {
        return apiClient.post<{ token: string; user: { id: string; name: string } }>('/auth/register', userData);
    },
};
