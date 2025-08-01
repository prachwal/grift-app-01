/**
 * @fileoverview Netlify function to serve API definition JSON files
 * @packageDocumentation
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Context } from '@netlify/functions';

/**
 * Serves API definition JSON files
 * URL format: /.netlify/functions/api-definitions?endpoint=hello
 */
export default async (request: Request, context: Context): Promise<Response> => {
    try {
        const url = new URL(request.url);
        const endpoint = url.searchParams.get('endpoint');

        if (!endpoint) {
            return new Response(
                JSON.stringify({
                    error: 'Missing endpoint parameter',
                    usage: '/.netlify/functions/api-definitions?endpoint=hello'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    }
                }
            );
        }

        // Validate endpoint name (security - prevent path traversal)
        if (!/^[a-zA-Z0-9-_]+$/.test(endpoint)) {
            return new Response(
                JSON.stringify({ error: 'Invalid endpoint name' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }

        // Try to read the JSON file
        const jsonPath = join(process.cwd(), 'netlify', 'functions', endpoint, `${endpoint}.json`);

        try {
            const jsonContent = await readFile(jsonPath, 'utf-8');
            const parsedJson = JSON.parse(jsonContent);

            return new Response(JSON.stringify(parsedJson), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });
        } catch (fileError) {
            console.warn(`Could not read JSON file for endpoint ${endpoint}:`, fileError);

            return new Response(
                JSON.stringify({
                    error: `Definition file not found for endpoint: ${endpoint}`,
                    endpoint: endpoint,
                    expectedPath: `netlify/functions/${endpoint}/${endpoint}.json`
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }
    } catch (error) {
        console.error('Error in api-definitions function:', error);

        return new Response(
            JSON.stringify({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
};
