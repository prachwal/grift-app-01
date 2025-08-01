import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeProvider';
import { Header } from './stories/Header';
import { Page } from './stories/Page';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Router>
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                        {/* Fixed Header with semi-transparent backdrop */}
                        <Header
                            user={null}
                            onLogin={() => console.log('Login clicked')}
                            onLogout={() => console.log('Logout clicked')}
                            onCreateAccount={() => console.log('Create account clicked')}
                        />

                        {/* Main content area with A4-like layout */}
                        <main className="pt-16">
                            <div className="min-h-screen flex items-start justify-center px-4 py-8">
                                {/* A4-sized content container */}
                                <div className="w-full max-w-a4 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
                                    {/* Page content */}
                                    <div className="p-8 md:p-12">
                                        <Routes>
                                            <Route path="/" element={<Page />} />
                                        </Routes>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        © 2025 Grift App. Built with design tokens and accessibility in mind.
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <a
                                            href="#"
                                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            Privacy
                                        </a>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            Terms
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;