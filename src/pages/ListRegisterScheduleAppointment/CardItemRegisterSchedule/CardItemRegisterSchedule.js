import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Rate, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';

import { icons } from '~/asset/images';
import TitleName from '~/components/TitleName';
import { fetchApiDeleteScheduleMedicalOfPatient } from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import { endPoints } from '~/routers';
import socket from '~/utils/socket';
import { groupNumber } from '~/utils/cardsData';

function CardItemRegisterSchedule({ schedule, patients }) {
    const [openModal, setOpenModal] = useState(false);
    const [record, setRecord] = useState({});

    const dispatch = useDispatch();

    // console.log('schedule ->', schedule);
    // console.log(
    //     'schedule ->',
    //     moment(schedule.day_exam).diff(new Date(), 'day') === 0 &&
    //         moment(schedule.day_exam).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY'),
    // );
    // console.log('patient ->', patients);
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

    const handleEmitSocket = () => {
        // console.log('schedule ->', schedule);
        // if (!schedule.is_exam) {
        socket.emit('rating_for_doctor', {
            conversation_id: schedule.conversation_id,
            patient_id: schedule.patient,
        });
        // }
    };

    return (
        <div className="content-cart-item">
            {schedule.status ? (
                <>
                    <div className="content-cart-item-note-success-right">
                        <i>Đã xác nhận</i>
                    </div>
                </>
            ) : (
                <div className="content-cart-item-note-await-right">
                    <i>Đang chờ xác nhận</i>
                </div>
            )}

            {schedule?.day_exam && schedule?.status ? (
                moment(schedule.day_exam).diff(new Date(), 'day') === 0 &&
                moment(schedule.day_exam).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY') ? (
                    <div className="content-cart-item-note-day-exam">
                        <img
                            className="content-cart-item-note-day-exam-time-icon"
                            src={icons.iconTime}
                            alt="iconTime"
                        />
                        {schedule.re_examination ? <i>Hôm nay tái khám</i> : <i>Hôm nay khám</i>}
                    </div>
                ) : schedule?.status ? (
                    <div className="content-cart-item-note-day-exam-awaiting">
                        <img
                            className="content-cart-item-note-day-exam-time-icon"
                            src={icons.iconTime}
                            alt="iconTime"
                        />
                        {schedule.re_examination ? <i>Chưa đến ngày tái khám</i> : <i>Chưa đến ngày khám</i>}
                    </div>
                ) : null
            ) : null}

            <div className="content-cart-item-header">
                <img className="content-cart-item-avatar" src={schedule?.doctor?.person?.avatar} alt="avatar" />
                <h2 className="content-cart-item-username">BS: {schedule?.doctor?.person?.username}</h2>
                <Rate value={schedule?.doctor?.rating} disabled style={{ fontSize: '1.4rem', marginLeft: '10px' }} />
            </div>

            <div className="display-content-cart-item-body">
                <div className="content-cart-item-body">
                    <div className="content-cart-item-body-time">
                        <img className="content-cart-item-time-icon" src={icons.iconTime} alt="iconTime" />
                        <p className="content-cart-item-time">
                            Thứ: {moment(schedule.day_exam).format('DD/MM/YYYY')} - lúc:{' '}
                            {moment(schedule.day_exam).format('HH:mm')} (Thời gian khám:{' '}
                            {schedule.schedule.time_per_conversation} phút)
                        </p>
                    </div>
                    <div className="content-cart-item-body-price">
                        <img src={icons.iconHealth} alt="iconPrice" />
                        <p className="content-cart-item-price">Đăng ký khám: {schedule.content_exam}</p>
                    </div>
                    <div className="content-cart-item-body-price">
                        <img src={icons.iconPrice} alt="iconPrice" />
                        <p className="content-cart-item-price">Chi phí: {groupNumber(schedule.schedule.fee)} VNĐ</p>
                    </div>
                </div>

                {schedule.is_exam && (
                    <div className="re-join-room">
                        <Link
                            to={`${endPoints.meetingRoom}/${schedule.conversation_id}/${patients.patient.person.username
                                .replace(/\s/g, '')
                                .replace(/Đ/g, 'D')
                                .toString()}`}
                            target="_blank"
                            onClick={handleEmitSocket}
                        >
                            <Button className="re-join-room-btn">Tham gia lại</Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="content-cart-item-footer">
                {!schedule.status ? (
                    moment(schedule.day_exam).diff(moment(), 'days') < 1 ? (
                        <Tooltip title="Bạn chỉ có thể hủy được lịch hẹn khám của mình trước 1 ngày." color="#1DCBB6">
                            <Button
                                className="content-cart-item-footer-btn cancel-schedule-register cancel-schedule-register-disabled"
                                // onClick={handleOpenModal}
                            >
                                Hủy lịch
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button
                            className="content-cart-item-footer-btn cancel-schedule-register"
                            onClick={handleOpenModal}
                        >
                            Hủy lịch
                        </Button>
                    )
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
