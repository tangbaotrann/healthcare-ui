import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Calendar, Form, Input, Modal, Skeleton, message } from 'antd';

import TitleName from '~/components/TitleName';
import scheduleDoctor from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import { filterGetScheduleAppointmentAndHide, isLoadingScheduleDoctorSelector } from '~/redux/selector';
import ScheduleRegisterItem from '../ScheduleRegisterItem/ScheduleRegisterItem';
import axios from 'axios';
import moment, { now } from 'moment';
import socket from '~/utils/socket';

function ScheduleRegister() {
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [dateTime, setDateTime] = useState();
    const [scheduleAppointment, setScheduleAppointment] = useState({});

    const dispatch = useDispatch();

    const schedules = useSelector(filterGetScheduleAppointmentAndHide);
    const isLoading = useSelector(isLoadingScheduleDoctorSelector);
    // const checkRegisterSchedule = useSelector(fetchApiRegisterScheduleAppointmentOfPatientSelector);
    // const dateOfWeek = useSelector(btnOptionSelectDayOfWeekSelector);

    // console.log('checkRegisterSchedule', checkRegisterSchedule);
    console.log('schedules --->', schedules);
    // console.log('scheduleAppointment --->', scheduleAppointment);
    // console.log('dateTime --->', dateTime);

    // handle change option
    const handleOptionSelect = (date) => {
        dispatch(scheduleDoctor.actions.btnOptionSelectDayOfWeek(date.$d));
    };

    // handle disabled date
    const handleDisabledDate = (date) => {
        // if (new Date(date).getDate() < new Date().getDate() && new Date(date).getMonth() < new Date().getMonth() + 1) {
        //     return true;
        // } else {
        //     return false;
        // }

        return date && date < moment().add(0, 'month');
    };

    // handle button
    const handleRegisterScheduleAppointment = (schedule) => {
        console.log('->', schedule);

        // giờ
        const timeStart = moment(schedule.time.time_start).format('HH:mm');

        // ngày
        const scheduleDateStart = moment(schedule.date_compare._i.split('/').reverse().join('/') + ' ' + timeStart);

        setDateTime(new Date(scheduleDateStart));

        setOpenModalConfirm(true);
        setScheduleAppointment(schedule);
    };

    const handleHideModalConfirm = () => {
        setOpenModalConfirm(false);
    };

    // handle submit
    const handleSubmitForm = async (values) => {
        console.log('value', values);

        const getToken = JSON.parse(localStorage.getItem('token_user_login'));
        const { content_exam, schedule, day_exam } = values;

        await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}schedule-details`,
                {
                    content_exam: content_exam,
                    schedule: schedule,
                    day_exam: day_exam, // day_exam
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            )
            .then((res) => {
                console.log('res ->', res.data.data);
                message.success('Bạn đã đăng ký thành công lịch khám này. Vui lòng chờ xác nhận từ bác sĩ nhé!');
                setOpenModalConfirm(false);
                socket.emit('notification_register_schedule_from_patient', { data: res.data.data });
            })
            .catch((err) => {
                console.log({ err });
                message.error(`${err.response.data.message}`);
            });
    };

    return (
        <>
            <Calendar onSelect={handleOptionSelect} disabledDate={handleDisabledDate} fullscreen={false} />

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
                            value: dateTime, // schedule.date_compare._i
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
                        <Input.TextArea placeholder="Nội dung bệnh khám..." />
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
