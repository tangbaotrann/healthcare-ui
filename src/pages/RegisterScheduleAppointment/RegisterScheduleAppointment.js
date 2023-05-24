import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import './RegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { fetchApiAllPatientsSelector, filterUserDoctorsWithAccepted } from '~/redux/selector';
import { useEffect } from 'react';
import userSlice, { fetchApiAllPatients, fetchApiUserDoctors } from '~/redux/features/user/userSlice';
import {
    fetchApiAllCreateDaysDoctor,
    fetchApiAllCreateScheduleDoctor,
    fetchApiAllScheduleDetails,
    fetchApiAllShiftsDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import Footer from '~/layouts/components/Footer';
import ChatBot from '~/components/ChatBot';
import ScheduleRegister from './ScheduleRegister/ScheduleRegister';
import socket from '~/utils/socket';
import MapsPatient from '~/components/MapsPatient/MapsPatient';
import { Select } from 'antd';

function RegisterScheduleAppointment() {
    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const optionDoctors = useSelector(filterUserDoctorsWithAccepted);

    const dispatch = useDispatch();

    // console.log('pat', patients);
    // console.log('scheduleAppointment', scheduleAppointment);
    // console.log('opt ->', optionDoctors);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    useEffect(() => {
        dispatch(fetchApiUserDoctors());
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

    useEffect(() => {
        socket.emit('add_user', patients?.patient?._id);
    }, [patients?.patient?._id]);

    useEffect(() => {
        dispatch(userSlice.actions.btnOptionUsernameDoctorGetSchedule('all'));
    }, []);

    const handleFilterNameDoctor = (value) => {
        dispatch(userSlice.actions.btnOptionUsernameDoctorGetSchedule(value));
    };

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <MapsPatient patients={patients} />
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

                            {/* Select option doctor */}
                            <div className="custom-select-opt-doctor">
                                <p>Chọn bác sĩ:</p>
                                <Select style={{ width: '275px' }} defaultValue="all" onSelect={handleFilterNameDoctor}>
                                    <Select.Option value="all">Tất cả</Select.Option>
                                    {optionDoctors?.length > 0
                                        ? optionDoctors.map((_doctor) => {
                                              return (
                                                  <Select.Option key={_doctor._id} value={_doctor._id}>
                                                      {_doctor.person.username} (
                                                      {_doctor.work_type === 'glycemic' ? 'Đường huyết' : 'Huyết áp'})
                                                  </Select.Option>
                                              );
                                          })
                                        : ''}
                                </Select>
                            </div>
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
