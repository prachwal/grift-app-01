/**
 * @fileoverview Utility for loading endpoint definitions from JSON files during development
 * @packageDocumentation
 */

import type { ApiCollection, Parameter } from '../types/apiTesting';

/**
 * Converts JSON definition to ApiCollection format
 */
function buildApiCollectionFromJSON(jsonData: any): ApiCollection {
    // Handle both old format (direct endpoints) and new format (collection + commands)
    const collectionInfo = jsonData.collection || {};
    const commands = jsonData.commands || {};
    const endpoints = jsonData.endpoints || [];

    // Convert commands to endpoints if commands exist
    const convertedEndpoints = Object.keys(commands).length > 0
        ? Object.entries(commands).map(([cmdKey, cmd]: [string, any]) => {
            // Convert parameters from object format to array format
            const queryParameters = cmd.parameters ? Object.entries(cmd.parameters).map(([paramKey, param]: [string, any]) => ({
                name: paramKey,
                type: param.type as Parameter['type'],
                required: param.required || false,
                defaultValue: param.defaultValue,
                description: param.description || '',
                enum: param.enum
            })) : [];

            return {
                id: cmdKey,
                name: cmd.name,
                description: cmd.description || '',
                method: cmd.method,
                path: cmd.path,
                pathParameters: [],
                queryParameters,
                headers: cmd.headers || [],
                auth: cmd.auth || { type: 'none' },
                responses: cmd.responses || [],
                testCases: cmd.testCases || [],
                deprecated: cmd.deprecated || false,
                version: cmd.version || '1.0.0',
                tags: cmd.tags || []
            };
        })
        : endpoints.map((endpoint: any) => ({
            id: endpoint.id,
            name: endpoint.name,
            description: endpoint.description || '',
            method: endpoint.method,
            path: endpoint.path,
            pathParameters: endpoint.pathParameters || [],
            queryParameters: endpoint.queryParameters?.map((param: any) => ({
                name: param.name,
                type: param.type as Parameter['type'],
                required: param.required || false,
                defaultValue: param.defaultValue,
                description: param.description || '',
                enum: param.enum
            })) || [],
            headers: endpoint.headers || [],
            auth: endpoint.auth || { type: 'none' },
            responses: endpoint.responses || [],
            testCases: endpoint.testCases || [],
            deprecated: endpoint.deprecated || false,
            version: endpoint.version || '1.0.0',
            tags: endpoint.tags || []
        }));

    return {
        id: collectionInfo.id || jsonData.id || 'json-loaded',
        name: collectionInfo.name || jsonData.name || 'JSON Loaded Collection',
        description: collectionInfo.description || jsonData.description || '',
        version: collectionInfo.version || jsonData.version || '1.0.0',
        baseUrl: collectionInfo.baseUrl || jsonData.baseUrl || '',
        globalHeaders: collectionInfo.globalHeaders || jsonData.globalHeaders || [],
        endpoints: convertedEndpoints
    };
}

/**
 * Loads API endpoint definitions from JSON files
 * @param endpointName - The name of the endpoint (e.g., 'hello')
 * @returns Promise resolving to ApiCollection or null if not found
 */
export async function loadEndpointDefinitions(endpointName: string): Promise<ApiCollection | null> {
    try {
        // Try loading from dedicated Netlify function first
        const netlifyUrl = `/.netlify/functions/api-definitions?endpoint=${endpointName}`;
        const response = await fetch(netlifyUrl);

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                const jsonData = await response.json();
                console.log(`Loaded definitions from Netlify function for ${endpointName}`);
                return buildApiCollectionFromJSON(jsonData);
            }
        }

        // Fallback: try loading from public API definitions directory (for Vite dev server)
        const publicUrl = `/api/definitions/${endpointName}.json`;
        const fallbackResponse = await fetch(publicUrl);

        if (fallbackResponse.ok) {
            const contentType = fallbackResponse.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                const jsonData = await fallbackResponse.json();
                console.log(`Loaded definitions from public directory for ${endpointName}`);
                return buildApiCollectionFromJSON(jsonData);
            }
        }

        console.warn(`Could not load definitions for ${endpointName} from any source`);
        return null;
    } catch (error) {
        console.warn(`Failed to load endpoint definitions for ${endpointName}:`, error);
        return null;
    }
}

/**
 * Copy JSON definition files to public folder for development
 * This would be part of a build step in a real application
 */
export function copyJsonDefinitionsToPublic(): void {
    console.log('In production, JSON files should be copied to public folder or served statically');
    console.log('For now, they need to be manually placed in public/netlify/functions/');
}
