import { ThemeSwitcher } from '../components/ThemeSwitcher.tsx';
import { Button } from './Button.tsx';

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
}) => (
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
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform hover:scale-105"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                  fill="currentColor"
                  className="text-gray-100 dark:text-gray-800"
                />
                <path
                  d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                  className="fill-primary-600"
                />
                <path
                  d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                  className="fill-primary-400"
                />
              </g>
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-none">
              Grift App
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">
              Design System
            </span>
          </div>
        </div>

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
