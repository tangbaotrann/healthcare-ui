// lib
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// me
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UpdateInfoUser from './pages/UpdateInfoUser';
import UpdateProfileDoctor from './pages/UpdateProfileDoctor';
import Home from './pages/Home';

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

                {/* Create information user */}
                <Route path="/create/info" element={<UpdateInfoUser />} />

                {/* Update profile doctor */}
                <Route path="/create/profile-doctor" element={<UpdateProfileDoctor />} />

                {/* Home */}
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
