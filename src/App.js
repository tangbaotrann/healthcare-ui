// lib
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// me
import { endPoints } from './routers';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UpdateInfoUser from './pages/UpdateInfoUser';
import UpdateProfileDoctor from './pages/UpdateProfileDoctor';
import Home from './pages/Home';

function App() {
    const getToken = JSON.parse(localStorage.getItem('token_user_login'));

    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path={endPoints.login} element={<Login />} />
                <Route
                    path={endPoints.root}
                    element={
                        typeof getToken === 'undefined' || !getToken ? (
                            <Navigate replace to={endPoints.login} />
                        ) : (
                            <Navigate replace to={endPoints.home} />
                        )
                    }
                />

                {/* Register */}
                <Route path={endPoints.register} element={<Register />} />

                {/* Forgot password */}
                <Route path={endPoints.forgotPassword} element={<ForgotPassword />} />

                {/* Create information user */}
                <Route path={endPoints.createInfo} element={<UpdateInfoUser />} />

                {/* Update profile doctor */}
                <Route path={endPoints.createProfileDoctor} element={<UpdateProfileDoctor />} />

                {/* Home */}
                <Route path={endPoints.home} element={<Home />} />
                <Route
                    path={endPoints.root}
                    element={
                        typeof getToken === 'undefined' || !getToken ? (
                            <Navigate replace to={endPoints.home} />
                        ) : (
                            <Navigate replace to={endPoints.login} />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
