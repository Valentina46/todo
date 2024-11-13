import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Login } from './components/Login/Login';
import { TodoPage }   from './components/TodoPage/TodoPage';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);
    const handleLogin = (success: boolean) => {
        setIsAuthenticated(success);
        if (success) {
            localStorage.setItem('isAuthenticated', 'true'); 
        } else {
            localStorage.removeItem('isAuthenticated');
        }
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); 
    };

    return (
        <Routes>
            <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/todo" replace /> : <Login onLogin={handleLogin} />}
            />
            <Route
                path="/todo"
                element={isAuthenticated ? <TodoPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
            />
        </Routes>
    );
};

export default App;