import { SectionHeading, LinkCard } from '../components/ui';

export const AboutPage: React.FC = () => {
    return (
        <article className="max-w-none text-gray-700 dark:text-gray-300 text-base leading-relaxed transition-colors duration-300">
            {/* Main Content */}
            <section className="mb-12">
                <SectionHeading level={1} centered>About Our Design System</SectionHeading>

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center">
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            Built with modern web technologies and best practices to provide a scalable,
                            maintainable, and accessible component library.
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                            Technology Stack
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Frontend Framework
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li><strong>Preact 10.26.9</strong> - Lightweight React alternative</li>
                                    <li><strong>@preact/signals 1.3.2</strong> - Reactive state management</li>
                                    <li><strong>React Router 7.7.1</strong> - Client-side routing</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Development Tools
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li><strong>Vite 7.0.4</strong> - Build tool and dev server</li>
                                    <li><strong>TypeScript 5.8.3</strong> - Static type checking</li>
                                    <li><strong>Tailwind CSS 3.4.17</strong> - Utility-first CSS</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Testing & Quality
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li><strong>Vitest 3.2.4</strong> - Unit testing framework</li>
                                    <li><strong>Testing Library</strong> - Component testing utilities</li>
                                    <li><strong>jsdom 24.0.0</strong> - DOM implementation</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Documentation
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li><strong>Storybook 9.1.0</strong> - Component documentation</li>
                                    <li><strong>Accessibility Addon</strong> - A11y testing</li>
                                    <li><strong>Chromatic</strong> - Visual testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Architecture */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                            Architecture Principles
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    Separation of Concerns
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Clear separation between presentation components (.tsx), business logic (hooks, services),
                                    and pure utility functions. Each component has a single responsibility.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    Design Tokens
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Centralized design decisions through tokens for colors, typography, spacing, and other
                                    design elements. Ensures consistency and easy theming.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    Accessibility First
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Built with WCAG guidelines in mind, including proper ARIA attributes, semantic HTML,
                                    keyboard navigation, and screen reader support.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    Modern State Management
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Using @preact/signals for reactive state management with minimal boilerplate
                                    and excellent performance characteristics.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Project Structure */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                            Project Structure
                        </h2>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                            <div className="text-gray-800 dark:text-gray-200">
                                <div>📁 src/</div>
                                <div className="ml-4">📁 components/ &nbsp;&nbsp; <span className="text-gray-500"># UI components (.tsx)</span></div>
                                <div className="ml-4">📁 pages/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Application pages</span></div>
                                <div className="ml-4">📁 layouts/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Layout components</span></div>
                                <div className="ml-4">📁 hooks/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Custom hooks (.ts)</span></div>
                                <div className="ml-4">📁 services/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Business logic (.ts)</span></div>
                                <div className="ml-4">📁 utils/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Pure functions (.ts)</span></div>
                                <div className="ml-4">📁 design-system/ <span className="text-gray-500"># Design tokens</span></div>
                                <div className="ml-4">📁 theme/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Theme management</span></div>
                                <div className="ml-4">📁 stories/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-gray-500"># Storybook stories</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="text-center">
                        <SectionHeading level={2}>Useful Resources</SectionHeading>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <LinkCard
                                href="https://preactjs.com/"
                                external
                                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
                            >
                                Preact Documentation
                            </LinkCard>
                            <LinkCard
                                href="https://vitejs.dev/"
                                external
                                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                            >
                                Vite Guide
                            </LinkCard>
                            <LinkCard
                                href="https://tailwindcss.com/"
                                external
                                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4V5z" />}
                            >
                                Tailwind CSS
                            </LinkCard>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};
