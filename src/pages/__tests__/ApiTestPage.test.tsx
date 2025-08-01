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
        discoverEndpoints: vi.fn(() => Promise.resolve([]))
    }
}));

// Mock fetch
global.fetch = vi.fn();

const mockCollection: ApiCollection = {
    id: 'test-collection',
    name: 'Test Collection',
    description: 'Test API collection',
    version: '1.0.0',
    baseUrl: '/test',
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
                    defaultValue: 'hello',
                    description: 'Command to execute'
                },
                {
                    name: 'name',
                    type: 'string',
                    required: false,
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
};

describe('ApiTestPage', () => {
    const mockApiService = apiEndpointService as any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockApiService.collections = [mockCollection];
        mockApiService.getAllEndpoints.mockReturnValue(mockCollection.endpoints);
        (global.fetch as any).mockClear();
    });

    it('should render loading state initially', () => {
        render(<ApiTestPage />);

        expect(screen.getByText('Loading API collections...')).toBeInTheDocument();
    });

    it('should render API collections after loading', async () => {
        mockApiService.discoverEndpoints.mockResolvedValue([]);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('API Test Console')).toBeInTheDocument();
            expect(screen.getByText('Test API')).toBeInTheDocument();
            expect(screen.getByText('Hello Test')).toBeInTheDocument();
        });
    });

    it('should initialize collections on mount', async () => {
        mockApiService.discoverEndpoints.mockResolvedValue([]);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(mockApiService.addCollection).toHaveBeenCalled();
            expect(mockApiService.discoverEndpoints).toHaveBeenCalledWith('/.netlify/functions/hello');
        });
    });

    it('should handle endpoint selection', async () => {
        mockApiService.discoverEndpoints.mockResolvedValue([]);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('Hello Test')).toBeInTheDocument();
        });

        const endpointButton = screen.getByText('Hello Test').closest('button');
        expect(endpointButton).toBeInTheDocument();

        fireEvent.click(endpointButton!);

        // Should show the endpoint test interface
        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });
    });

    it('should execute API test and show results', async () => {
        mockApiService.discoverEndpoints.mockResolvedValue([]);

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
            expect(screen.getByText('Hello Test')).toBeInTheDocument();
        });

        // Select endpoint
        const endpointButton = screen.getByText('Hello Test').closest('button');
        fireEvent.click(endpointButton!);

        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });

        // Execute test
        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/hello?cmd=hello'),
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
        mockApiService.discoverEndpoints.mockResolvedValue([]);

        (global.fetch as any).mockRejectedValue(new Error('Network error'));

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('Hello Test')).toBeInTheDocument();
        });

        // Select endpoint and execute test
        const endpointButton = screen.getByText('Hello Test').closest('button');
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
        mockApiService.discoverEndpoints.mockResolvedValue([]);

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
            expect(screen.getByText('Hello Test')).toBeInTheDocument();
        });

        // Execute a test
        const endpointButton = screen.getByText('Hello Test').closest('button');
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
        mockApiService.discoverEndpoints.mockResolvedValue([]);

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
            expect(screen.getByText('Hello Test')).toBeInTheDocument();
        });

        // Execute a test first
        const endpointButton = screen.getByText('Hello Test').closest('button');
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

    it('should handle discovery errors gracefully', async () => {
        mockApiService.discoverEndpoints.mockRejectedValue(new Error('Discovery failed'));

        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('API Test Console')).toBeInTheDocument();
        });

        expect(consoleSpy).toHaveBeenCalledWith('Could not discover endpoints:', expect.any(Error));

        consoleSpy.mockRestore();
    });

    it('should show empty state when no endpoint selected', async () => {
        mockApiService.collections = [{
            ...mockCollection,
            endpoints: []
        }];
        mockApiService.getAllEndpoints.mockReturnValue([]);
        mockApiService.discoverEndpoints.mockResolvedValue([]);

        render(<ApiTestPage />);

        await waitFor(() => {
            expect(screen.getByText('Select an Endpoint')).toBeInTheDocument();
            expect(screen.getByText('Choose an API endpoint from the sidebar to start testing')).toBeInTheDocument();
        });
    });
});
