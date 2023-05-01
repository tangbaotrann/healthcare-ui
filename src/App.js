// lib
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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
import { btnClickGetUsernameLeavedRoomSelector, fetchApiUserDoctorByTokenSelector } from './redux/selector';
import Meeting from './components/Meeting';
import CreateInfoPatient from './pages/CreateInfoPatient/CreateInfoPatient';
import RegisterScheduleAppointment from './pages/RegisterScheduleAppointment';
import BlogPage from './pages/BlogPage';
import Chat from './pages/Chat';
import NotificationsPage from './pages/NotificationsPage';
import MetricsPatient from './pages/MetricsPatient/MetricsPatient';
import ListRegisterScheduleAppointment from './pages/ListRegisterScheduleAppointment';
import PageNotFound from './pages/PageNotFound';
import socket from './utils/socket';
import callSlice from './redux/features/call/callSlice';

function App() {
    const [rule, setRule] = useState();
    // const [infoUserJoin, setInfoUserJoin] = useState();

    const dispatch = useDispatch();
    const getToken = JSON.parse(localStorage.getItem('token_user_login'));

    const checkUserLogin = useSelector(fetchApiUserDoctorByTokenSelector);

    // console.log('checkLeavedRoom - app router', checkLeavedRoom);
    // console.log('infoUserJoin - app router', infoUserJoin);
    // console.log('getToken - app router', getToken);
    // console.log('rule - app router', rule);
    // console.log('userLogin - app', checkUserLogin);

    // useEffect(() => {
    //     socket.on('user_join_room_call_success', ({ patient }) => {
    //         console.log('user_join_room_call_success', patient);
    //         setInfoUserJoin(patient);
    //     });
    // }, []);

    useEffect(() => {
        if (getToken) {
            let decodeUser = jwt_decode(getToken);
            setRule(decodeUser);
            dispatch(fetchApiUserDoctorByToken(getToken));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getToken]);

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
                        ) : rule?.rule === 'doctor' ? (
                            <Navigate replace to={endPoints.doctorManager} />
                        ) : rule?.rule === 'patient' ? (
                            <Navigate replace to={endPoints.homeIntro} />
                        ) : (
                            <PageNotFound />
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
                        ) : rule?.rule === 'doctor' ? (
                            <Navigate replace to={endPoints.doctorManager} />
                        ) : rule?.rule === 'patient' ? (
                            <Navigate replace to={endPoints.homeIntro} />
                        ) : (
                            <PageNotFound />
                        )
                    }
                />

                {/* Doctor Manager */}
                <Route path={`${endPoints.meetingRoom}/:roomId/:scheduleDetailId/:username`} element={<Meeting />} />
                <Route path={`${endPoints.meetingRoom}/:roomId/:username`} element={<Meeting />} />

                <Route path={`${endPoints.doctorManager}`} element={<DoctorManager />} />
                <Route
                    path={`${endPoints.doctorManager}`}
                    element={
                        getToken === null ? (
                            <Navigate replace to={endPoints.homeIntro} />
                        ) : (
                            <Navigate replace to={endPoints.doctorManager} />
                        )
                    }
                />

                {/* Maps */}
                <Route path={`${endPoints.maps}/:address`} element={<Maps getToken={getToken} />} />

                {/* -- Patient --  */}
                <Route path={`${endPoints.chatMessage}`} element={<Chat />} />
                <Route path={`${endPoints.createInfoPatient}`} element={<CreateInfoPatient />} />
                <Route path={`${endPoints.registerScheduleAppointment}`} element={<RegisterScheduleAppointment />} />
                <Route
                    path={`${endPoints.registerScheduleAppointmentList}`}
                    element={<ListRegisterScheduleAppointment />}
                />
                <Route path={`${endPoints.blog}`} element={<BlogPage />} />
                <Route path={`${endPoints.notificationPatient}`} element={<NotificationsPage />} />
                <Route path={`${endPoints.metricsPatient}`} element={<MetricsPatient />} />

                {/* Page not found */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
