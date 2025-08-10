import { Component, type ComponentChildren } from 'preact';
import { signal } from '@preact/signals';
import { logError, logComponentError } from '../utils/logger';

/**
 * @fileoverview Error Boundary component for catching and handling errors
 * @packageDocumentation
 */

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: any;
}

interface ErrorBoundaryProps {
    children: ComponentChildren;
    fallback?: ComponentChildren;
    onError?: (error: Error, errorInfo: any) => void;
}

const errorCount = signal(0);

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        errorCount.value++;
        logError('ErrorBoundary caught error in getDerivedStateFromError', error);
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        logComponentError('ErrorBoundary', error, {
            errorInfo,
            componentStack: errorInfo?.componentStack,
            errorBoundary: 'ErrorBoundary'
        });

        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Additional detailed logging for Select-related errors
        if (error.message?.includes('trigger') || error.stack?.includes('preact-nebula-ui')) {
            logError('Select component error detected', {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo?.componentStack,
                timestamp: new Date().toISOString()
            });
        }

        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        this.setState({
            error,
            errorInfo
        });
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined
        });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 px-4">
                    <div class="max-w-2xl mx-auto text-center">
                        {/* Error Icon */}
                        <div class="mb-8">
                            <div class="w-32 h-32 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <svg
                                    class="w-16 h-16 text-red-600 dark:text-red-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div class="mb-8">
                            <h1 class="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
                                Wystąpił błąd aplikacji
                            </h1>
                            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                Przepraszamy za niedogodności. Aplikacja napotkała nieoczekiwany błąd.
                            </p>
                        </div>

                        {/* Error Details (development only) */}
                        {import.meta.env.DEV && this.state.error && (
                            <div class="mb-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-left border border-red-200 dark:border-red-800">
                                <h3 class="font-semibold text-red-800 dark:text-red-200 mb-3">
                                    Szczegóły błędu (tryb deweloperski):
                                </h3>
                                <div class="space-y-3">
                                    <div>
                                        <h4 class="font-medium text-red-700 dark:text-red-300">Komunikat:</h4>
                                        <pre class="text-sm text-red-600 dark:text-red-400 mt-1 bg-white dark:bg-gray-900 p-2 rounded border">
                                            {this.state.error.message}
                                        </pre>
                                    </div>
                                    {this.state.error.stack && (
                                        <div>
                                            <h4 class="font-medium text-red-700 dark:text-red-300">Stack trace:</h4>
                                            <pre class="text-xs text-red-600 dark:text-red-400 mt-1 bg-white dark:bg-gray-900 p-2 rounded border max-h-32 overflow-y-auto">
                                                {this.state.error.stack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <button
                                onClick={this.handleRetry}
                                class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Spróbuj ponownie
                            </button>
                            <button
                                onClick={this.handleReload}
                                class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Odśwież stronę
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Strona główna
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Co możesz zrobić?
                            </h3>
                            <ul class="text-left text-gray-600 dark:text-gray-400 space-y-2">
                                <li class="flex items-start">
                                    <span class="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Spróbuj odświeżyć stronę
                                </li>
                                <li class="flex items-start">
                                    <span class="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Sprawdź połączenie internetowe
                                </li>
                                <li class="flex items-start">
                                    <span class="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Wyczyść pamięć podręczną przeglądarki
                                </li>
                                <li class="flex items-start">
                                    <span class="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Jeśli problem się powtarza, skontaktuj się z administratorem
                                </li>
                            </ul>
                        </div>

                        {/* Error Stats (development only) */}
                        {import.meta.env.DEV && (
                            <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Liczba błędów w tej sesji: {errorCount.value}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Hook version for functional components
 */
export function useErrorHandler() {
    return (error: Error, errorInfo?: any) => {
        console.error('Caught error:', error, errorInfo);
        // Można dodać integrację z systemem raportowania błędów
    };
}
