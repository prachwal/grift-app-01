import { useLocation } from 'preact-iso';
import { ThemeSwitcher } from '../components/ThemeSwitcher.tsx';
import { Button } from '../components/Button.tsx';

export interface User {
  name: string;
}

export interface HeaderProps {
  user?: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user = null,
  onLogin,
  onLogout,
  onCreateAccount
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.path === path;

  return (
    <header className="sticky top-0 z-fixed backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="text-primary-600 dark:text-primary-400"
                fill="currentColor"
              >
                <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13z" />
                <path d="M21.5 10.5L16 16l-5.5-5.5L9 12l7 7 7-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-none">
                Grift
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">
                Design System
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
            >
              Strona główna
            </a>
            <a
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about')
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
            >
              O nas
            </a>
            <a
              href="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/settings')
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
            >
              Ustawienia
            </a>
            <a
              href="/api-test"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/api-test')
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
            >
              API Test
            </a>
          </nav>

          {/* Navigation and user actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Welcome, <span className="font-medium">{user.name}</span>!
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  label="Log out"
                />
                <ThemeSwitcher />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogin}
                  label="Log in"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onCreateAccount}
                  label="Sign up"
                />
                <ThemeSwitcher />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};