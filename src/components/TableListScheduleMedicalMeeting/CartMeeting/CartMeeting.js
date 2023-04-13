// lib
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Image, Modal, Skeleton, Typography, message } from 'antd';

// me
import { icons, logo } from '~/asset/images';
import {
    btnClickGetUsernameLeavedRoomSelector,
    getDoctorLoginFilter,
    isLoadingScheduleDetailByIdDoctorSelector,
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

function CartMeeting({ infoUser }) {
    const [conversation, setConversation] = useState('');
    const [record, setRecord] = useState({}); // get id schedule detail
    const [showModalConversation, setShowModalConversation] = useState(false);

    const dispatch = useDispatch();

    const scheduleMedicalsMeetingFilter = useSelector(scheduleMedicalMeetingFilterOfDoctor);
    const isLoading = useSelector(isLoadingScheduleDetailByIdDoctorSelector);
    const infoDoctor = useSelector(getDoctorLoginFilter);
    const checkLeavedRoom = useSelector(btnClickGetUsernameLeavedRoomSelector);

    console.log('scheduleMedicalsMeetingFilter ->', scheduleMedicalsMeetingFilter);
    // console.log('infoDoctor ->', infoDoctor);
    // console.log('checkLeavedRoom ->', checkLeavedRoom);
    // console.log('conversation ->', conversation);
    // console.log('record ->', record);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversation); // obj
        socket.emit('add_user', infoDoctor._id);

        socket.on('get_users', (users) => {
            // console.log('USER - ONLINE -', users);
        });

        // joined_room
        socket.on('joined_room', (conversationId) => {
            // console.log('[conversation - id] ->', conversationId);
        });
    }, [conversation, infoDoctor._id]);

    useEffect(() => {
        socket.on('user_leave_room_call_success', ({ username, roomId }) => {
            console.log('user_leave_room_call_success ->', username, roomId);
            dispatch(callSlice.actions.arrivalUsername(username));
        });
    }, []);

    // get info user
    const handleCallGetInfoUser = (_scheduleMedicalMeeting) => {
        console.log('_scheduleMedicalMeeting', _scheduleMedicalMeeting);
        const conversation = _scheduleMedicalMeeting.conversations;

        socket.emit('call_id_room_to_user', { conversation, infoDoctor, _scheduleMedicalMeeting });
        setConversation(conversation);
        setRecord(_scheduleMedicalMeeting);
    };

    // show modal conversation
    const handleShowModalConversation = (_scheduleMedicalMeeting) => {
        console.log('record ->', _scheduleMedicalMeeting);
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

            {isLoading ? (
                <Skeleton active />
            ) : (
                scheduleMedicalsMeetingFilter.map((_scheduleMedicalMeeting) => {
                    return (
                        <div className="schedule-medical-meeting-cart" key={_scheduleMedicalMeeting._id}>
                            <Image src={logo.iconLogo192x192} className="schedule-medical-meeting-cart-image" />

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
                                        {moment(new Date(_scheduleMedicalMeeting?.shifts?.time_start)).format('HH:mm')}
                                        {' -> '}
                                        {moment(new Date(_scheduleMedicalMeeting?.shifts?.time_end)).format('HH:mm')})
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
                                <Link
                                    to={`${endPoints.meetingRoom}/${conversation._id}/${infoDoctor.person.username}`}
                                    target="_blank"
                                    style={{ width: '100%' }}
                                >
                                    <Button
                                        className="schedule-medical-meeting-cart-btn"
                                        onClick={() => handleCallGetInfoUser(_scheduleMedicalMeeting)}
                                    >
                                        Tham gia ngay
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
            )}

            {checkLeavedRoom !== null ? (
                <ContentAfterExaminated
                    recordConversation={record} // get id schedule detail
                />
            ) : null}
        </>
    );
}

export default CartMeeting;
