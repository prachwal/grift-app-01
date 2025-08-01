import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { ApiEndpointTest } from '../ApiEndpointTest';
import type { ApiEndpoint } from '../../types/apiTesting';

/**
 * @fileoverview Tests for API Endpoint Test component
 * @packageDocumentation
 */

const mockEndpoint: ApiEndpoint = {
    id: 'test-endpoint',
    name: 'Test Endpoint',
    description: 'A test endpoint for unit testing',
    method: 'GET',
    path: '/test',
    pathParameters: [],
    queryParameters: [
        {
            name: 'cmd',
            type: 'string',
            required: true,
            defaultValue: 'test',
            description: 'Test command'
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'World',
            description: 'Name parameter',
            min: 1,
            max: 50
        },
        {
            name: 'count',
            type: 'number',
            required: false,
            description: 'Count parameter',
            min: 1,
            max: 100
        },
        {
            name: 'enabled',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Enable flag'
        },
        {
            name: 'tags',
            type: 'array',
            required: false,
            description: 'Tag list'
        },
        {
            name: 'type',
            type: 'string',
            required: false,
            enum: ['basic', 'advanced', 'expert'],
            description: 'Type selection'
        }
    ],
    headers: [
        {
            name: 'X-Custom-Header',
            type: 'string',
            required: false,
            description: 'Custom header'
        }
    ],
    auth: { type: 'none' },
    responses: [
        {
            statusCode: 200,
            description: 'Success response',
            body: {
                success: true,
                data: { message: 'Test successful' }
            }
        },
        {
            statusCode: 400,
            description: 'Bad request',
            body: {
                success: false,
                error: { message: 'Invalid parameters' }
            }
        }
    ],
    testCases: [
        {
            name: 'Basic test',
            parameters: {
                cmd: 'hello',
                name: 'Test'
            },
            expectedStatus: 200,
            description: 'Basic hello test'
        }
    ],
    deprecated: false,
    version: '1.0.0',
    tags: ['test']
};

describe('ApiEndpointTest', () => {
    const mockOnTestExecute = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render endpoint information', () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        expect(screen.getByText('Test Endpoint')).toBeInTheDocument();
        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByText('GET /test')).toBeInTheDocument();
        expect(screen.getByText('A test endpoint for unit testing')).toBeInTheDocument();
    });

    it('should render parameter sections', () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        expect(screen.getByText('Query Parameters')).toBeInTheDocument();
        expect(screen.getByText('Headers')).toBeInTheDocument();
        expect(screen.getByText('Response Examples')).toBeInTheDocument();
    });

    it('should initialize with default parameter values', () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        // Query Parameters section should be expanded due to required fields
        const cmdInput = screen.getByDisplayValue('test');
        const nameInput = screen.getByDisplayValue('World');

        expect(cmdInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
    });

    it('should handle different parameter types', () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        // String input
        expect(screen.getByDisplayValue('test')).toBeInTheDocument();

        // Boolean checkbox
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(false);

        // Select dropdown
        const select = screen.getByDisplayValue('Select...');
        expect(select).toBeInTheDocument();

        // Array input (text field with comma separation)
        const arrayInput = screen.getByPlaceholderText('item1, item2, item3');
        expect(arrayInput).toBeInTheDocument();
    });

    it('should handle parameter changes', async () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const nameInput = screen.getByDisplayValue('World');
        fireEvent.change(nameInput, { target: { value: 'Alice' } });

        expect((nameInput as HTMLInputElement).value).toBe('Alice');
    });

    it('should handle checkbox parameter', async () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        fireEvent.change(checkbox, { target: { checked: true } });

        expect(checkbox.checked).toBe(true);
    });

    it('should handle array parameter', async () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const arrayInput = screen.getByPlaceholderText('item1, item2, item3');
        fireEvent.change(arrayInput, { target: { value: 'tag1, tag2, tag3' } });

        expect((arrayInput as HTMLInputElement).value).toBe('tag1, tag2, tag3');
    });

    it('should handle enum parameter', async () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const select = screen.getByDisplayValue('Select...');
        fireEvent.change(select, { target: { value: 'advanced' } });

        expect((select as HTMLSelectElement).value).toBe('advanced');
    });

    it('should execute test when Send Request is clicked', async () => {
        const mockResult = {
            endpointId: 'test-endpoint',
            testCaseName: 'Manual Test',
            success: true,
            statusCode: 200,
            responseTime: 150,
            responseBody: { success: true, data: { message: 'Test successful' } },
            responseHeaders: { 'content-type': 'application/json' },
            timestamp: '2025-01-01T12:00:00.000Z'
        };

        mockOnTestExecute.mockResolvedValue(mockResult);

        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(mockOnTestExecute).toHaveBeenCalledWith(
                'test-endpoint',
                expect.objectContaining({
                    cmd: 'test',
                    name: 'World',
                    enabled: false
                })
            );
        });
    });

    it('should show loading state during test execution', async () => {
        mockOnTestExecute.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        expect(screen.getByText('Testing...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Send Request')).toBeInTheDocument();
        });
    });

    it('should display test results', async () => {
        const mockResult = {
            endpointId: 'test-endpoint',
            testCaseName: 'Manual Test',
            success: true,
            statusCode: 200,
            responseTime: 150,
            responseBody: { success: true, data: { message: 'Test successful' } },
            responseHeaders: { 'content-type': 'application/json' },
            timestamp: '2025-01-01T12:00:00.000Z'
        };

        mockOnTestExecute.mockResolvedValue(mockResult);

        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Test Result')).toBeInTheDocument();
            expect(screen.getAllByText('200')[0]).toBeInTheDocument(); // Use getAllByText for multiple matches
            expect(screen.getByText('150ms')).toBeInTheDocument();
        });
    });

    it('should display error results', async () => {
        const mockResult = {
            endpointId: 'test-endpoint',
            testCaseName: 'Manual Test',
            success: false,
            statusCode: 400,
            responseTime: 100,
            responseBody: null,
            responseHeaders: {},
            timestamp: '2025-01-01T12:00:00.000Z',
            error: 'Bad Request'
        };

        mockOnTestExecute.mockResolvedValue(mockResult);

        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Test Result')).toBeInTheDocument();
            expect(screen.getByText('Error:')).toBeInTheDocument();
            expect(screen.getByText('Bad Request')).toBeInTheDocument();
        });
    });

    it('should handle test execution errors', async () => {
        mockOnTestExecute.mockRejectedValue(new Error('Network error'));

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        const sendButton = screen.getByText('Send Request');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Test execution failed:', expect.any(Error));
        });

        consoleSpy.mockRestore();
    });

    it('should show deprecated warning', () => {
        const deprecatedEndpoint = { ...mockEndpoint, deprecated: true };

        render(<ApiEndpointTest endpoint={deprecatedEndpoint} onTestExecute={mockOnTestExecute} />);

        expect(screen.getByText('Deprecated')).toBeInTheDocument();
    });

    it('should display response examples', () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        expect(screen.getByText('Response Examples')).toBeInTheDocument();
        expect(screen.getByText('200 - Success response')).toBeInTheDocument();
        expect(screen.getByText('400 - Bad request')).toBeInTheDocument();
    });

    it('should validate required parameters', () => {
        render(<ApiEndpointTest endpoint={mockEndpoint} onTestExecute={mockOnTestExecute} />);

        // Required parameters should be marked with *
        expect(screen.getByText('cmd')).toBeInTheDocument();
        const requiredIndicator = screen.getByText('*');
        expect(requiredIndicator).toBeInTheDocument();
    });
});
