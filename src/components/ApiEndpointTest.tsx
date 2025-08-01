import { useState, useEffect } from 'preact/hooks';
import { Accordion, AccordionItem } from './ui';
import type { ApiEndpoint, Parameter, TestResult, HttpMethod } from '../types/apiTesting';

interface ApiEndpointTestProps {
    endpoint: ApiEndpoint;
    onTestExecute: (endpointId: string, parameters: Record<string, unknown>) => Promise<TestResult>;
}

interface ParameterInputProps {
    parameter: Parameter;
    value: unknown;
    onChange: (value: unknown) => void;
}

function ParameterInput({ parameter, value, onChange }: ParameterInputProps) {
    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        let newValue: unknown = target.value;

        // Type conversion based on parameter type
        switch (parameter.type) {
            case 'number':
                newValue = target.value ? Number(target.value) : undefined;
                break;
            case 'boolean':
                newValue = target.checked;
                break;
            case 'array':
                newValue = target.value.split(',').map(v => v.trim()).filter(v => v);
                break;
            default:
                newValue = target.value;
        }

        onChange(newValue);
    };

    const renderInput = () => {
        switch (parameter.type) {
            case 'boolean':
                return (
                    <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                );
            case 'array':
                return (
                    <input
                        type="text"
                        value={Array.isArray(value) ? value.join(', ') : String(value || '')}
                        onChange={handleChange}
                        placeholder="item1, item2, item3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={String(value || '')}
                        onChange={handleChange}
                        min={parameter.min}
                        max={parameter.max}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                );
            default:
                return parameter.enum ? (
                    <select
                        value={String(value || '')}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Select...</option>
                        {parameter.enum.map((option: string) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={String(value || '')}
                        onChange={handleChange}
                        placeholder={parameter.example ? String(parameter.example) : `Enter ${parameter.name}`}
                        pattern={parameter.pattern}
                        minLength={parameter.min}
                        maxLength={parameter.max}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                );
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {parameter.name}
                    {parameter.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {parameter.type}
                </span>
            </div>
            {parameter.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400">{parameter.description}</p>
            )}
            {renderInput()}
        </div>
    );
}

function ParameterSection({ title, parameters, values, onChange, icon }: {
    title: string;
    parameters: Parameter[];
    values: Record<string, unknown>;
    onChange: (name: string, value: unknown) => void;
    icon: string;
}) {
    if (parameters.length === 0) return null;

    return (
        <AccordionItem
            title={title}
            badge={String(parameters.length)}
            badgeColor="blue"
            icon={<span>{icon}</span>}
            defaultOpen={parameters.some(p => p.required)}
        >
            <div className="space-y-4 pt-4">
                {parameters.map(param => (
                    <ParameterInput
                        key={param.name}
                        parameter={param}
                        value={values[param.name]}
                        onChange={(value) => onChange(param.name, value)}
                    />
                ))}
            </div>
        </AccordionItem>
    );
}

function HttpMethodBadge({ method }: { method: HttpMethod }) {
    const colors = {
        GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        PATCH: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };

    return (
        <span className={`px-2 py-1 text-xs font-bold rounded ${colors[method as keyof typeof colors]}`}>
            {method}
        </span>
    );
}

export function ApiEndpointTest({ endpoint, onTestExecute }: ApiEndpointTestProps) {
    const [parameters, setParameters] = useState<Record<string, unknown>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [testResult, setTestResult] = useState<TestResult | null>(null);

    // Initialize with default values
    useEffect(() => {
        const defaultParams: Record<string, unknown> = {};

        [...endpoint.pathParameters, ...endpoint.queryParameters, ...(endpoint.headers || [])].forEach(param => {
            if (param.defaultValue !== undefined) {
                defaultParams[param.name] = param.defaultValue;
            }
        });

        setParameters(defaultParams);
    }, [endpoint]);

    const handleParameterChange = (name: string, value: unknown) => {
        setParameters(prev => ({ ...prev, [name]: value }));
    };

    const handleTest = async () => {
        setIsLoading(true);
        try {
            const result = await onTestExecute(endpoint.id, parameters);
            setTestResult(result);
        } catch (error) {
            console.error('Test execution failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Get baseUrl from props or parent collection
    const baseUrl = endpoint.baseUrl || '';
    const fullUrl = `${baseUrl}${endpoint.path}`;

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <HttpMethodBadge method={endpoint.method} />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {endpoint.name}
                        </h3>
                        {endpoint.deprecated && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded">
                                Deprecated
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleTest}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Testing...' : 'Send Request'}
                    </button>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded">
                    {endpoint.method} {fullUrl}
                </div>

                {endpoint.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                    </p>
                )}
            </div>

            {/* Parameters */}
            <div className="p-4">
                <Accordion>
                    <ParameterSection
                        title="Path Parameters"
                        parameters={endpoint.pathParameters}
                        values={parameters}
                        onChange={handleParameterChange}
                        icon="🔗"
                    />

                    <ParameterSection
                        title="Query Parameters"
                        parameters={endpoint.queryParameters}
                        values={parameters}
                        onChange={handleParameterChange}
                        icon="❓"
                    />

                    <ParameterSection
                        title="Headers"
                        parameters={endpoint.headers}
                        values={parameters}
                        onChange={handleParameterChange}
                        icon="📋"
                    />

                    {endpoint.bodySchema && (
                        <ParameterSection
                            title="Request Body"
                            parameters={endpoint.bodySchema.parameters}
                            values={parameters}
                            onChange={handleParameterChange}
                            icon="📄"
                        />
                    )}

                    {endpoint.responses.length > 0 && (
                        <AccordionItem title="Response Examples" icon={<span>📝</span>} badge={String(endpoint.responses.length)}>
                            <div className="space-y-4 pt-4">
                                {endpoint.responses.map((response: any, index: number) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {response.statusCode} - {response.description}
                                            </span>
                                        </div>
                                        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                                            {JSON.stringify(response.body, null, 2)}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </AccordionItem>
                    )}

                    {testResult && (
                        <AccordionItem
                            title="Test Result"
                            icon={<span>{testResult.success ? '✅' : '❌'}</span>}
                            badgeColor={testResult.success ? 'green' : 'red'}
                            badge={String(testResult.statusCode)}
                            defaultOpen={true}
                        >
                            <div className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Status:</span> {testResult.statusCode}
                                    </div>
                                    <div>
                                        <span className="font-medium">Response Time:</span> {testResult.responseTime}ms
                                    </div>
                                </div>

                                {testResult.error && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                                        <h4 className="font-medium text-red-800 dark:text-red-300">Error:</h4>
                                        <p className="text-red-700 dark:text-red-400 text-sm">{testResult.error}</p>
                                    </div>
                                )}

                                <div>
                                    <h4 className="font-medium mb-2">Response Body:</h4>
                                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                                        {JSON.stringify(testResult.responseBody, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </AccordionItem>
                    )}
                </Accordion>
            </div>
        </div>
    );
}
