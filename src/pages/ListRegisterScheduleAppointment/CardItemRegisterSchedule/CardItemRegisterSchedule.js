import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, message } from 'antd';

import { icons } from '~/asset/images';
import TitleName from '~/components/TitleName';
import { fetchApiDeleteScheduleMedicalOfPatient } from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';

function CardItemRegisterSchedule({ schedule }) {
    const [openModal, setOpenModal] = useState(false);
    const [record, setRecord] = useState({});

    const dispatch = useDispatch();

    // console.log('schedule ->', schedule);
    // console.log('record ->', record);

    const handleOpenModal = () => {
        setOpenModal(true);
        setRecord(schedule);
    };

    const handleHideModal = () => {
        setOpenModal(false);
    };

    // Handle del register schedule
    // handle confirm del request schedule
    const handleDeleteScheduleMedicalOnFish = (values) => {
        if (values) {
            dispatch(fetchApiDeleteScheduleMedicalOfPatient(values));
            setOpenModal(false);
            message.success('Bạn đã hủy lịch khám thành công.');
        }
    };

    return (
        <div className="content-cart-item">
            <div className="content-cart-item-header">
                <img className="content-cart-item-avatar" src={schedule?.doctor?.person?.avatar} alt="avatar" />
                <h2 className="content-cart-item-username">BS: {schedule?.doctor?.person?.username}</h2>
            </div>

            <div className="display-content-cart-item-body">
                <div className="content-cart-item-body">
                    <div className="content-cart-item-body-time">
                        <img className="content-cart-item-time-icon" src={icons.iconTime} alt="iconTime" />
                        <p className="content-cart-item-time">
                            Thứ: {moment(schedule.day_exam).format('DD/MM/YYYY')} - lúc:{' '}
                            {moment(schedule.day_exam).format('HH:mm a')} (Thời gian khám:{' '}
                            {schedule.schedule.time_per_conversation} phút)
                        </p>
                    </div>
                    <div className="content-cart-item-body-price">
                        <img src={icons.iconPrice} alt="iconPrice" />
                        <p className="content-cart-item-price">Chi phí: {schedule.schedule.fee} VNĐ</p>
                    </div>
                </div>
            </div>

            <div className="content-cart-item-footer">
                {!schedule.status ? (
                    <Button className="content-cart-item-footer-btn cancel-schedule-register" onClick={handleOpenModal}>
                        Hủy lịch
                    </Button>
                ) : null}
            </div>

            {/* Modal confirm delete request schedule */}
            <Modal
                open={openModal}
                onCancel={handleHideModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Hủy Lịch Khám Của Bệnh Nhân</TitleName>

                <Form
                    onFinish={handleDeleteScheduleMedicalOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                    fields={[{ name: ['record'], value: record }]}
                >
                    {/* reason */}
                    <Form.Item
                        name="reason"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập lý do hủy lịch khám.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Nhập lý do hủy lịch khám..." />
                    </Form.Item>

                    {/* Obj record */}
                    <Form.Item name="record" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Button */}
                    <Button
                        style={{ backgroundColor: 'red', color: 'white', marginLeft: '4px' }}
                        htmlType="submit"
                        block
                    >
                        Xác nhận hủy lịch
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}

export default CardItemRegisterSchedule;
