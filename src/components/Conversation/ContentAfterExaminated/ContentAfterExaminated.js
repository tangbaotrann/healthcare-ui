// lib
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Calendar, Checkbox, Divider, Form, Input, Modal, Select, Skeleton, message } from 'antd';

// me
import './ContentAfterExaminated.css';
import TitleName from '~/components/TitleName';
import { fetchApiResponseContentAfterExamiation } from '~/redux/features/patient/patientSlice';
import callSlice from '~/redux/features/call/callSlice';
import moment from 'moment';
import scheduleDoctor from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import { filterUserDoctorsWithAccepted, isLoadingScheduleDoctorSelector } from '~/redux/selector';
import ButtonLoadMore from '~/components/ButtonLoadMore/ButtonLoadMore';
import ScheduleRegisterItem from '~/pages/RegisterScheduleAppointment/ScheduleRegisterItem/ScheduleRegisterItem';
import userSlice from '~/redux/features/user/userSlice';
import axios from 'axios';
import socket from '~/utils/socket';

function ContentAfterExaminated({ recordConversation, schedules }) {
    const [openModal, setOpenModal] = useState(false);
    const [openReExam, setOpenReExam] = useState(false);
    const [openCalendar, setOpenCalender] = useState(false);
    const [visible, setVisible] = useState(5);

    const [dateTime, setDateTime] = useState();
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [scheduleAppointment, setScheduleAppointment] = useState({});

    const dispatch = useDispatch();

    const optionDoctors = useSelector(filterUserDoctorsWithAccepted);
    const isLoading = useSelector(isLoadingScheduleDoctorSelector);

    // console.log('schedules', schedules);
    // console.log('recordConversation ->', recordConversation); // get id schedule-detail
    // console.log('conversation ->', conversation); // get id schedule-detail

    useEffect(() => {
        setOpenModal(true);
    }, []);

    // handle submit
    const handleContentAfterExamOnFish = (values) => {
        if (values) {
            dispatch(
                fetchApiResponseContentAfterExamiation({
                    values: values,
                    scheduleDetailId: recordConversation._id, // get id schedule-detail
                }),
            );
            dispatch(callSlice.actions.arrivalUsername(null)); // clear modal
            setOpenModal(false);
            message.success('Đã gửi phản hồi cho bệnh nhân.');
        } else {
            message.error('Gửi phản hồi không thành công!');
            return;
        }
    };

    const handleChangeReExam = (e) => {
        if (e.target.checked) {
            setOpenCalender(true);
        } else {
            setOpenCalender(false);
        }
    };

    // handle disabled date
    const handleDisabledDate = (date) => {
        if (new Date(date).getDate() === new Date().getDate()) {
            return false;
        }

        return date && date < moment().add(0, 'month');
    };

    // handle change option
    const handleOptionSelect = (date) => {
        dispatch(scheduleDoctor.actions.btnOptionSelectDayOfWeek(date.$d));
        setOpenReExam(true);
    };

    // handle button
    const handleRegisterScheduleAppointment = (schedule) => {
        // giờ
        const timeStart = moment(schedule.time.time_start).format('HH:mm');

        // ngày
        const scheduleDateStart = moment(schedule.date_compare._i.split('/').reverse().join('/') + ' ' + timeStart);

        setDateTime(new Date(scheduleDateStart));

        setOpenModalConfirm(true);
        setScheduleAppointment(schedule);
    };

    const handleSubmitForm = async (values) => {
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));
        const { content_exam, schedule, day_exam, patient_id, re_examination } = values;

        await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}schedule-details`,
                {
                    content_exam: content_exam,
                    schedule: schedule,
                    day_exam: day_exam,
                    patient_id: patient_id,
                    re_examination: re_examination,
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
                console.log('res re-exam ->', res.data.data);
                message.success('Đã đăng ký tái khám cho bệnh nhân thành công.');
                setOpenModalConfirm(false);
                setOpenReExam(false);
                setOpenCalender(false);
                socket.emit('notification_register_schedule_from_patient', { data: res.data.data });
            })
            .catch((err) => {
                console.log({ err });
                message.error(`${err.response.data.message}`);
            });
    };

    const handleHideReExamSchedule = () => {
        setOpenReExam(false);
    };

    const handleFilterNameDoctor = (value) => {
        dispatch(userSlice.actions.btnOptionUsernameDoctorGetSchedule(value));
    };

    const handleHideConfirm = () => {
        setOpenModalConfirm(false);
    };

    const handleShowMoreCards = () => {
        setVisible((prev) => prev + 5);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleLessCards = () => {
        setVisible(5);
        window.scrollTo({
            top: 600,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Modal
                open={openModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                centered={true}
            >
                <TitleName>Phản Hồi Sau Khi Khám Cho Bệnh Nhân</TitleName>

                {/* Tái khám */}
                <div className="re-exam">
                    <Checkbox className="label-re-exam" onChange={handleChangeReExam}>
                        Tái khám
                    </Checkbox>

                    {openCalendar && (
                        <Calendar fullscreen={false} onSelect={handleOptionSelect} disabledDate={handleDisabledDate} />
                    )}
                </div>

                {/* Phản hồi sau khi khám */}
                <Form
                    onFinish={handleContentAfterExamOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                >
                    {/* result_exam */}
                    <Form.Item
                        name="result_exam"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập kết quả về sức khỏe cho bệnh nhân.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea placeholder="Nhập kết quả về sức khỏe..." />
                    </Form.Item>

                    {/* anamnesis */}
                    <Form.Item
                        name="anamnesis"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải chọn trạng thái bệnh.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select
                            options={[
                                { value: '0', label: 'Bình thường' },
                                { value: '1', label: 'Típ 1' },
                                { value: '2', label: 'Típ 2' },
                            ]}
                            placeholder="Chọn loại bệnh"
                        />
                    </Form.Item>

                    {/* Thuốc */}
                    <Form.Item
                        name="prescription"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập đơn thuốc cho bệnh nhân.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea name="prescription" placeholder="Nhập đơn thuốc..." />
                    </Form.Item>

                    {/* Button */}
                    <Button htmlType="submit" className="btn-content-after-exam-response" block>
                        Gửi
                    </Button>
                </Form>
            </Modal>

            {/* Show modal đặt lại lịch khám (tái khám) */}
            <div>
                <Modal
                    open={openReExam}
                    onCancel={handleHideReExamSchedule}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    width={1000}
                    centered={true}
                >
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

                    {/* Render register schedule */}
                    {schedules.length === 0 ? (
                        <p className="notification-schedule-register">
                            <i>-- Ngày này hiện chưa có lịch khám của bác sĩ. Vui lòng chọn ngày khác. --</i>
                        </p>
                    ) : (
                        <>
                            {isLoading ? (
                                <Skeleton active />
                            ) : (
                                schedules.slice(0, visible).map((schedule) => {
                                    return (
                                        <ScheduleRegisterItem
                                            schedule={schedule}
                                            handleRegisterScheduleAppointment={handleRegisterScheduleAppointment}
                                            key={schedule._id}
                                            textButton={openReExam}
                                        />
                                    );
                                })
                            )}
                        </>
                    )}

                    {schedules?.length >= 5 && visible < schedules?.length ? (
                        <ButtonLoadMore onClick={handleShowMoreCards} className="re-exam-btn-show-more">
                            Xem thêm
                        </ButtonLoadMore>
                    ) : visible > 5 && visible >= schedules?.length ? (
                        <ButtonLoadMore onClick={handleLessCards} className="re-exam-btn-show-more">
                            Thu gọn
                        </ButtonLoadMore>
                    ) : null}
                </Modal>

                <Divider />
            </div>

            {/* Show form confirm */}
            <Modal
                open={openModalConfirm}
                onCancel={handleHideConfirm}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                centered={true}
            >
                <TitleName>Đặt Lịch Tái Khám</TitleName>

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
                        {
                            name: ['patient_id'],
                            value: recordConversation?.patient?._id,
                        },
                        {
                            name: ['re_examination'],
                            value: true,
                        },
                    ]}
                >
                    {/* content_exam */}
                    <Form.Item
                        name="content_exam"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập nội dung tái khám.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea placeholder="Nhập nội dung tái khám..." />
                    </Form.Item>

                    {/* schedule */}
                    <Form.Item name="schedule" style={{ display: 'none' }}>
                        <Input name="schedule" />
                    </Form.Item>

                    {/* day_exam */}
                    <Form.Item name="day_exam" style={{ display: 'none' }}>
                        <Input name="day_exam" />
                    </Form.Item>

                    {/* patient_id */}
                    <Form.Item name="patient_id" style={{ display: 'none' }}>
                        <Input name="patient_id" />
                    </Form.Item>

                    {/* re_examination */}
                    <Form.Item name="re_examination" style={{ display: 'none' }}>
                        <Input name="re_examination" />
                    </Form.Item>

                    <Button htmlType="submit" className="re-exam-btn-submit" block>
                        Xác nhận
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default memo(ContentAfterExaminated);
