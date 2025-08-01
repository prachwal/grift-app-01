import { useState, useEffect } from 'preact/hooks';
import { ApiEndpointTest } from '../components/ApiEndpointTest';
import { sampleApiCollection } from '../data/sampleApiCollection';
import { apiEndpointService } from '../services/apiEndpointService';
import type { TestResult, ApiCollection } from '../types/apiTesting';

/**
 * @fileoverview API Test page component for testing Netlify functions
 * @packageDocumentation
 */

export function ApiTestPage() {
    const [collections, setCollections] = useState<ApiCollection[]>([]);
    const [selectedCollectionName, setSelectedCollectionName] = useState<string>('');
    const [selectedEndpointId, setSelectedEndpointId] = useState<string>('');
    const [testHistory, setTestHistory] = useState<TestResult[]>([]);

    // Initialize collections
    useEffect(() => {
        const initializeCollections = async () => {
            try {
                console.log('Initializing collections...');

                // Add sample collection
                apiEndpointService.addCollection(sampleApiCollection);
                console.log('Added sample collection');

                // Load collections from JSON definitions
                console.log('Loading JSON definitions for hello...');
                await apiEndpointService.loadFromJsonDefinitions(['hello']);
                console.log('Finished loading JSON definitions');

                const loadedCollections = apiEndpointService.collections;
                console.log('All loaded collections:', loadedCollections);
                setCollections(loadedCollections);

                // Select first collection and endpoint - prefer JSON collection over sample
                if (loadedCollections.length > 0) {
                    // Try to find JSON collection first (Hello API Functions)
                    const jsonCollection = loadedCollections.find(col => col.name === 'Hello API Functions');
                    const firstCollection = jsonCollection || loadedCollections[0];

                    setSelectedCollectionName(firstCollection.name);
                    if (firstCollection.endpoints.length > 0) {
                        setSelectedEndpointId(firstCollection.endpoints[0].id);
                    }
                }
            } catch (error) {
                console.error('Failed to initialize collections:', error);
            }
        };

        initializeCollections();
    }, []);

    const selectedCollection = collections.find(col => col.name === selectedCollectionName);
    const selectedEndpoint = selectedCollection?.endpoints.find(ep => ep.id === selectedEndpointId);

    const executeTest = async (endpointId: string, parameters: Record<string, unknown>): Promise<TestResult> => {
        const endpoint = apiEndpointService.getAllEndpoints().find(ep => ep.id === endpointId);
        if (!endpoint) {
            throw new Error('Endpoint not found');
        }

        const startTime = Date.now();

        try {
            // Build URL
            const baseUrl = endpoint.baseUrl || selectedCollection?.baseUrl || '';
            const fullPath = baseUrl + endpoint.path;
            const url = new URL(fullPath, window.location.origin);

            // Add query parameters
            Object.entries(parameters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    if (Array.isArray(value)) {
                        url.searchParams.set(key, value.join(','));
                    } else {
                        url.searchParams.set(key, String(value));
                    }
                }
            });

            // Prepare headers
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            // Add custom headers from parameters
            endpoint.headers.forEach((header: any) => {
                const value = parameters[header.name];
                if (value !== undefined && value !== null && value !== '') {
                    headers[header.name] = String(value);
                }
            });

            // Add global headers
            selectedCollection?.globalHeaders.forEach((header: any) => {
                if (!headers[header.name] && header.defaultValue) {
                    headers[header.name] = String(header.defaultValue);
                }
            });

            // Prepare request
            const requestInit: RequestInit = {
                method: endpoint.method,
                headers,
            };

            // Add body for non-GET requests
            if (endpoint.method !== 'GET' && endpoint.bodySchema) {
                const bodyData: Record<string, unknown> = {};
                endpoint.bodySchema.parameters.forEach((param: any) => {
                    if (parameters[param.name] !== undefined) {
                        bodyData[param.name] = parameters[param.name];
                    }
                });

                if (Object.keys(bodyData).length > 0) {
                    requestInit.body = JSON.stringify(bodyData);
                }
            }

            // Execute request
            const response = await fetch(url.toString(), requestInit);
            const endTime = Date.now();

            // Parse response
            let responseBody: unknown;
            try {
                responseBody = await response.json();
            } catch {
                responseBody = await response.text();
            }

            // Get response headers
            const responseHeaders: Record<string, string> = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });

            const result: TestResult = {
                endpointId,
                testCaseName: 'Manual Test',
                success: response.ok,
                statusCode: response.status,
                responseTime: endTime - startTime,
                responseBody,
                responseHeaders,
                timestamp: new Date().toISOString(),
                error: response.ok ? undefined : `HTTP ${response.status} ${response.statusText}`,
            };

            // Add to history
            setTestHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results

            return result;

        } catch (error) {
            const endTime = Date.now();
            const result: TestResult = {
                endpointId,
                testCaseName: 'Manual Test',
                success: false,
                statusCode: 0,
                responseTime: endTime - startTime,
                responseBody: null,
                responseHeaders: {},
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error',
            };

            setTestHistory(prev => [result, ...prev.slice(0, 9)]);
            return result;
        }
    }; const clearHistory = () => {
        setTestHistory([]);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1600px]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    API Test Console
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Test and explore API endpoints with automatic validation and documentation
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Endpoint Selector */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            API Collections
                        </h2>

                        {/* Collection Selector */}
                        {collections.length > 1 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Select Collection
                                </label>
                                <select
                                    value={selectedCollectionName}
                                    onChange={(e) => {
                                        const newCollectionName = e.currentTarget.value;
                                        setSelectedCollectionName(newCollectionName);
                                        const newCollection = collections.find(col => col.name === newCollectionName);
                                        if (newCollection && newCollection.endpoints.length > 0) {
                                            setSelectedEndpointId(newCollection.endpoints[0].id);
                                        } else {
                                            setSelectedEndpointId('');
                                        }
                                    }}
                                    className="w-full p-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
                                >
                                    {collections.map((collection) => (
                                        <option key={collection.id} value={collection.name}>
                                            {collection.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {selectedCollection?.name || 'No Collection'}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                {selectedCollection?.description || 'Select a collection to view endpoints'}
                            </p>
                        </div>

                        <div className="space-y-2">
                            {selectedCollection?.endpoints.map((endpoint: any) => (
                                <button
                                    key={endpoint.id}
                                    onClick={() => setSelectedEndpointId(endpoint.id)}
                                    className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedEndpointId === endpoint.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                            {endpoint.name}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                    endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                            }`}>
                                            {endpoint.method}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                        {endpoint.path}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {testHistory.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Test History
                                    </h3>
                                    <button
                                        onClick={clearHistory}
                                        className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {testHistory.map((result, index) => {
                                        const endpoint = apiEndpointService.getAllEndpoints().find((ep: any) => ep.id === result.endpointId);
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs"
                                            >
                                                <div>
                                                    <div className="font-medium">{endpoint?.name}</div>
                                                    <div className="text-gray-500 dark:text-gray-400">
                                                        {new Date(result.timestamp).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded ${result.success
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                    }`}>
                                                    {result.statusCode}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {selectedEndpoint ? (
                        <ApiEndpointTest
                            endpoint={selectedEndpoint}
                            onTestExecute={executeTest}
                        />
                    ) : (
                        <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                Select an Endpoint
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Choose an API endpoint from the sidebar to start testing
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
