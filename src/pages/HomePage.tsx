import { Button } from '../components/Button.tsx';
import { useUser } from '../hooks/useUser';

export interface PageProps {
  /*...*/
}

/** Simple page component */
export const HomePage: React.FC<PageProps> = () => {
  const { user, createAccount, logout, login } = useUser();
  const currentUser = user.value;

  return (
    <article className="max-w-none text-gray-700 dark:text-gray-300 text-base leading-relaxed transition-colors duration-300">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Design System
            <span className="block text-primary-600 dark:text-primary-400 mt-2">
              Component Library
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A comprehensive collection of reusable components built with design tokens,
            accessibility, and consistency in mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              label="Get Started"
              onClick={() => console.log('Get started clicked')}
            />
            <Button
              variant="outline"
              size="lg"
              label="View Components"
              onClick={() => console.log('View components clicked')}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Design Tokens
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Consistent colors, typography, spacing, and other design decisions
              codified as reusable tokens.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Accessibility First
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with WCAG guidelines in mind, ensuring components work for everyone.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Dark Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive dark mode support with smooth transitions and proper contrast ratios.
            </p>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Component Showcase
        </h2>

        <div className="space-y-8">
          {/* Buttons */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" label="Primary" onClick={() => { }} />
              <Button variant="secondary" label="Secondary" onClick={() => { }} />
              <Button variant="outline" label="Outline" onClick={() => { }} />
              <Button variant="ghost" label="Ghost" onClick={() => { }} />
            </div>
          </div>

          {/* User State Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Interactive Demo
            </h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-gray-100">
                    Welcome, <strong>{currentUser.name}</strong>!
                  </span>
                </div>
              ) : (
                <span className="text-gray-600 dark:text-gray-400">
                  You are not logged in
                </span>
              )}

              <div className="flex space-x-2">
                {currentUser ? (
                  <Button
                    variant="outline"
                    size="sm"
                    label="Log out"
                    onClick={logout}
                  />
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      label="Log in"
                      onClick={() => login('Jane Doe')}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      label="Sign up"
                      onClick={() => createAccount('John Smith')}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Learn More
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore our comprehensive documentation and component library.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://storybook.js.org/tutorials/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Storybook Tutorials
          </a>
          <a
            href="https://storybook.js.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Documentation
          </a>
        </div>
      </section>
    </article>
  );
};
