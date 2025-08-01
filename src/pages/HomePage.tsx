import { Button } from '../components/Button.tsx';
import {
  HeroSection,
  SectionHeading,
  FeatureGrid,
  FeatureCard,
  ShowcaseCard,
  UserStateDemo,
  LinkCard
} from '../components/ui';

export interface PageProps {
  /*...*/
}

/** Simple page component */
export const HomePage: React.FC<PageProps> = () => {
  return (
    <article className="max-w-none text-gray-700 dark:text-gray-300 text-base leading-relaxed transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection
        title="Design System"
        subtitle="Component Library"
        description="A comprehensive collection of reusable components built with design tokens, accessibility, and consistency in mind."
        primaryButton={{
          label: "Get Started",
          onClick: () => console.log('Get started clicked')
        }}
        secondaryButton={{
          label: "View Components",
          onClick: () => console.log('View components clicked')
        }}
      />

      {/* Features Grid */}
      <section className="mb-12">
        <SectionHeading centered>Key Features</SectionHeading>
        <FeatureGrid>
          <FeatureCard
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4V5z" />}
            iconBgColor="primary"
            title="Design Tokens"
            description="Consistent colors, typography, spacing, and other design decisions codified as reusable tokens."
          />
          <FeatureCard
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
            iconBgColor="success"
            title="Accessibility First"
            description="Built with WCAG guidelines in mind, ensuring components work for everyone."
          />
          <FeatureCard
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />}
            iconBgColor="warning"
            title="Dark Mode"
            description="Comprehensive dark mode support with smooth transitions and proper contrast ratios."
          />
        </FeatureGrid>
      </section>

      {/* Component Showcase */}
      <section className="mb-12">
        <SectionHeading centered>Component Showcase</SectionHeading>

        <div className="space-y-8">
          {/* Buttons */}
          <ShowcaseCard title="Buttons">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" label="Primary" onClick={() => { }} />
              <Button variant="secondary" label="Secondary" onClick={() => { }} />
              <Button variant="outline" label="Outline" onClick={() => { }} />
              <Button variant="ghost" label="Ghost" onClick={() => { }} />
            </div>
          </ShowcaseCard>

          {/* User State Demo */}
          <ShowcaseCard title="Interactive Demo">
            <UserStateDemo />
          </ShowcaseCard>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="text-center">
        <SectionHeading level={2}>Learn More</SectionHeading>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore our comprehensive documentation and component library.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkCard
            href="https://storybook.js.org/tutorials/"
            external
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
          >
            Storybook Tutorials
          </LinkCard>
          <LinkCard
            href="https://storybook.js.org/docs"
            external
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
          >
            Documentation
          </LinkCard>
        </div>
      </section>
    </article>
  );
};
