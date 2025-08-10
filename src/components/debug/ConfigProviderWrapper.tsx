/**
 * @fileoverview Safe ConfigProvider wrapper with fallback
 * @packageDocumentation
 */

/**
 * @fileoverview Safe ConfigProvider wrapper with fallback
 * @packageDocumentation
 */
import type { ComponentChildren } from 'preact';
import { logConfigProvider, logError } from '../../utils/logger';

interface ConfigProviderWrapperProps {
    children: ComponentChildren;
    theme?: any;
    componentDefaults?: any;
    locale?: string;
}

export function ConfigProviderWrapper({ children, theme, componentDefaults, locale }: ConfigProviderWrapperProps) {
    logConfigProvider('ConfigProviderWrapper initializing', {
        hasTheme: !!theme,
        hasComponentDefaults: !!componentDefaults,
        locale
    });

    try {
        // Simple fallback - render children directly without ConfigProvider
        // Since preact-nebula-ui has hooks context issues, we skip ConfigProvider entirely
        logConfigProvider('Using fallback mode - skipping ConfigProvider', {
            reason: 'preact-nebula-ui hooks context incompatibility'
        });

        return <>{children}</>;
    } catch (error) {
        logError('ConfigProvider import/render failed', error);

        // Fallback - render children without ConfigProvider
        return <>{children}</>;
    }
}
