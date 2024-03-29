import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import './ListRegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import ChatBot from '~/components/ChatBot';
import Footer from '~/layouts/components/Footer';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import {
    btnClickGetUsernameLeavedRoomSelector,
    fetchApiAllPatientsSelector,
    fetchApiHistoryExamOfPatientSelector,
    isLoadingHistoryExamOfPatientSelector,
} from '~/redux/selector';
import socket from '~/utils/socket';
import { endPoints } from '~/routers';
import CardListRegisterSchedule from './CardListRegisterSchedule';
import RatingAfterExaminated from '~/components/Conversation/RatingAfterExaminated';
import callSlice from '~/redux/features/call/callSlice';
import HistoryExamOfPatient from '~/components/HistoryExamOfPatient';
import { fetchApiHistoryExamOfPatient } from '~/redux/features/patient/patientSlice';
import MapsPatient from '~/components/MapsPatient/MapsPatient';

function ListRegisterScheduleAppointment() {
    const [openModalCall, setOpenModalCall] = useState(false);
    const [roomId, setRoomId] = useState();
    const [openModalRating, setOpenModalRating] = useState(false);
    const [tabList, setTabList] = useState(true);

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    const patients = useSelector(fetchApiAllPatientsSelector);
    const checkLeavedRoom = useSelector(btnClickGetUsernameLeavedRoomSelector);
    const historyExams = useSelector(fetchApiHistoryExamOfPatientSelector);
    const isLoading = useSelector(isLoadingHistoryExamOfPatientSelector);

    const dispatch = useDispatch();

    // console.log('historyExams ->', historyExams);
    // console.log('userId ->', userId);
    // console.log('roomId -->', roomId);
    // console.log('checkLeavedRoom patient ->', checkLeavedRoom);
    // console.log('patients.patient.person.username', patients.patient.person.username);

    useEffect(() => {
        socket.on('call_id_room_to_user_success', ({ room_id, info_doctor, info_patient, schedule_details_id }) => {
            setOpenModalCall(true);
            setRoomId({ room_id, info_doctor, info_patient, schedule_details_id });
        });
    }, []);

    useEffect(() => {
        socket.on('rating_for_doctor_success', ({ conversation_id, patient_id }) => {
            setOpenModalRating(true);
        });
    }, []);

    useEffect(() => {
        socket.emit('join_room', roomId); // obj
        socket.emit('add_user', patients?.patient?._id);

        // socket.on('get_users', (users) => {
        //     console.log('get_users', users);
        // });

        // joined_room
        socket.on('joined_room', (conversationId) => {
            // console.log('[conversation - id] ->', conversationId);
        });
    }, [patients?.patient?._id, roomId]);

    useEffect(() => {
        socket.on('user_leave_room_call_success', ({ username, roomId }) => {
            // console.log('user_leave_room_call_success ->', username, roomId);
            dispatch(callSlice.actions.arrivalUsername(username));
        });
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    const handleHideModal = () => {
        setOpenModalCall(false);
        socket.emit('join_room', roomId); // obj
    };

    const handleOpenScheduleRegister = () => {
        setTabList(true);
    };

    const handleOpenScheduleHistory = () => {
        dispatch(fetchApiHistoryExamOfPatient(patients.patient._id));
        setTabList(false);
    };

    // handle not accept call
    const handleNotAcceptCall = () => {
        // console.log('not accept.');
        socket.emit('call_now_not_accept_to_user', {
            small_id: small_id,
            roomId: roomId.room_id,
            schedule_details_id: roomId.schedule_details_id,
            patient_id: patients.patient._id,
        });
        handleHideModal();
    };

    return (
        <DefaultLayout patients={patients}>
            {/* Show modal confirm call */}
            {roomId && (
                <Modal
                    open={openModalCall}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <p style={{ textAlign: 'center' }}>
                        <i className="call-title-name-from">
                            BS. {roomId.info_doctor.person.username} mời bạn vào phòng để tư vấn khám cho bạn...
                        </i>
                    </p>

                    <div className="display-calls">
                        <Link
                            to={`${endPoints.meetingRoom}/${roomId.room_id}/${
                                roomId.schedule_details_id
                            }/${roomId.info_patient.replace(/\s/g, '')}`}
                            target="_blank"
                            onClick={handleHideModal}
                        >
                            <Button className="call-go-to-room-awaiting">Đi đến phòng chờ</Button>
                        </Link>

                        <Button onClick={handleNotAcceptCall} className="btn-not-accept-call">
                            Từ chối tham gia
                        </Button>
                    </div>
                </Modal>
            )}

            {(openModalRating || checkLeavedRoom !== null) && (
                <RatingAfterExaminated patients={patients} scheduleDetail={roomId} />
            )}

            <ChatBot />
            <MapsPatient patients={patients} />
            <ScrollToTop smooth className="scroll-to-top" />

            <div className="register-schedule-appointment-wrapper">
                <div className="list-register-schedule-appointment-banner">
                    <div className="register-schedule-appointment-title-name">DANH SÁCH LỊCH KHÁM CỦA BẠN</div>
                    <img
                        className="list-register-schedule-appointment-img-left"
                        src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/schedule-bg-1.svg"
                        alt="schedule-bg-1"
                    />
                </div>

                {/* Content */}
                <div className="register-schedule-appointment-container">
                    <div className="tab-list-register-history">
                        <Button
                            className={`${tabList ? 'tab-item-active' : 'tab-item'}`}
                            onClick={handleOpenScheduleRegister}
                        >
                            Lịch khám
                        </Button>
                        <Button
                            className={`${!tabList ? 'tab-item-active' : 'tab-item'}`}
                            onClick={handleOpenScheduleHistory}
                        >
                            Lịch sử khám
                        </Button>
                    </div>
                    <div className="progress-bar"></div>

                    <div className="register-schedule-appointment-content-container">
                        {/* Header */}
                        <div className="content-header">
                            {tabList ? (
                                <h2 className="content-header-title">Lịch khám của bạn</h2>
                            ) : (
                                <h2 className="content-header-title">Lịch sử khám của bạn</h2>
                            )}
                        </div>

                        {tabList ? (
                            <CardListRegisterSchedule patients={patients} />
                        ) : (
                            <HistoryExamOfPatient historyExams={historyExams} isLoading={isLoading} />
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="s">
                <Footer className="test-g" />
            </div>
        </DefaultLayout>
    );
}

export default ListRegisterScheduleAppointment;
