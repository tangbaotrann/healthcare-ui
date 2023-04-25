import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { Button, Modal } from 'antd';

import './ListRegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import ChatBot from '~/components/ChatBot';
import Footer from '~/layouts/components/Footer';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { fetchApiAllPatientsSelector } from '~/redux/selector';
import socket from '~/utils/socket';
import { endPoints } from '~/routers';
import CardListRegisterSchedule from './CardListRegisterSchedule/CardListRegisterSchedule';

function ListRegisterScheduleAppointment() {
    const [openModalCall, setOpenModalCall] = useState(false);
    const [roomId, setRoomId] = useState();

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId

    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('call_id_room_to_user_success', ({ room_id, info_doctor, info_patient }) => {
            setOpenModalCall(true);
            setRoomId({ room_id, info_doctor, info_patient });
        });
    }, []);

    // console.log('roomId', roomId);
    // console.log('patients.patient.person.username', patients.patient.person.username);

    useEffect(() => {
        socket.emit('add_user', patients.patient._id);

        socket.on('get_users', (users) => {
            console.log('get_users', users);
        });
    }, [patients.patient._id]);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    const handleHideModal = () => {
        setOpenModalCall(false);
    };

    return (
        <DefaultLayout patients={patients}>
            {/* Show modal confirm call */}
            {roomId && (
                <Modal
                    open={openModalCall}
                    // onCancel={hideModalCall}
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
                            to={`${endPoints.meetingRoom}/${roomId.room_id}/${roomId.info_patient.replace(/\s/g, '')}`}
                            target="_blank"
                            onClick={handleHideModal}
                        >
                            <Button className="call-go-to-room-awaiting">Đi đến phòng chờ</Button>
                        </Link>
                    </div>
                </Modal>
            )}

            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />

            <div className="register-schedule-appointment-wrapper">
                <div className="list-register-schedule-appointment-banner">
                    {/* <img
                        className="list-register-schedule-appointment-img-left"
                        src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/vaccination/qa-note-icon.svg"
                        alt=""
                    /> */}
                    <div className="register-schedule-appointment-title-name">DANH SÁCH LỊCH KHÁM CỦA BẠN</div>
                    <img
                        className="list-register-schedule-appointment-img-left"
                        src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/schedule-bg-1.svg"
                        alt="schedule-bg-1"
                    />
                </div>

                {/* Content */}
                <div className="register-schedule-appointment-container">
                    <div className="progress-bar"></div>

                    <div className="register-schedule-appointment-content-container">
                        {/* Header */}
                        <div className="content-header">
                            <h2 className="content-header-title">Lịch khám của bạn</h2>
                        </div>

                        <CardListRegisterSchedule patients={patients} />
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
