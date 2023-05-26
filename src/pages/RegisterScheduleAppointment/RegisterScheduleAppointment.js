import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';
import { AutoComplete, Input, Rate } from 'antd';

import './RegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { fetchApiAllPatientsSelector, filterUserDoctorsWithAccepted } from '~/redux/selector';
import { useEffect, useState } from 'react';
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

function RegisterScheduleAppointment() {
    const [options, setOptions] = useState([]);

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const optionDoctors = useSelector(filterUserDoctorsWithAccepted);

    const dispatch = useDispatch();

    // console.log('pat', patients);
    // console.log('scheduleAppointment', scheduleAppointment);
    // console.log('opt ->', optionDoctors);
    // console.log('options ->', options);

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

    // handle autocomplete search name doctor
    const handleSearch = (value) => {
        setOptions(
            value
                ? optionDoctors?.map((_doctor) => {
                      return {
                          value: `${_doctor?.person?.username} (${
                              _doctor.work_type === 'glycemic' ? 'Đường huyết' : 'Huyết áp'
                          })`,
                          label: (
                              <div className="display-autocomplete">
                                  <img
                                      className="custom-avatar-doctor"
                                      src={_doctor?.person?.avatar}
                                      alt="avatar-doctor"
                                  />

                                  <div className="autocomplete-info">
                                      <span>
                                          {_doctor?.person?.username} (
                                          {_doctor.work_type === 'glycemic' ? 'Đường huyết' : 'Huyết áp'})
                                      </span>
                                      <Rate value={_doctor?.rating} disabled className="custom-rating" />
                                  </div>
                                  <span className="custom-hide-info-doctor">{_doctor?._id}</span>
                              </div>
                          ),
                      };
                  })
                : [],
        );
    };

    // handle select value search
    const handleSelect = (value, { label }) => {
        dispatch(userSlice.actions.btnOptionUsernameDoctorGetSchedule(label.props.children[2].props.children));
    };

    useEffect(() => {
        options.length <= 0 && dispatch(userSlice.actions.btnOptionUsernameDoctorGetSchedule('all'));
    }, [options.length]);

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
                                <p>Tìm bác sĩ:</p>
                                <AutoComplete
                                    dropdownMatchSelectWidth={250}
                                    style={{ width: 275 }}
                                    options={options}
                                    filterOption={true}
                                    onSearch={handleSearch}
                                    onSelect={handleSelect}
                                >
                                    <Input.Search size="middle" placeholder="Tìm kiếm bác sĩ..." enterButton />
                                </AutoComplete>
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
