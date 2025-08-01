import { Header } from './Header';
import { useUser } from '../hooks/useUser';

export interface MainLayoutProps {
    children: preact.ComponentChildren;
}

/**
 * Main layout component with header and footer
 * Used as the primary layout for most pages
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { user, login, logout, createAccount } = useUser();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Fixed Header with semi-transparent backdrop */}
            <Header
                user={user.value}
                onLogin={() => login('Demo User')}
                onLogout={logout}
                onCreateAccount={() => createAccount('New User')}
            />

            {/* Main content area */}
            <main className="pt-16">
                <div className="min-h-screen flex items-start justify-center px-4 py-8">
                    {/* A4-sized content container */}
                    <div className="w-full max-w-a4 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
                        {/* Page content */}
                        <div className="p-8 md:p-12">
                            {children}
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
    );
};
