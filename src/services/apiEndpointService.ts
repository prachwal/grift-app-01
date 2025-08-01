import type { ApiCollection, ApiEndpoint, HttpMethod } from '../types/apiTesting';

/**
 * @fileoverview Service for managing API endpoint collections
 * @packageDocumentation
 */

export interface EndpointRegistry {
    collections: ApiCollection[];
    getCollection(name: string): ApiCollection | undefined;
    getEndpoint(collectionName: string, endpointId: string): ApiEndpoint | undefined;
    getAllEndpoints(): ApiEndpoint[];
    addCollection(collection: ApiCollection): void;
    removeCollection(name: string): boolean;
}

class ApiEndpointService implements EndpointRegistry {
    private _collections: Map<string, ApiCollection> = new Map();

    constructor() {
        // Initialize with default collections
    }

    get collections(): ApiCollection[] {
        return Array.from(this._collections.values());
    }

    getCollection(name: string): ApiCollection | undefined {
        return this._collections.get(name);
    }

    getEndpoint(collectionName: string, endpointId: string): ApiEndpoint | undefined {
        const collection = this.getCollection(collectionName);
        return collection?.endpoints.find(ep => ep.id === endpointId);
    }

    getAllEndpoints(): ApiEndpoint[] {
        return this.collections.flatMap(collection => collection.endpoints);
    }

    addCollection(collection: ApiCollection): void {
        this._collections.set(collection.name, collection);
    }

    removeCollection(name: string): boolean {
        return this._collections.delete(name);
    }

    /**
     * Load collections from JSON definitions using the new system
     * @param endpointNames - Array of endpoint names to load
     */
    async loadFromJsonDefinitions(endpointNames: string[]): Promise<void> {
        const { loadEndpointDefinitions } = await import('./jsonDefinitionLoader');

        for (const endpointName of endpointNames) {
            try {
                const jsonCollection = await loadEndpointDefinitions(endpointName);
                if (jsonCollection) {
                    this.addCollection(jsonCollection);
                    console.log(`Loaded collection from JSON for ${endpointName}:`, jsonCollection.name);
                }
            } catch (error) {
                console.warn(`Failed to load JSON definitions for ${endpointName}:`, error);
            }
        }
    }

    /**
     * Auto-discover endpoints from a Netlify function JSON definition
     * @deprecated Use loadFromJsonDefinitions instead
     * This reads the JSON file with the same name as the function
     */
    async discoverEndpoints(functionPath: string): Promise<ApiEndpoint[]> {
        try {
            // Try to load JSON definition with same name as function
            const jsonPath = `${functionPath}.json`;

            const response = await fetch(jsonPath);
            if (!response.ok) {
                console.warn(`JSON definition not found at ${jsonPath}`);
                return [];
            }

            const data = await response.json();

            if (data.commands) {
                return this.buildEndpointsFromJSON(data.commands, data.collection?.baseUrl);
            }
        } catch (error) {
            console.warn(`Failed to discover endpoints from JSON for ${functionPath}:`, error);
        }

        return [];
    }

    private buildEndpointsFromJSON(commands: Record<string, any>, baseUrl = '/.netlify/functions'): ApiEndpoint[] {
        return Object.entries(commands).map(([cmd, cmdInfo]: [string, any]) => ({
            id: cmd,
            name: cmdInfo.name || `${cmd.charAt(0).toUpperCase() + cmd.slice(1)} Command`,
            description: cmdInfo.description || `Execute ${cmd} command`,
            method: (cmdInfo.method || 'GET') as HttpMethod,
            path: cmdInfo.path || '/hello',
            baseUrl: baseUrl,
            pathParameters: [],
            queryParameters: Object.entries(cmdInfo.parameters || {}).map(([paramName, paramInfo]: [string, any]) => ({
                name: paramName,
                type: paramInfo.type,
                required: paramInfo.required,
                description: paramInfo.description,
                defaultValue: paramInfo.defaultValue,
                min: paramInfo.min,
                max: paramInfo.max,
                enum: paramInfo.enum,
                pattern: paramInfo.pattern,
                example: paramInfo.example
            })),
            headers: [],
            auth: {
                type: 'none' as const
            },
            responses: cmdInfo.responses?.map((response: any) => ({
                statusCode: response.statusCode,
                description: response.description,
                body: response.body
            })) || [
                    {
                        statusCode: 200,
                        description: 'Success response',
                        body: {
                            success: true,
                            data: {},
                            meta: {
                                timestamp: new Date().toISOString(),
                                requestId: 'sample-id'
                            }
                        }
                    }
                ],
            testCases: cmdInfo.testCases?.map((testCase: any) => ({
                name: testCase.name,
                parameters: testCase.parameters,
                expectedStatus: testCase.expectedStatus,
                description: testCase.description,
                expectedBodyContains: testCase.expectedBodyContains
            })) || [
                    {
                        name: `Basic ${cmd} test`,
                        parameters: { cmd },
                        expectedStatus: 200,
                        description: `Test ${cmd} command`,
                        expectedBodyContains: ['success']
                    }
                ],
            deprecated: cmdInfo.deprecated || false,
            version: cmdInfo.version || '1.0.0',
            tags: cmdInfo.tags || ['auto-discovered', cmd]
        }));
    }

    /**
     * Load endpoints from a configuration file or URL
     */
    async loadFromConfig(configUrl: string): Promise<ApiCollection> {
        const response = await fetch(configUrl);
        const collection = await response.json();

        // Validate the collection structure
        if (!collection.name || !collection.endpoints) {
            throw new Error('Invalid API collection format');
        }

        this.addCollection(collection);
        return collection;
    }

    /**
     * Export current collections to JSON
     */
    exportCollections(): string {
        return JSON.stringify(this.collections, null, 2);
    }

    /**
     * Import collections from JSON
     */
    importCollections(json: string): void {
        const collections = JSON.parse(json);
        if (Array.isArray(collections)) {
            collections.forEach(collection => this.addCollection(collection));
        }
    }
}

// Singleton instance
export const apiEndpointService = new ApiEndpointService();
