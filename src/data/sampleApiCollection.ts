import type { ApiCollection } from '../types/apiTesting';

export const sampleApiCollection: ApiCollection = {
    id: 'sample-collection',
    name: 'Sample API Collection',
    description: 'Collection of sample API endpoints for testing',
    version: '1.0.0',
    baseUrl: '/.netlify/functions',
    globalHeaders: [],
    endpoints: [
        {
            id: 'hello',
            name: 'Hello Command',
            description: 'Simple greeting command with optional name parameter',
            method: 'GET',
            path: '/hello',
            baseUrl: '/.netlify/functions',
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
                    description: 'Name to greet',
                    min: 1,
                    max: 64
                }
            ],
            headers: [],
            auth: {
                type: 'none'
            },
            responses: [
                {
                    statusCode: 200,
                    description: 'Successful greeting',
                    body: {
                        success: true,
                        data: {
                            message: 'Hello World!',
                            timestamp: '2025-01-01T12:00:00.000Z'
                        },
                        meta: {
                            timestamp: '2025-01-01T12:00:00.000Z',
                            requestId: 'abc123'
                        }
                    }
                }
            ],
            testCases: [
                {
                    name: 'Default greeting',
                    parameters: {
                        cmd: 'hello'
                    },
                    expectedStatus: 200,
                    description: 'Should return default greeting',
                    expectedBodyContains: ['Hello World!']
                },
                {
                    name: 'Custom name greeting',
                    parameters: {
                        cmd: 'hello',
                        name: 'Alice'
                    },
                    expectedStatus: 200,
                    description: 'Should return custom name greeting',
                    expectedBodyContains: ['Hello Alice!']
                }
            ],
            deprecated: false,
            version: '1.0.0',
            tags: ['greeting', 'basic']
        },
        {
            id: 'status',
            name: 'Status Command',
            description: 'Check system component status',
            method: 'GET',
            path: '/hello',
            baseUrl: '/.netlify/functions',
            pathParameters: [],
            queryParameters: [
                {
                    name: 'cmd',
                    type: 'string',
                    required: true,
                    defaultValue: 'status',
                    description: 'Command to execute'
                },
                {
                    name: 'component',
                    type: 'string',
                    required: false,
                    defaultValue: 'api',
                    description: 'Component to check',
                    enum: ['api', 'database', 'cache']
                },
                {
                    name: 'detailed',
                    type: 'boolean',
                    required: false,
                    defaultValue: false,
                    description: 'Return detailed status information'
                }
            ],
            headers: [],
            auth: {
                type: 'none'
            },
            responses: [
                {
                    statusCode: 200,
                    description: 'Component status',
                    body: {
                        success: true,
                        data: {
                            component: 'api',
                            status: 'operational',
                            detailed: false
                        },
                        meta: {
                            timestamp: '2025-01-01T12:00:00.000Z',
                            requestId: 'def456'
                        }
                    }
                }
            ],
            testCases: [
                {
                    name: 'Default status check',
                    parameters: {
                        cmd: 'status'
                    },
                    expectedStatus: 200,
                    description: 'Should return API status',
                    expectedBodyContains: ['operational']
                },
                {
                    name: 'Database status with details',
                    parameters: {
                        cmd: 'status',
                        component: 'database',
                        detailed: 'true'
                    },
                    expectedStatus: 200,
                    description: 'Should return detailed database status',
                    expectedBodyContains: ['database', 'detailed']
                }
            ],
            deprecated: false,
            version: '1.0.0',
            tags: ['status', 'monitoring']
        }
    ]
};
