import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import './RegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { fetchApiAllPatientsSelector } from '~/redux/selector';
import { useEffect } from 'react';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import {
    fetchApiAllCreateDaysDoctor,
    fetchApiAllCreateScheduleDoctor,
    fetchApiAllScheduleDetails,
    fetchApiAllShiftsDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import Footer from '~/layouts/components/Footer';
import ChatBot from '~/components/ChatBot';
import ScheduleRegister from './ScheduleRegister/ScheduleRegister';

function RegisterScheduleAppointment() {
    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId

    const dispatch = useDispatch();

    // console.log('pat', patients);
    // console.log('scheduleAppointment', scheduleAppointment);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllScheduleDetails());
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllCreateScheduleDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllCreateDaysDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllShiftsDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />
            <div className="register-schedule-appointment-wrapper">
                <div className="register-schedule-appointment-banner">
                    <div className="register-schedule-appointment-title-name">ĐẶT LỊCH KHÁM</div>
                    <img
                        className="banner-desktop-left"
                        src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/personalized-bg.svg"
                        alt="banner-desktop"
                    />
                </div>

                {/* Content */}
                <div className="register-schedule-appointment-container">
                    <div className="progress-bar"></div>

                    <div className="register-schedule-appointment-content-container">
                        {/* Header */}
                        <div className="content-header">
                            <h2 className="content-header-title">Chọn lịch khám</h2>
                        </div>

                        <ScheduleRegister />
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

export default RegisterScheduleAppointment;
