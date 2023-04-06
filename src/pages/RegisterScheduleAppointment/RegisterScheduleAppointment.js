import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import './RegisterScheduleAppointment.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import {
    fetchApiAllCreateScheduleDoctorSelector,
    fetchApiAllPatientsSelector,
    fetchApiRegisterScheduleAppointmentOfPatientSelector,
    filterGetScheduleAppointmentAndHide,
} from '~/redux/selector';
import { icons } from '~/asset/images';
import { Button, Form, Input, Modal, message } from 'antd';
import { useEffect } from 'react';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import {
    fetchApiAllCreateDaysDoctor,
    fetchApiAllCreateScheduleDoctor,
    fetchApiAllScheduleDetails,
    fetchApiAllShiftsDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import moment from 'moment';
import TitleName from '~/components/TitleName';
import { fetchApiRegisterScheduleAppointmentOfPatient } from '~/redux/features/patient/patientSlice';
import Footer from '~/layouts/components/Footer';
import ChatBot from '~/components/ChatBot';

function RegisterScheduleAppointment() {
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [scheduleAppointment, setScheduleAppointment] = useState({});

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const schedules = useSelector(fetchApiAllCreateScheduleDoctorSelector); // filterGetScheduleAppointmentAndHide
    const checkRegisterSchedule = useSelector(fetchApiRegisterScheduleAppointmentOfPatientSelector);

    const dispatch = useDispatch();

    console.log('schedules ->', schedules);
    // console.log('pat', patients);
    // console.log('scheduleAppointment', scheduleAppointment);
    console.log('checkRegisterSchedule', checkRegisterSchedule);

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

    // handle button
    const handleRegisterScheduleAppointment = (schedule) => {
        console.log('->', schedule);
        setOpenModalConfirm(true);
        setScheduleAppointment(schedule);
    };

    const handleHideModalConfirm = () => {
        setOpenModalConfirm(false);
    };

    // handle submit
    const handleSubmitForm = (values) => {
        console.log('value', values);

        if (values) {
            dispatch(fetchApiRegisterScheduleAppointmentOfPatient(values));
            if (checkRegisterSchedule.message) {
                message.error('Ca khám này của bác sĩ đã có người đăng ký vui lòng chọn ca khác');
                return;
            } else if (checkRegisterSchedule.schedule_detail) {
                message.success('Bạn đã đăng ký thành công lịch khám này.');
            }
            // setOpenModalConfirm(false);
        } else {
            message.error('Đăng ký lịch khám không thành công!');
            return;
        }
    };

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />
            <div className="register-schedule-appointment-wrapper">
                <div className="register-schedule-appointment-banner">
                    <div className="register-schedule-appointment-title-name">ĐẶT LỊCH KHÁM</div>
                </div>

                {/* Content */}
                <div className="register-schedule-appointment-container">
                    <div className="progress-bar"></div>

                    <div className="register-schedule-appointment-content-container">
                        {/* Header */}
                        <div className="content-header">
                            <h2 className="content-header-title">Chọn lịch khám</h2>
                        </div>

                        {/* Cart MAP */}
                        {schedules.map((schedule) => {
                            return (
                                <div className="content-cart-item" key={schedule?._id}>
                                    <div className="content-cart-item-header">
                                        <img
                                            className="content-cart-item-avatar"
                                            src={
                                                schedule?.doctor?.person?.avatar ||
                                                schedule?._schedules[0]?.doctor?.person?.avatar
                                            }
                                            alt="avatar"
                                        />
                                        <h2 className="content-cart-item-username">
                                            BS:{' '}
                                            {schedule?.doctor?.person?.avatar ||
                                                schedule?._schedules[0]?.doctor?.person?.username}
                                        </h2>
                                    </div>

                                    <div className="display-content-cart-item-body">
                                        <div className="content-cart-item-body">
                                            <div className="content-cart-item-body-time">
                                                <img
                                                    className="content-cart-item-time-icon"
                                                    src={icons.iconTime}
                                                    alt="iconTime"
                                                />
                                                <p className="content-cart-item-time">
                                                    {/* schedule?._schedules[0]?.day?.day */}
                                                    Thứ: {moment(schedule?.day?.day).format('dddd')} - Ngày:{' '}
                                                    {moment(schedule?.day?.day).format('DD/MM/YYYY')} - Thời gian:{' '}
                                                    {moment(new Date(schedule?.time?.time_start)).format('HH:mm a')}{' '}
                                                    {' - '}
                                                    {moment(new Date(schedule?.time?.time_end)).format('HH:mm a')}
                                                </p>
                                            </div>
                                            <div className="content-cart-item-body-price">
                                                <img src={icons.iconPrice} alt="iconPrice" />
                                                <p className="content-cart-item-price">
                                                    {/* schedule?._schedules[0]?.fee */}
                                                    Chi phí: {schedule?.fee} VNĐ
                                                </p>
                                            </div>
                                        </div>

                                        <div className="content-cart-item-footer">
                                            <Button
                                                className="content-cart-item-footer-btn"
                                                onClick={
                                                    () => handleRegisterScheduleAppointment(schedule) // schedule?._schedules[0]
                                                }
                                            >
                                                Đặt khám
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Show modal */}
                        <Modal
                            open={openModalConfirm}
                            onCancel={handleHideModalConfirm}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                        >
                            <TitleName>Đặt Lịch Khám</TitleName>

                            <Form
                                onFinish={handleSubmitForm}
                                onFinishFailed={(error) => {
                                    console.log({ error });
                                }}
                                fields={[
                                    {
                                        name: ['day_exam'],
                                        value: scheduleAppointment?.day?.day,
                                    },
                                    {
                                        name: ['schedule'],
                                        value: scheduleAppointment?._id,
                                    },
                                ]}
                            >
                                <Form.Item
                                    name="content_exam"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Bạn cần phải nhập nội dung bệnh khám.',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input placeholder="Nội dung bệnh khám..." />
                                </Form.Item>

                                {/* schedule */}
                                <Form.Item name="schedule" style={{ display: 'none' }}>
                                    <Input />
                                </Form.Item>

                                {/* day_exam */}
                                <Form.Item name="day_exam" style={{ display: 'none' }}>
                                    <Input disabled />
                                </Form.Item>

                                {/* Button */}
                                <div className="display-reg-schedule-appointment">
                                    <Button className="content-cart-item-footer-btn" htmlType="submit" block>
                                        Xác nhận
                                    </Button>
                                </div>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="s">
                <Footer className="test-g" />
            </div>
        </DefaultLayout>
    );
}

export default RegisterScheduleAppointment;
