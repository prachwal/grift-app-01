import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </MainLayout>
            </Router>
        </ThemeProvider>
    );
}

export default App;