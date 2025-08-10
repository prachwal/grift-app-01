/**
 * @fileoverview Configurable logging system for debugging
 * @packageDocumentation
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogConfig {
    enabled: boolean;
    level: LogLevel;
    components: boolean;
    selectComponent: boolean;
    configProvider: boolean;
}

class Logger {
    private config: LogConfig;

    constructor() {
        this.config = {
            enabled: import.meta.env.VITE_DEBUG_LOGGING === 'true',
            level: (import.meta.env.VITE_LOG_LEVEL as LogLevel) || 'info',
            components: import.meta.env.VITE_LOG_COMPONENTS === 'true',
            selectComponent: import.meta.env.VITE_LOG_SELECT_COMPONENT === 'true',
            configProvider: import.meta.env.VITE_LOG_CONFIG_PROVIDER === 'true',
        };

        if (this.config.enabled) {
            console.log('🔧 Debug logging enabled with config:', this.config);
        }
    }

    private shouldLog(level: LogLevel, category?: string): boolean {
        if (!this.config.enabled) return false;

        // Check category-specific flags
        if (category === 'select' && !this.config.selectComponent) return false;
        if (category === 'config' && !this.config.configProvider) return false;
        if (category === 'component' && !this.config.components) return false;

        // Check log level
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        const currentLevelIndex = levels.indexOf(this.config.level);
        const messageLevelIndex = levels.indexOf(level);

        return messageLevelIndex >= currentLevelIndex;
    }

    debug(message: string, data?: any, category?: string) {
        if (this.shouldLog('debug', category)) {
            console.log(`🐛 [${category || 'DEBUG'}]`, message, data || '');
        }
    }

    info(message: string, data?: any, category?: string) {
        if (this.shouldLog('info', category)) {
            console.log(`ℹ️ [${category || 'INFO'}]`, message, data || '');
        }
    }

    warn(message: string, data?: any, category?: string) {
        if (this.shouldLog('warn', category)) {
            console.warn(`⚠️ [${category || 'WARN'}]`, message, data || '');
        }
    }

    error(message: string, error?: any, category?: string) {
        if (this.shouldLog('error', category)) {
            console.error(`❌ [${category || 'ERROR'}]`, message, error || '');
        }
    }

    // Specialized methods for specific components
    selectComponent(message: string, data?: any) {
        this.debug(message, data, 'select');
    }

    configProvider(message: string, data?: any) {
        this.debug(message, data, 'config');
    }

    component(message: string, data?: any) {
        this.debug(message, data, 'component');
    }

    // Method to trace component lifecycle
    componentLifecycle(componentName: string, phase: 'mount' | 'update' | 'unmount', data?: any) {
        this.debug(`${componentName} - ${phase}`, data, 'component');
    }

    // Method to trace Select component specifically
    selectLifecycle(phase: string, data?: any) {
        this.selectComponent(`Select component - ${phase}`, data);
    }

    // Method to log errors with full stack trace
    componentError(componentName: string, error: Error, props?: any) {
        this.error(`${componentName} component error`, {
            message: error.message,
            stack: error.stack,
            props: props
        }, 'component');
    }
}

// Create singleton instance
export const logger = new Logger();

// Export convenience methods
export const logDebug = logger.debug.bind(logger);
export const logInfo = logger.info.bind(logger);
export const logWarn = logger.warn.bind(logger);
export const logError = logger.error.bind(logger);
export const logSelectComponent = logger.selectComponent.bind(logger);
export const logConfigProvider = logger.configProvider.bind(logger);
export const logComponent = logger.component.bind(logger);
export const logComponentLifecycle = logger.componentLifecycle.bind(logger);
export const logSelectLifecycle = logger.selectLifecycle.bind(logger);
export const logComponentError = logger.componentError.bind(logger);
