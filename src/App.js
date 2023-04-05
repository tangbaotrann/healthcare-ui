// lib
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Maps from './components/Maps';
import { fetchApiUserDoctorByToken } from './redux/features/user/userSlice';
import { fetchApiUserDoctorByTokenSelector } from './redux/selector';
import Meeting from './components/Meeting';
import CreateInfoPatient from './pages/CreateInfoPatient/CreateInfoPatient';
import RegisterScheduleAppointment from './pages/RegisterScheduleAppointment';
import BlogPage from './pages/BlogPage';

function App() {
    const dispatch = useDispatch();
    const getToken = JSON.parse(localStorage.getItem('token_user_login'));

    const checkUserLogin = useSelector(fetchApiUserDoctorByTokenSelector);

    // console.log('getToken - app', getToken);
    // console.log('userLogin - app', checkUserLogin);

    useEffect(() => {
        dispatch(fetchApiUserDoctorByToken(getToken));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path={endPoints.login} element={<Login getToken={getToken} />} />
                <Route
                    path={endPoints.root}
                    element={
                        typeof getToken === 'undefined' || !getToken ? (
                            <Navigate replace to={endPoints.homeIntro} />
                        ) : (
                            <Navigate replace to={endPoints.doctorManager} />
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

                {/* Home intro */}
                <Route path={endPoints.homeIntro} element={<Home checkUserLogin={checkUserLogin} />} />
                <Route
                    path={endPoints.root}
                    element={
                        typeof getToken === 'undefined' || !getToken ? (
                            <Navigate replace to={endPoints.homeIntro} />
                        ) : (
                            <Navigate replace to={endPoints.doctorManager} />
                        )
                    }
                />

                {/* Doctor Manager */}
                <Route path={`${endPoints.meetingRoom}/:roomId/:username`} element={<Meeting />} />
                <Route path={endPoints.doctorManager} element={<DoctorManager />} />

                {/* Maps */}
                <Route path={`${endPoints.maps}/:address`} element={<Maps />} />

                {/* -- Patient --  */}
                <Route path={`${endPoints.createInfoPatient}`} element={<CreateInfoPatient />} />
                <Route path={`${endPoints.registerScheduleAppointment}`} element={<RegisterScheduleAppointment />} />
                <Route path={`${endPoints.blog}`} element={<BlogPage />} />
            </Routes>
        </Router>
    );
}

export default App;
