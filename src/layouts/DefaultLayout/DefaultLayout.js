// me
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import socket from '~/utils/socket';
import notificationSlice from '~/redux/features/notification/notificationSlice';
import messageSlice from '~/redux/features/message/messageSlice';

function DefaultLayout({ children, checkUserLogin, patients }) {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('notification_confirm_register_schedule_success', ({ notification }) => {
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(notification));
        });
    }, []);

    useEffect(() => {
        socket.on('notification_register_schedule_from_patient_success', ({ notification }) => {
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(notification));
        });
    }, []);

    // socket not accept call
    useEffect(() => {
        socket.on('call_now_not_accept_to_user_success', ({ small_id, roomId, schedule_details_id, patient_id }) => {
            dispatch(
                messageSlice.actions.arrivalMessageNotAcceptCall({
                    small_id: small_id,
                    schedule_details_id: schedule_details_id,
                    patient_id: patient_id,
                }),
            );
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
