// lib
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, message, Modal, Select } from 'antd';

// me
import TitleName from '../TitleName';
import TableListSchedule from './TableListSchedule';
import {
    fetchApiAllCreateDaysDoctor,
    fetchApiAllShiftsDoctor,
    fetchApiCreateScheduleDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import { fetchApiAllCreateDaysDoctorSelector, fetchApiAllShiftsDoctorSelector } from '~/redux/selector';

function CreateScheduleDoctor({ infoUser, schedules }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const days = useSelector(fetchApiAllCreateDaysDoctorSelector);
    const shifts = useSelector(fetchApiAllShiftsDoctorSelector);

    // console.log(days);
    // console.log(shifts);

    useEffect(() => {
        dispatch(fetchApiAllCreateDaysDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllShiftsDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            dispatch(fetchApiCreateScheduleDoctor(values));
            setShowModal(false);
            message.success('Bạn đã đăng ký ca lịch thành công.');
        } else {
            message.error('Đăng ký ca lịch không thành công!');
            return;
        }
    };

    return (
        <div className="wrapper-create-schedule-doctor">
            <Button onClick={handleOpenModal} type="primary">
                Đăng ký lịch khám
            </Button>

            {/* Modal */}
            <Modal
                open={showModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={handleCancel}
            >
                <TitleName>Đăng ký ca lịch cho Bác sĩ</TitleName>

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
                                label: day.day,
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
                                label: shift.name,
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
