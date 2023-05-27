// lib
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import moment from 'moment';

// me
import './CreateScheduleDoctor.css';
import TitleName from '../TitleName';
import TableListSchedule from './TableListSchedule';
import { fetchApiCreateScheduleDoctor } from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import { fetchApiAllCreateDaysDoctorSelector, fetchApiAllShiftsDoctorSelector } from '~/redux/selector';

function CreateScheduleDoctor({ infoUser, schedules }) {
    const [showModal, setShowModal] = useState(false);
    // const [listShift, setListShift] = useState([]);

    const dispatch = useDispatch();

    const days = useSelector(fetchApiAllCreateDaysDoctorSelector);
    const shifts = useSelector(fetchApiAllShiftsDoctorSelector);
    // const checkExist = useSelector(fetchApiCreateScheduleDoctorMessageRejectSelector);

    // console.log(days);
    // console.log('-->', shifts);
    // console.log('-->', schedules);
    // console.log('checkeExist -->', checkExist);

    // show modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // hide modal
    const handleCancel = () => {
        setShowModal(false);
    };

    // handle submit form
    const handleCreateScheduleDoctorOnFish = (values) => {
        if (values) {
            // console.log('-->', values);
            if (values.fee < 100000) {
                message.error('Số tiền phải lớn hơn 100.000đ!');
                return;
            }

            dispatch(fetchApiCreateScheduleDoctor(values));
            handleCancel();
        }
    };

    // useEffect(() => {
    //     const _listTime = shifts?.map((_shift) => {
    //         return `${_shift?.name} (${moment(new Date(_shift?.time_start)).format('HH:mm')} -> ${moment(
    //             new Date(_shift?.time_end),
    //         ).format('HH:mm')})`;
    //     });

    //     console.log('_listTime', _listTime);
    //     const _timeUnique = new Set([..._listTime]);
    //     console.log('_timeUnique', _timeUnique);

    //     const _shifts = Array.from(_timeUnique);
    //     console.log('_shifts', _shifts);
    //     setListShift(_shifts);
    // }, [shifts]);

    return (
        <div className="wrapper-create-schedule-doctor">
            <Button onClick={handleOpenModal} className="btn-register-schedule">
                <span>Đăng ký ca làm</span>
            </Button>

            {/* Modal */}
            <Modal
                open={showModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={handleCancel}
            >
                <TitleName>Đăng ký ca làm cho Bác sĩ</TitleName>

                <Form
                    onFinish={handleCreateScheduleDoctorOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                    fields={[
                        {
                            name: ['doctor'],
                            value: infoUser?.doctor?._id,
                        },
                    ]}
                >
                    {/* time_per_conversation */}
                    <Form.Item
                        name="time_per_conversation"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải chọn thời gian.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select
                            options={[
                                { value: '30', label: '30 phút' },
                                { value: '45', label: '45 phút' },
                                { value: '60', label: '60 phút' },
                            ]}
                            placeholder="Chọn thời gian..."
                        />
                    </Form.Item>

                    {/* fee */}
                    <Form.Item
                        name="fee"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập số tiền.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Nhập tiền..." />
                    </Form.Item>

                    {/* day */}
                    <Form.Item
                        name="day"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải chọn thứ.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select
                            options={days.map((day) => ({
                                label: moment(day.day).format('dddd'),
                                value: day._id,
                            }))}
                            placeholder="Chọn thứ..."
                        />
                    </Form.Item>

                    {/* time */}
                    <Form.Item
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải chọn ca làm việc.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select
                            options={shifts.map((shift) => ({
                                label: `${shift.name} (${moment(new Date(shift.time_start)).format(
                                    'HH:mm',
                                )} -> ${moment(new Date(shift.time_end)).format('HH:mm')})`,
                                value: shift._id,
                            }))}
                            placeholder="Chọn ca làm việc..."
                        />
                    </Form.Item>

                    {/* doctor */}
                    <Form.Item name="doctor" hasFeedback style={{ display: 'none' }}>
                        <Input disabled />
                    </Form.Item>

                    {/* Button */}
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form>
            </Modal>

            {/* List schedule of doctor */}
            <TableListSchedule infoUser={infoUser} schedules={schedules} />
        </div>
    );
}

export default CreateScheduleDoctor;
