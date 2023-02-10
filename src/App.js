// lib
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// me
import { endPoints } from './routers';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UpdateInfoUser from './pages/UpdateInfoUser';
import UpdateProfileDoctor from './pages/UpdateProfileDoctor';
import Home from './pages/Home';
import DoctorManager from './pages/DoctorManager';
import { fetchApiUserDoctorByToken } from './redux/features/user/userSlice';

function App() {
    const dispatch = useDispatch();
    const getToken = JSON.parse(localStorage.getItem('token_user_login'));

    useEffect(() => {
        dispatch(fetchApiUserDoctorByToken(getToken));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                {/* Doctor Manager */}
                <Route path={endPoints.doctorManager} element={<DoctorManager />} />
            </Routes>
        </Router>
    );
}

export default App;
