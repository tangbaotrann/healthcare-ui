import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Calendar, Form, Input, Modal, Skeleton, message } from 'antd';

import TitleName from '~/components/TitleName';
import scheduleDoctor from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import {
    fetchApiRegisterScheduleAppointmentOfPatientSelector,
    filterGetScheduleAppointmentAndHide,
    isLoadingScheduleDoctorSelector,
} from '~/redux/selector';
import { fetchApiRegisterScheduleAppointmentOfPatient } from '~/redux/features/patient/patientSlice';
import ScheduleRegisterItem from '../ScheduleRegisterItem/ScheduleRegisterItem';

function ScheduleRegister() {
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [scheduleAppointment, setScheduleAppointment] = useState({});
    const dispatch = useDispatch();

    const schedules = useSelector(filterGetScheduleAppointmentAndHide);
    const isLoading = useSelector(isLoadingScheduleDoctorSelector);
    const checkRegisterSchedule = useSelector(fetchApiRegisterScheduleAppointmentOfPatientSelector);
    // const dateOfWeek = useSelector(btnOptionSelectDayOfWeekSelector);

    // console.log('checkRegisterSchedule', checkRegisterSchedule);
    // console.log('dateOfWeek ->', dateOfWeek.getDay()); // thứ
    // console.log('s--->', moment(dateOfWeek).format('DD/MM/YYYY'));

    // handle change option
    const handleOptionSelect = (date) => {
        dispatch(scheduleDoctor.actions.btnOptionSelectDayOfWeek(date.$d));
    };

    // handle disabled date
    const handleDisabledDate = (date) => {
        if (new Date(date).getDate() < new Date().getDate() || new Date(date).getMonth() < new Date().getMonth()) {
            return true;
        } else {
            return false;
        }
    };

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
    const handleSubmitForm = async (values) => {
        console.log('value', values);

        if (values || checkRegisterSchedule) {
            await dispatch(fetchApiRegisterScheduleAppointmentOfPatient(values));
            if (checkRegisterSchedule.message) {
                message.error('Ca khám này của bác sĩ đã có người đăng ký vui lòng chọn ca khác');
                return;
            }
            //else if (checkRegisterSchedule.schedule_detail) {
            // }
            message.success('Bạn đã đăng ký thành công lịch khám này.');
            setOpenModalConfirm(false);
        } else {
            message.error('Đăng ký lịch khám không thành công!');
            return;
        }
    };

    return (
        <>
            <Calendar onSelect={handleOptionSelect} disabledDate={handleDisabledDate} />

            {/* Cart MAP */}
            {isLoading ? (
                <Skeleton active />
            ) : (
                <>
                    {schedules.length === 0 ? (
                        <p className="notification-schedule-register">
                            <i>-- Ngày này hiện chưa có lịch khám. Vui lòng chọn ngày khác. --</i>
                        </p>
                    ) : (
                        <>
                            {schedules.map((schedule) => {
                                return (
                                    <ScheduleRegisterItem
                                        schedule={schedule}
                                        handleRegisterScheduleAppointment={handleRegisterScheduleAppointment}
                                        key={schedule._id}
                                    />
                                );
                            })}
                        </>
                    )}
                </>
            )}

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

                    <Form.Item name="schedule" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="day_exam" style={{ display: 'none' }}>
                        <Input disabled />
                    </Form.Item>

                    <div className="display-reg-schedule-appointment">
                        <Button className="content-cart-item-footer-btn" htmlType="submit" block>
                            Xác nhận
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default ScheduleRegister;
