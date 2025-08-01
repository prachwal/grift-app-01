import type { ApiCollection, ApiEndpoint } from '../types/apiTesting';
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
declare class ApiEndpointService implements EndpointRegistry {
    private _collections;
    constructor();
    get collections(): ApiCollection[];
    getCollection(name: string): ApiCollection | undefined;
    getEndpoint(collectionName: string, endpointId: string): ApiEndpoint | undefined;
    getAllEndpoints(): ApiEndpoint[];
    addCollection(collection: ApiCollection): void;
    removeCollection(name: string): boolean;
    /**
     * Auto-discover endpoints from a Netlify function JSON definition
     * This reads the JSON file with the same name as the function
     */
    discoverEndpoints(functionPath: string): Promise<ApiEndpoint[]>;
    private buildEndpointsFromJSON;
    /**
     * Load endpoints from a configuration file or URL
     */
    loadFromConfig(configUrl: string): Promise<ApiCollection>;
    /**
     * Export current collections to JSON
     */
    exportCollections(): string;
    /**
     * Import collections from JSON
     */
    importCollections(json: string): void;
}
export declare const apiEndpointService: ApiEndpointService;
export {};
