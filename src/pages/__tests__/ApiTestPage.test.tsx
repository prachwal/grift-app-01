import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { ApiTestPage } from '../ApiTestPage';
import { apiEndpointService } from '../../services/apiEndpointService';
import type { ApiCollection } from '../../types/apiTesting';

/**
 * @fileoverview Tests for API Test Page component
 * @packageDocumentation
 */

// Mock the API endpoint service
vi.mock('../../services/apiEndpointService', () => ({
    apiEndpointService: {
        addCollection: vi.fn(),
        collections: [],
        getAllEndpoints: vi.fn(() => []),
        discoverEndpoints: vi.fn(() => Promise.resolve([])),
        loadFromJsonDefinitions: vi.fn(() => Promise.resolve())
    }
}));

// Mock fetch
global.fetch = vi.fn();

const mockCollections: ApiCollection[] = [
    {
        id: 'hello-functions',
        name: 'Hello API Functions',
        description: 'Collection of hello service endpoints',
        version: '1.0.0',
        baseUrl: '/.netlify/functions',
        globalHeaders: [],
        endpoints: [
            {
                id: 'test-hello',
                name: 'Hello Test',
                description: 'Test hello endpoint',
                method: 'GET',
                path: '/hello',
                pathParameters: [],
                queryParameters: [
                    {
                        name: 'cmd',
                        type: 'string',
                        required: true,
                        disabled: false,
                        defaultValue: 'hello',
                        description: 'Command to execute'
                    },
                    {
                        name: 'name',
                        type: 'string',
                        required: false,
                        disabled: false,
                        defaultValue: 'World',
                        description: 'Name to greet'
                    }
                ],
                headers: [],
                auth: { type: 'none' },
                responses: [
                    {
                        statusCode: 200,
                        description: 'Success',
                        body: { message: 'Hello World!' }
                    }
                ],
                testCases: [],
                deprecated: false,
                version: '1.0.0',
                tags: ['test']
            }
        ]
    },
    {
        id: 'example-functions',
        name: 'Example API Functions',
        description: 'Collection of example service endpoints for testing and demonstration',
        version: '1.0.0',
        baseUrl: '/.netlify/functions',
        globalHeaders: [],
        endpoints: [
            {
                id: 'test-user',
                name: 'User Test',
                description: 'Test user endpoint',
                method: 'GET',
                path: '/example',
                pathParameters: [],
                queryParameters: [
                    {
                        name: 'cmd',
                        type: 'string',
                        required: true,
                        disabled: false,
                        defaultValue: 'user',
                        description: 'Command to execute'
                    },
                    {
                        name: 'id',
                        type: 'string',
                        required: true,
                        disabled: false,
                        description: 'User ID to lookup'
                    }
                ],
                headers: [],
                auth: { type: 'none' },
                responses: [
                    {
                        statusCode: 200,
                        description: 'Success',
                        body: { success: true, data: { id: '123', name: 'User 123' } }
                    }
                ],
                testCases: [],
                deprecated: false,
                version: '1.0.0',
                tags: ['test']
            }
        ]
    }
];

describe('ApiTestPage', () => {
    const mockApiService = apiEndpointService as any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockApiService.collections = mockCollections;
        mockApiService.getAllEndpoints.mockReturnValue(mockCollections.flatMap(c => c.endpoints));
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);
        (global.fetch as any).mockClear();
    });

    it('should render API Test Console initially', () => {
        render(<ApiTestPage />);

        expect(screen.getByText('API Test Console')).toBeInTheDocument();
        expect(screen.getByText('Test and explore API endpoints with automatic validation and documentation')).toBeInTheDocument();
    });

    it('should render API collections after loading', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('API Test Console')).toBeInTheDocument();
            expect(screen.getByRole('heading', { name: 'Hello API Functions', level: 3 })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Hello Test.*GET/i })).toBeInTheDocument();
        });
    });

    it('should initialize collections on mount', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(mockApiService.loadFromJsonDefinitions).toHaveBeenCalledWith(['hello', 'example']);
        });
    });

    it('should handle endpoint selection', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Hello Test.*GET/i })).toBeInTheDocument();
        });

        const endpointButton = screen.getByRole('button', { name: /Hello Test.*GET/i });
        expect(endpointButton).toBeInTheDocument();

        fireEvent.click(endpointButton!);

        // Should show the endpoint test interface
        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });
    });

    it('should execute API test and show results', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        const mockResponse = {
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve({
                success: true,
                data: { message: 'Hello World!' }
            }),
            headers: new Map([['content-type', 'application/json']])
        };

        (global.fetch as any).mockResolvedValue(mockResponse);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Hello Test.*GET/i })).toBeInTheDocument();
        });

        // Select endpoint button in sidebar (not the heading)
        const endpointButton = screen.getByRole('button', { name: /Hello Test.*GET/i });
        fireEvent.click(endpointButton!);

        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });

        // Execute test
        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/.netlify/functions/hello'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json'
                    })
                })
            );
        });
    });

    it('should handle API test errors', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        (global.fetch as any).mockRejectedValue(new Error('Network error'));

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Hello Test.*GET/i })).toBeInTheDocument();
        });

        // Select endpoint button in sidebar
        const endpointButton = screen.getByRole('button', { name: /Hello Test.*GET/i });
        fireEvent.click(endpointButton!);

        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        // Should handle error gracefully - no crash
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    it('should show test history', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        const mockResponse = {
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve({ success: true, data: { message: 'Hello' } }),
            headers: new Map()
        };

        (global.fetch as any).mockResolvedValue(mockResponse);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Hello Test.*GET/i })).toBeInTheDocument();
        });

        // Execute a test
        const endpointButton = screen.getByRole('button', { name: /Hello Test.*GET/i });
        fireEvent.click(endpointButton!);

        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        // Should show test history
        await waitFor(() => {
            expect(screen.getByText('Test History')).toBeInTheDocument();
            expect(screen.getByText('200')).toBeInTheDocument();
        });
    });

    it('should clear test history', async () => {
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        const mockResponse = {
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve({ success: true }),
            headers: new Map()
        };

        (global.fetch as any).mockResolvedValue(mockResponse);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Hello Test.*GET/i })).toBeInTheDocument();
        });

        // Execute a test first
        const endpointButton = screen.getByRole('button', { name: /Hello Test.*GET/i });
        fireEvent.click(endpointButton!);

        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Test History')).toBeInTheDocument();
        });

        // Clear history
        const clearButton = screen.getByText('Clear');
        fireEvent.click(clearButton);

        expect(screen.queryByText('Test History')).not.toBeInTheDocument();
    });

    it('should handle initialization errors gracefully', async () => {
        mockApiService.loadFromJsonDefinitions.mockRejectedValue(new Error('Load failed'));

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('API Test Console')).toBeInTheDocument();
        });

        expect(consoleSpy).toHaveBeenCalledWith('Failed to initialize collections:', expect.any(Error));

        consoleSpy.mockRestore();
    });

    it('should show empty state when no endpoint selected', async () => {
        mockApiService.collections = [{
            ...mockCollections[0],
            endpoints: []
        }];
        mockApiService.getAllEndpoints.mockReturnValue([]);
        mockApiService.loadFromJsonDefinitions.mockResolvedValue(undefined);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('Select an Endpoint')).toBeInTheDocument();
            expect(screen.getByText('Choose an API endpoint from the sidebar to start testing')).toBeInTheDocument();
        });
    });
});
