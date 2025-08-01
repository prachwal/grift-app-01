import { signal } from '@preact/signals';
import { SectionHeading } from '../components/ui/SectionHeading';
import { LinkCard } from '../components/ui/LinkCard';

/**
 * @fileoverview 404 Not Found page component
 * @packageDocumentation
 */

const refreshSignal = signal(0);

export function NotFoundPage() {
    const handleRetry = () => {
        refreshSignal.value++;
        window.history.back();
    };

    return (
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
            <div class="max-w-2xl mx-auto text-center">
                {/* Large 404 Text */}
                <div class="mb-8">
                    <h1 class="text-9xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                        404
                    </h1>
                    <div class="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-8"></div>
                </div>

                {/* Error Message */}
                <SectionHeading level={1} centered>
                    <div class="mb-4">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Strona nie została znaleziona
                        </h2>
                        <p class="text-lg text-gray-600 dark:text-gray-400">
                            Szukana strona nie istnieje lub została przeniesiona. Sprawdź adres URL lub wróć na stronę główną.
                        </p>
                    </div>
                </SectionHeading>

                {/* Error Icon */}
                <div class="my-12">
                    <div class="w-32 h-32 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <svg
                            class="w-16 h-16 text-purple-600 dark:text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8C9.239 4 7 6.239 7 9v3a1 1 0 001 1h8a1 1 0 001-1V9c0-2.761-2.239-5-5-5z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Action Cards */}
                <div class="grid md:grid-cols-2 gap-6 mt-12">
                    <LinkCard
                        href="/"
                        icon={
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        }
                    >
                        <div>
                            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Strona główna</h3>
                            <p class="text-gray-600 dark:text-gray-400">Wróć na stronę główną aplikacji</p>
                        </div>
                    </LinkCard>
                    <LinkCard
                        href="#"
                        icon={
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        }
                    >
                        <div onClick={handleRetry}>
                            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Wstecz</h3>
                            <p class="text-gray-600 dark:text-gray-400">Wróć do poprzedniej strony</p>
                        </div>
                    </LinkCard>
                </div>

                {/* Additional Help */}
                <div class="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Potrzebujesz pomocy?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Jeśli problem się powtarza, skontaktuj się z naszym zespołem wsparcia.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            onClick={() => window.location.reload()}
                        >
                            Odśwież stronę
                        </button>
                        <button
                            class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => console.log('Contact support clicked')}
                        >
                            Kontakt
                        </button>
                    </div>
                </div>

                {/* Debug Info (only in development) */}
                {import.meta.env.DEV && (
                    <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                        <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Debug Info:
                        </h4>
                        <pre class="text-sm text-gray-600 dark:text-gray-400">
                            {JSON.stringify({
                                url: window.location.href,
                                pathname: window.location.pathname,
                                timestamp: new Date().toISOString(),
                                userAgent: navigator.userAgent.slice(0, 100) + '...'
                            }, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
