import { describe, it, expect } from 'vitest';
import type { Context } from '@netlify/functions';
import {
    parseUrlParameters,
    isValidCommand,
    CommandProcessor,
    type CommandRegistry
} from './commandHandler';
import { z } from 'zod';

describe('commandHandler', () => {
    describe('parseUrlParameters', () => {
        it('should parse simple query parameters', () => {
            const url = new URL('https://example.com?name=John&age=30');
            const result = parseUrlParameters(url);
            expect(result).toEqual({ name: 'John', age: '30' });
        });

        it('should handle URL without query parameters', () => {
            const url = new URL('https://example.com');
            const result = parseUrlParameters(url);
            expect(result).toEqual({});
        });

        it('should handle boolean and array parameters', () => {
            const url = new URL('https://example.com?active=true&tags=system,runtime,memory');
            const result = parseUrlParameters(url);
            expect(result).toEqual({ active: true, tags: ['system', 'runtime', 'memory'] });
        });
    });

    describe('isValidCommand', () => {
        const testRegistry: CommandRegistry = {
            test: {
                schema: z.object({}),
                handler: async () => ({ message: 'test' })
            }
        };

        it('should return true for valid command', () => {
            expect(isValidCommand('test', testRegistry)).toBe(true);
        });

        it('should return false for invalid command', () => {
            expect(isValidCommand('invalid', testRegistry)).toBe(false);
        });
    });

    describe('CommandProcessor', () => {
        const createTestProcessor = () => {
            const registry: CommandRegistry = {
                hello: {
                    schema: z.object({
                        name: z.string().optional().default('World')
                    }),
                    handler: async (params: any) => ({
                        message: `Hello, ${params.name}!`
                    })
                },
                error: {
                    schema: z.object({}),
                    handler: async () => {
                        throw new Error('Command error');
                    }
                }
            };

            return new CommandProcessor(registry);
        };

        it('should process valid command successfully', async () => {
            const processor = createTestProcessor();
            const mockRequest = {
                url: 'https://example.com?cmd=hello&name=Test',
                method: 'GET'
            } as Request;

            const response = await processor.handle(mockRequest, {} as Context);

            expect(response.status).toBe(200);

            const bodyText = await response.text();
            const body = JSON.parse(bodyText);
            expect(body.status).toBe(true);
            expect(body.payload.message).toBe('Hello, Test!');
        });

        it('should handle command execution errors', async () => {
            const processor = createTestProcessor();
            const mockRequest = {
                url: 'https://example.com?cmd=error',
                method: 'GET'
            } as Request;

            const response = await processor.handle(mockRequest, {} as Context);

            expect(response.status).toBe(500);

            const bodyText = await response.text();
            const body = JSON.parse(bodyText);
            expect(body.status).toBe(false);
            expect(body.error.message).toContain('Command error');
        });
    });

    describe('Integration tests', () => {
        it('should handle complete request/response cycle', async () => {
            const registry: CommandRegistry = {
                ping: {
                    schema: z.object({
                        message: z.string().default('pong')
                    }),
                    handler: async (params: any) => ({
                        response: params.message,
                        timestamp: new Date().toISOString()
                    })
                }
            };

            const processor = new CommandProcessor(registry);
            const request = {
                url: 'https://example.com?cmd=ping&message=hello',
                method: 'GET'
            } as Request;

            const response = await processor.handle(request, {} as Context);

            expect(response.status).toBe(200);
            expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');

            const bodyText = await response.text();
            const body = JSON.parse(bodyText);
            expect(body.status).toBe(true);
            expect(body.payload.response).toBe('hello');
            expect(body.payload.timestamp).toBeDefined();
        });
    });
});
