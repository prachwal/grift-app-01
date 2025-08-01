import { LocationProvider, Router, Route } from 'preact-iso';
import { ThemeProvider } from './theme/ThemeProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MainLayout } from './layouts/MainLayout';
import { FullWidthLayout } from './layouts/FullWidthLayout';
import { HomePage, AboutPage, SettingsPage, NotFoundPage, ApiTestPage } from './pages';

function App() {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <Router>
                        <Route path="/" component={() => <MainLayout><HomePage /></MainLayout>} />
                        <Route path="/about" component={() => <MainLayout><AboutPage /></MainLayout>} />
                        <Route path="/settings" component={() => <MainLayout><SettingsPage /></MainLayout>} />
                        <Route path="/api-test" component={() => <FullWidthLayout><ApiTestPage /></FullWidthLayout>} />
                        <Route default component={() => <NotFoundPage />} />
                    </Router>
                </ThemeProvider>
            </ErrorBoundary>
        </LocationProvider>
    );
}

export default App;