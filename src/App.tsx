import { LocationProvider, Router, Route } from 'preact-iso';
import { ThemeProvider } from './theme/ThemeProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MainLayout } from './layouts/MainLayout';
import { FullWidthLayout } from './layouts/FullWidthLayout';
import { HomePage, AboutPage, SettingsPage, NotFoundPage, ApiTestPage } from './pages';
import { createNebulaThemeConfig, componentDefaults } from './theme/ConfigProviderIntegration';
import { ConfigProviderWrapper } from './components/debug/ConfigProviderWrapper';
import { logConfigProvider, logInfo } from './utils/logger';
import './utils/debugNebulaUI'; // Import to run debug on startup

function App() {
    logInfo('App component initializing');

    const themeConfig = createNebulaThemeConfig();
    logConfigProvider('Theme config created', themeConfig);

    logConfigProvider('Component defaults', componentDefaults);

    return (
        <LocationProvider>
            <ErrorBoundary>
                <ConfigProviderWrapper
                    theme={themeConfig}
                    componentDefaults={componentDefaults}
                    locale="en-US"
                >
                    {(() => {
                        logConfigProvider('ConfigProvider rendered with props', {
                            theme: themeConfig,
                            componentDefaults,
                            locale: "en-US"
                        });
                        return null;
                    })()}
                    <ThemeProvider>
                        <Router>
                            <Route path="/" component={() => <MainLayout><HomePage /></MainLayout>} />
                            <Route path="/about" component={() => <MainLayout><AboutPage /></MainLayout>} />
                            <Route path="/settings" component={() => <MainLayout><SettingsPage /></MainLayout>} />
                            <Route path="/api-test" component={() => <FullWidthLayout><ApiTestPage /></FullWidthLayout>} />
                            <Route default component={() => <NotFoundPage />} />
                        </Router>
                    </ThemeProvider>
                </ConfigProviderWrapper>
            </ErrorBoundary>
        </LocationProvider>
    );
}

export default App;