// lib
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// me
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate replace to="/login" />} />

                {/* Register */}
                <Route path="/register" element={<Register />} />

                {/* Forgot password */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
