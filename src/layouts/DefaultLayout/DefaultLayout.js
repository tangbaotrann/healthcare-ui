// me
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import socket from '~/utils/socket';
import notificationSlice from '~/redux/features/notification/notificationSlice';

function DefaultLayout({ children, checkUserLogin, patients }) {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('notification_confirm_register_schedule_success', ({ notification }) => {
            console.log('notification_confirm_register_schedule_success ->', notification);
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(notification));
        });
    }, []);

    useEffect(() => {
        socket.on('notification_register_schedule_from_patient_success', ({ notification }) => {
            console.log('notification_register_schedule_from_patient_success', notification);
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(notification));
        });
    }, []);

    return (
        <>
            {/* Header */}
            <Header checkUserLogin={checkUserLogin} patients={patients} />

            {/* Content */}
            <div style={{ marginTop: '90px' }}>{children}</div>

            <ToastContainer position="top-right" autoClose={3000} closeOnClick={false} />
        </>
    );
}

export default DefaultLayout;
