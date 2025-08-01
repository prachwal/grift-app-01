import { Header } from './Header.tsx';
import { useUser } from '../hooks/useUser';

export interface FullWidthLayoutProps {
    children: preact.ComponentChildren;
}

/**
 * Full-width layout component with header and footer
 * Used for pages that need maximum screen space (dashboards, consoles, etc.)
 */
export const FullWidthLayout: React.FC<FullWidthLayoutProps> = ({ children }) => {
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

            {/* Main content area - full width */}
            <main className="pt-16">
                {/* Full-width content without container restrictions */}
                <div className="min-h-screen">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-[1600px] mx-auto px-6 py-6">
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
                            <a
                                href="#"
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                About
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
