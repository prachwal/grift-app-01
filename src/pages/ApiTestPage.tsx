import { signal } from '@preact/signals';
import { useState } from 'preact/hooks';
import { type ApiResponse } from '../types/api';

/**
 * @fileoverview API Test page component for testing Netlify functions
 * @packageDocumentation
 */

interface TestResult {
    command: string;
    params: Record<string, any>;
    response?: ApiResponse<any>;
    error?: string;
    duration?: number;
    timestamp: string;
}

const testResults = signal<TestResult[]>([]);
const isLoading = signal<string | null>(null);

export function ApiTestPage() {
    const [selectedCommand, setSelectedCommand] = useState('hello');
    const [params, setParams] = useState<Record<string, string>>({});

    const API_BASE_URL = '/.netlify/functions/hello';

    const availableCommands = {
        hello: {
            name: 'Hello',
            description: 'Basic greeting endpoint',
            params: { name: 'string (optional)' }
        },
        health: {
            name: 'Health Check',
            description: 'System health status',
            params: { detailed: 'boolean (optional)' }
        },
        status: {
            name: 'System Status',
            description: 'Component status information',
            params: { component: 'api|database|cache|all (optional)' }
        },
        info: {
            name: 'System Info',
            description: 'Detailed system information',
            params: { include: 'array of: system,runtime,memory,environment (optional)' }
        },
        ping: {
            name: 'Ping',
            description: 'Simple ping-pong test',
            params: { echo: 'string (optional)' }
        }
    };

    const executeTest = async (command: string, testParams: Record<string, any> = {}) => {
        const startTime = Date.now();
        isLoading.value = command;

        try {
            const url = new URL(API_BASE_URL, window.location.origin);
            url.searchParams.set('cmd', command);

            Object.entries(testParams).forEach(([key, value]) => {
                if (value !== '' && value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            });

            const response = await fetch(url.toString());
            const data = await response.json();
            const duration = Date.now() - startTime;

            const result: TestResult = {
                command,
                params: testParams,
                response: data,
                duration,
                timestamp: new Date().toISOString()
            };

            testResults.value = [result, ...testResults.value.slice(0, 9)]; // Keep last 10 results
        } catch (error) {
            const duration = Date.now() - startTime;
            const result: TestResult = {
                command,
                params: testParams,
                error: error instanceof Error ? error.message : 'Unknown error',
                duration,
                timestamp: new Date().toISOString()
            };

            testResults.value = [result, ...testResults.value.slice(0, 9)];
        } finally {
            isLoading.value = null;
        }
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        executeTest(selectedCommand, params);
    };

    const clearResults = () => {
        testResults.value = [];
    };

    const runAllTests = async () => {
        const testCases = [
            { command: 'hello', params: { name: 'API Tester' } },
            { command: 'health', params: { detailed: 'true' } },
            { command: 'status', params: { component: 'all' } },
            { command: 'info', params: { include: 'system,runtime,memory' } },
            { command: 'ping', params: { echo: 'test message' } }
        ];

        for (const testCase of testCases) {
            await executeTest(testCase.command, testCase.params);
            // Small delay between tests
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    };

    return (
        <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div class="max-w-[1600px] mx-auto px-6 py-8">
                {/* Header */}
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        API Test Console
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                        Testuj endpointy API i sprawdzaj stan systemu. Wybierz komendę, ustaw parametry i wykonaj test.
                    </p>
                </div>

                <div class="grid lg:grid-cols-5 gap-8">
                    {/* Test Form Panel - Left Column */}
                    <div class="lg:col-span-2">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                                Wykonaj Test
                            </h2>

                            <form onSubmit={handleSubmit} class="space-y-6">
                                {/* Command Selection */}
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Wybierz komendę:
                                    </label>
                                    <select
                                        value={selectedCommand}
                                        onChange={(e) => {
                                            const target = e.target as HTMLSelectElement;
                                            setSelectedCommand(target.value);
                                            setParams({});
                                        }}
                                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    >
                                        {Object.entries(availableCommands).map(([key, cmd]) => (
                                            <option key={key} value={key}>
                                                {cmd.name} - {cmd.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Command Info Card */}
                                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                                            <svg class="w-4 h-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                                {availableCommands[selectedCommand as keyof typeof availableCommands].name}
                                            </h3>
                                            <p class="text-sm text-blue-700 dark:text-blue-300 mb-3">
                                                {availableCommands[selectedCommand as keyof typeof availableCommands].description}
                                            </p>
                                            <div class="bg-blue-100 dark:bg-blue-800/50 rounded-md p-3">
                                                <p class="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">Parametry:</p>
                                                <pre class="text-xs text-blue-700 dark:text-blue-300 font-mono">
                                                    {JSON.stringify(availableCommands[selectedCommand as keyof typeof availableCommands].params, null, 2)}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Parameters Input */}
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Parametry <span class="text-gray-500">(klucz=wartość, jeden na linię)</span>:
                                    </label>
                                    <textarea
                                        value={Object.entries(params).map(([k, v]) => `${k}=${v}`).join('\\n')}
                                        onChange={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            const lines = target.value.split('\\n').filter(Boolean);
                                            const newParams: Record<string, string> = {};
                                            lines.forEach(line => {
                                                const [key, ...valueParts] = line.split('=');
                                                if (key && valueParts.length > 0) {
                                                    newParams[key.trim()] = valueParts.join('=').trim();
                                                }
                                            });
                                            setParams(newParams);
                                        }}
                                        rows={4}
                                        placeholder="name=World\\ndetailed=true"
                                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div class="flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        disabled={isLoading.value === selectedCommand}
                                        class="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                                    >
                                        {isLoading.value === selectedCommand ? (
                                            <>
                                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Wykonywanie...</span>
                                            </>
                                        ) : (
                                            <span>Wykonaj Test</span>
                                        )}
                                    </button>

                                    <div class="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={runAllTests}
                                            disabled={isLoading.value !== null}
                                            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            Testuj Wszystkie
                                        </button>
                                        <button
                                            type="button"
                                            onClick={clearResults}
                                            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                                        >
                                            Wyczyść Wyniki
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Results Panel - Right Columns */}
                    <div class="lg:col-span-3">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Wyniki Testów
                                </h2>
                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                    {testResults.value.length > 0 && `${testResults.value.length} wyników`}
                                </div>
                            </div>

                            {testResults.value.length === 0 ? (
                                <div class="text-center py-16">
                                    <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                        <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                        Brak wyników testów
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400 mb-6">
                                        Wykonaj test API, aby zobaczyć wyniki i odpowiedzi tutaj.
                                    </p>
                                    <button
                                        onClick={() => executeTest('hello')}
                                        class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                    >
                                        Wykonaj przykładowy test
                                    </button>
                                </div>
                            ) : (
                                <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                    {testResults.value.map((result, index) => (
                                        <div
                                            key={`${result.timestamp}-${index}`}
                                            class={`border-l-4 rounded-lg shadow-sm transition-all duration-200 ${result.error
                                                ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                                                : 'border-l-green-500 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                                                }`}
                                        >
                                            <div class="p-6">
                                                {/* Result Header */}
                                                <div class="flex justify-between items-start mb-4">
                                                    <div class="flex items-center space-x-3">
                                                        <div class={`w-2 h-2 rounded-full ${result.error ? 'bg-red-500' : 'bg-green-500'}`} />
                                                        <div>
                                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                                                {result.command}
                                                            </h3>
                                                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                                                {new Date(result.timestamp).toLocaleString('pl-PL', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    second: '2-digit',
                                                                    day: '2-digit',
                                                                    month: '2-digit'
                                                                })} • {result.duration}ms
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center space-x-2">
                                                        <span
                                                            class={`px-3 py-1 rounded-full text-xs font-medium ${result.error
                                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                }`}
                                                        >
                                                            {result.error ? 'BŁĄD' : 'SUKCES'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Parameters */}
                                                {Object.keys(result.params).length > 0 && (
                                                    <div class="mb-4">
                                                        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            Parametry
                                                        </h4>
                                                        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border">
                                                            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
                                                                {JSON.stringify(result.params, null, 2)}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Response or Error */}
                                                <div>
                                                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                                        {result.error ? (
                                                            <>
                                                                <svg class="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Komunikat błędu
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Odpowiedź API
                                                            </>
                                                        )}
                                                    </h4>
                                                    <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border overflow-hidden">
                                                        <pre class="text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap max-h-64 overflow-y-auto">
                                                            {result.error
                                                                ? result.error
                                                                : JSON.stringify(result.response, null, 2)
                                                            }
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions Panel */}
                <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div class="text-center mb-8">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Szybkie Testy
                        </h2>
                        <p class="text-gray-600 dark:text-gray-400">
                            Kliknij, aby wykonać test bez ustawiania parametrów
                        </p>
                    </div>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
                        {Object.entries(availableCommands).map(([key, cmd]) => (
                            <button
                                key={key}
                                onClick={() => executeTest(key)}
                                disabled={isLoading.value !== null}
                                class="group relative p-6 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-primary-50 dark:hover:from-primary-900/20"
                            >
                                <div class="flex items-start justify-between mb-3">
                                    <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                                        <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    {isLoading.value === key && (
                                        <div class="w-4 h-4">
                                            <svg class="animate-spin w-4 h-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                                    {cmd.name}
                                </h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {cmd.description}
                                </p>

                                {isLoading.value === key && (
                                    <div class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-xl flex items-center justify-center">
                                        <div class="text-center">
                                            <div class="w-6 h-6 mx-auto mb-2">
                                                <svg class="animate-spin w-6 h-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                            <p class="text-xs font-medium text-primary-600 dark:text-primary-400">
                                                Wykonywanie...
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
