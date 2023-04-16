import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import './ListRegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import ChatBot from '~/components/ChatBot';
import Footer from '~/layouts/components/Footer';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { fetchApiAllPatientsSelector } from '~/redux/selector';
import TableListRegisterSchedule from './TableListRegisterSchedule/TableListRegisterSchedule';

function ListRegisterScheduleAppointment() {
    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />

            <div className="register-schedule-appointment-wrapper">
                <div className="register-schedule-appointment-banner">
                    <div className="register-schedule-appointment-title-name">DANH SÁCH LỊCH KHÁM CỦA BẠN</div>
                </div>

                {/* Content */}
                <div className="register-schedule-appointment-container">
                    <div className="progress-bar"></div>

                    <div className="register-schedule-appointment-content-container">
                        {/* Header */}
                        <div className="content-header">
                            <h2 className="content-header-title">Lịch khám của bạn</h2>
                        </div>

                        <TableListRegisterSchedule patients={patients} />
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
