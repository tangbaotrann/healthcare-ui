// lib
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'antd';
import { memo, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

// me
import './Conversation.css';
import { logo } from '~/asset/images';
import {
    btnClickGetIdConversationSelector,
    cleanConversationListSelector,
    messageOfUserFilter,
} from '~/redux/selector';
import conversationSlice from '~/redux/features/conversation/conversationSlice';
import { fetchApiMessages } from '~/redux/features/message/messageSlice';
import Message from './Message';
import { Link } from 'react-router-dom';
import { endPoints } from '~/routers';
import socket from '~/utils/socket';

function Conversation({ infoUser, recordConversation }) {
    const [openModalCall, setOpenModalCall] = useState(false);
    const [roomId, setRoomId] = useState();

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    const dispatch = useDispatch();

    const conversations = useSelector(cleanConversationListSelector);

    const conversation = useSelector(btnClickGetIdConversationSelector);
    const messages = useSelector(messageOfUserFilter);
    // const checkConversation = useSelector(btnClickedRecordGetIdConversationSelector);

    // console.log('roomId', roomId);
    // console.log('infoUser', infoUser);
    // console.log('conversations', conversations);
    // console.log('conversation info user patient ->', conversation);
    // console.log('messages', messages);
    // console.log('recordConversation', recordConversation);
    // console.log('checkConversation', checkConversation);

    // show call now
    useEffect(() => {
        socket.on('call_now_to_user_success', ({ room_id, info_doctor, info_patient }) => {
            // console.log('call_now_to_user_success room_id', room_id);
            // console.log('call_now_to_user_success info_doctor', info_doctor);
            // console.log('call_now_to_user_success info_patient', info_patient);
            setOpenModalCall(true);
            setRoomId({ room_id, info_doctor, info_patient });
        });
    }, []);

    // handle click conversation -> get id conversation
    const handleClickConversation = (conversation) => {
        // console.log('con', conversation);
        dispatch(conversationSlice.actions.arrivalIdConversation(conversation));
        dispatch(fetchApiMessages(conversation._id));
    };

    const handleHideModal = () => {
        setOpenModalCall(false);
    };

    // handle not accept call
    const handleNotAcceptCall = () => {
        // console.log('not accept.');
        socket.emit('call_now_not_accept_to_user', {
            small_id: small_id,
            roomId: roomId.room_id,
        });
        handleHideModal();
    };

    return (
        <div className="wrapper-messenger">
            {roomId && (
                <Modal
                    open={openModalCall}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <p style={{ textAlign: 'center' }}>
                        <i className="call-title-name-from">
                            BN. {roomId.info_doctor.patient.person.username} đang gọi cho bạn...
                        </i>
                    </p>

                    <div className="display-calls">
                        <Link
                            to={`${endPoints.meetingRoom}/${roomId.room_id}/${roomId.info_patient.replace(/\s/g, '')}`}
                            target="_blank"
                            onClick={handleHideModal}
                        >
                            <Button className="call-go-to-room-awaiting">Đi đến phòng chờ</Button>
                        </Link>

                        <Button onClick={handleNotAcceptCall} className="btn-not-accept-call">
                            Từ chối tham gia
                        </Button>
                    </div>
                </Modal>
            )}

            <>
                <div className="container-conversation">
                    <strong>Cuộc trò chuyện của bạn</strong>

                    {conversations.map((conversation) => {
                        return (
                            <div
                                className="conversation-item"
                                key={conversation._id}
                                onClick={() => handleClickConversation(conversation)}
                            >
                                <img
                                    src={conversation.member ? conversation.member.avatar : logo.iconHeart}
                                    className="conversation-avatar"
                                    alt="img-conversation-avt"
                                />

                                <div className="conversation-info">
                                    <h4>{conversation.member ? conversation.member.username : null}</h4>
                                    <p>{conversation.last_message ? conversation.last_message.content : null}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Divider type="vertical" className="divider-vertical" />
            </>
            {/* )} */}

            {/* Message */}
            {conversation ? (
                <Message
                    messages={messages}
                    conversation={conversation}
                    infoUser={infoUser}
                    // recordConversation={recordConversation}
                />
            ) : (
                <div className="wrapper-message">
                    <strong className="message-welcome">
                        XIN CHÀO, BẠN CÓ THỂ NHẮN TIN ĐỂ CÓ THỂ TƯ VẤN THÊM VỀ BỆNH CHO BỆNH NHÂN NHÉ !
                    </strong>
                </div>
            )}
        </div>
    );
}

export default memo(Conversation);
