// lib
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Image, Modal, Typography, message } from 'antd';
import { Link } from 'react-router-dom';

// me
import { icons } from '~/asset/images';
import {
    btnClickGetUsernameLeavedRoomSelector,
    getDoctorLoginFilter,
    scheduleMedicalMeetingFilterOfDoctor,
} from '~/redux/selector';
import socket from '~/utils/socket';
import { endPoints } from '~/routers';
import callSlice from '~/redux/features/call/callSlice';
import ContentAfterExaminated from '~/components/Conversation/ContentAfterExaminated/ContentAfterExaminated';
import Conversation from '~/components/Conversation';
import conversationSlice from '~/redux/features/conversation/conversationSlice';
import { fetchApiMessages } from '~/redux/features/message/messageSlice';

const { Paragraph } = Typography;

function CartMeeting({ infoUser, schedules }) {
    const [conversation, setConversation] = useState('');
    const [record, setRecord] = useState({}); // get id schedule detail
    const [showModalConversation, setShowModalConversation] = useState(false);

    const dispatch = useDispatch();

    const scheduleMedicalsMeetingFilter = useSelector(scheduleMedicalMeetingFilterOfDoctor);
    const infoDoctor = useSelector(getDoctorLoginFilter);
    const checkLeavedRoom = useSelector(btnClickGetUsernameLeavedRoomSelector);

    // console.log('scheduleMedicalsMeetingFilter ->', scheduleMedicalsMeetingFilter);
    // console.log('infoDoctor ->', infoDoctor);
    // console.log('checkLeavedRoom ->', checkLeavedRoom);
    // console.log('conversation ->', conversation);
    // console.log('record ->', record);
    // console.log('infoUser ->', infoUser);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversation); // obj
        socket.emit('add_user', infoDoctor?._id);

        socket.on('get_users', (users) => {
            // console.log('USER - ONLINE -', users);
        });

        // joined_room
        socket.on('joined_room', (conversationId) => {
            // console.log('[conversation - id] ->', conversationId);
        });
    }, [conversation, infoDoctor?._id]);

    useEffect(() => {
        socket.on('user_leave_room_call_success', ({ username, roomId }) => {
            // console.log('user_leave_room_call_success ->', username, roomId);
            dispatch(callSlice.actions.arrivalUsername(username));
        });
    }, []);

    // get info user
    const handleCallGetInfoUser = (_scheduleMedicalMeeting) => {
        // console.log('_scheduleMedicalMeeting', _scheduleMedicalMeeting);
        const conversation = _scheduleMedicalMeeting.conversations;

        if (!_scheduleMedicalMeeting.is_exam) {
            socket.emit('call_id_room_to_user', { conversation, infoDoctor, _scheduleMedicalMeeting });
        }
        // dispatch(callSlice.actions.arrivalUserId(_scheduleMedicalMeeting));
        setConversation(conversation);
        setRecord(_scheduleMedicalMeeting);
        // socket.emit('user_join_room_call', { _scheduleMedicalMeeting });
    };

    // show modal conversation
    const handleShowModalConversation = (_scheduleMedicalMeeting) => {
        // console.log('record ->', _scheduleMedicalMeeting);
        if (_scheduleMedicalMeeting.conversations === null || _scheduleMedicalMeeting.conversations === undefined) {
            message.error('Bạn chưa có cuộc trò chuyện!');
            return;
        }

        setShowModalConversation(true);
        dispatch(conversationSlice.actions.arrivalIdConversation(_scheduleMedicalMeeting.conversations)); // obj conversation filter
        dispatch(fetchApiMessages(_scheduleMedicalMeeting.conversations._id));
    };

    // hide
    const hideModalConversation = () => {
        setShowModalConversation(false);
    };

    return (
        <>
            {/* Show modal conversation */}
            <Modal
                open={showModalConversation}
                onCancel={hideModalConversation}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1200}
            >
                {record ? <Conversation infoUser={infoUser} recordConversation={record} /> : null}
            </Modal>

            <>
                {scheduleMedicalsMeetingFilter.length > 0 ? (
                    scheduleMedicalsMeetingFilter.map((_scheduleMedicalMeeting) => {
                        // console.log('Hour ----> ', moment(_scheduleMedicalMeeting.day_exam).hour());
                        // console.log('Minute ----> ', moment(_scheduleMedicalMeeting.day_exam).minute());
                        // console.log('moment Hour ->', moment(new Date()).hour());

                        return (
                            <div className="schedule-medical-meeting-cart" key={_scheduleMedicalMeeting._id}>
                                {_scheduleMedicalMeeting.is_exam ? (
                                    <div className="cart-meeting-banner-is-exam">
                                        <i>Đang khám...</i>
                                    </div>
                                ) : null}

                                {moment(_scheduleMedicalMeeting?.day_exam).diff(new Date(), 'day') === 0 &&
                                moment(_scheduleMedicalMeeting?.day_exam).format('DD/MM/YYYY') ===
                                    moment(new Date()).format('DD/MM/YYYY') ? (
                                    <div className="cart-meeting-banner-day-exam-for-patient">
                                        <img
                                            className="cart-meeting-banner-day-exam-icon"
                                            src={icons.iconTime}
                                            alt="iconTime"
                                        />
                                        <i>Hôm nay khám cho bệnh nhân</i>
                                    </div>
                                ) : _scheduleMedicalMeeting?.status ? (
                                    <div className="cart-meeting-banner-day-exam-for-patient-awaiting">
                                        <img
                                            className="cart-meeting-banner-day-exam-icon"
                                            src={icons.iconTime}
                                            alt="iconTime"
                                        />
                                        <i>Chưa đến ngày khám</i>
                                    </div>
                                ) : null}

                                <Image
                                    src={_scheduleMedicalMeeting.patient.person.avatar}
                                    className="schedule-medical-meeting-cart-image"
                                />

                                <div className="schedule-medical-meeting-cart-info">
                                    <div className="schedule-medical-meeting-cart-info-item">
                                        <img className="icon-item" src={icons.iconUser} alt="icon-user" />
                                        <p className="desc-item">
                                            {_scheduleMedicalMeeting?.conversations?.member?.username}
                                        </p>
                                    </div>
                                    <div className="schedule-medical-meeting-cart-info-item">
                                        <img className="icon-item-time" src={icons.iconTime} alt="icon-time" />
                                        <p className="desc-item">
                                            {moment(_scheduleMedicalMeeting?.days?.day).format('dddd')} -{' '}
                                            {moment(_scheduleMedicalMeeting?.day_exam).format('DD/MM/YYYY')} -{' '}
                                            {_scheduleMedicalMeeting?.shifts?.name} (
                                            {moment(new Date(_scheduleMedicalMeeting?.shifts?.time_start)).format(
                                                'HH:mm',
                                            )}
                                            {' -> '}
                                            {moment(new Date(_scheduleMedicalMeeting?.shifts?.time_end)).format(
                                                'HH:mm',
                                            )}
                                            )
                                        </p>
                                    </div>
                                    <div className="schedule-medical-meeting-cart-info-item">
                                        <img className="icon-item" src={icons.iconHealth} alt="icon-health" />
                                        <Paragraph
                                            ellipsis={{
                                                rows: 1,
                                                expandable: true,
                                                symbol: 'Xem thêm',
                                            }}
                                            className="desc-item"
                                        >
                                            {_scheduleMedicalMeeting?.content_exam}
                                        </Paragraph>
                                    </div>
                                    <div className="schedule-medical-meeting-cart-info-item">
                                        <img className="icon-item" src={icons.iconPrice} alt="icon-price" />
                                        <p className="desc-item">{_scheduleMedicalMeeting?.schedule?.fee} VNĐ</p>
                                    </div>

                                    {/* Button */}
                                    {/* {console.log(
                                        '->',
                                        moment(_scheduleMedicalMeeting.day_exam).diff(moment(), 'days') === 0,
                                    )} */}
                                    <Link
                                        to={`${endPoints.meetingRoom}/${conversation._id}/${
                                            record._id
                                        }/${infoDoctor?.person?.username.replace(/\s/g, '')}`}
                                        target="_blank"
                                        style={{ width: '100%' }}
                                        className={`${
                                            moment(_scheduleMedicalMeeting.day_exam).diff(moment(), 'days') === 0 &&
                                            moment(_scheduleMedicalMeeting.day_exam).format('DD/MM/YYYY') ===
                                                moment(new Date()).format('DD/MM/YYYY')
                                                ? // &&
                                                  // moment(_scheduleMedicalMeeting.day_exam).hour() <=
                                                  //     moment(new Date()).hour() &&
                                                  // moment(_scheduleMedicalMeeting.day_exam).minute() <=
                                                  //     moment(new Date()).minute()
                                                  'schedule-medical-meeting-cart-btn-no-active'
                                                : 'schedule-medical-meeting-cart-btn-active'
                                        }`}
                                    >
                                        <Button
                                            className="schedule-medical-meeting-cart-btn"
                                            disabled={
                                                moment(_scheduleMedicalMeeting.day_exam).diff(moment(), 'days') === 0 &&
                                                moment(_scheduleMedicalMeeting.day_exam).format('DD/MM/YYYY') ===
                                                    moment(new Date()).format('DD/MM/YYYY')
                                                    ? // && moment(_scheduleMedicalMeeting.day_exam).hour() <=
                                                      //     moment(new Date()).hour() &&
                                                      // moment(_scheduleMedicalMeeting.day_exam).minute() <=
                                                      //     moment(new Date()).minute()
                                                      false
                                                    : true
                                            }
                                            onClick={() => handleCallGetInfoUser(_scheduleMedicalMeeting)}
                                        >
                                            {_scheduleMedicalMeeting.is_exam
                                                ? 'Tham gia lại'
                                                : moment(_scheduleMedicalMeeting.day_exam).diff(moment(), 'days') ===
                                                      0 &&
                                                  moment(_scheduleMedicalMeeting.day_exam).format('DD/MM/YYYY') ===
                                                      moment(new Date()).format('DD/MM/YYYY')
                                                ? 'Bắt đầu'
                                                : 'Đang chờ'}
                                        </Button>
                                    </Link>

                                    {/* Nhắn tin */}
                                    <Button
                                        className="cart-meeting-show-conversation-message"
                                        onClick={() => handleShowModalConversation(_scheduleMedicalMeeting)}
                                    >
                                        Nhắn tin
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="message-notification-cart-meeting">
                        <i>-- Hiện tại bạn chưa có cuộc hẹn khám --</i>
                    </p>
                )}
            </>

            {checkLeavedRoom !== null ? (
                <ContentAfterExaminated
                    recordConversation={record} // get id schedule detail
                    schedules={schedules}
                />
            ) : null}
        </>
    );
}

export default CartMeeting;
