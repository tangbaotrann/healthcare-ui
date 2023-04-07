import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'antd';

import './Chat.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import {
    cleanConversationOfPatientListSelector,
    fetchApiAllPatientsSelector,
    messageOfUserFilter,
    patientMessageOfUserFilter,
} from '~/redux/selector';
import { logo } from '~/asset/images';
import { fetchApiConversationsOfPatient } from '~/redux/features/conversation/conversationSlice';
import MessageChat from '~/components/MessageChat/MessageChat';
import { fetchApiMessages } from '~/redux/features/message/messageSlice';

function Chat() {
    const [conversationClick, setConversationClick] = useState(false);

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const conversations = useSelector(cleanConversationOfPatientListSelector);
    const messages = useSelector(patientMessageOfUserFilter);

    const dispatch = useDispatch();

    // console.log('conversations', conversations);
    console.log('messages', messages);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    useEffect(() => {
        dispatch(fetchApiConversationsOfPatient(patients?.patient?._id));
    }, [patients?.patient?._id]);

    // handle click conversation
    const handleClickedConversation = (conversation) => {
        setConversationClick(conversation);
        dispatch(fetchApiMessages(conversation._id));
        console.log('handleClickedConversation', conversation);
    };

    return (
        <DefaultLayout patients={patients}>
            <div className="chat-wrapper">
                {/* Conversation */}
                <div className="chat-conversation-container">
                    <strong className="chat-conversation-title">Cuộc trò chuyện của bạn</strong>

                    {/* MAP conversation */}
                    {conversations?.length > 0 ? (
                        <>
                            {conversations.map((conversation) => {
                                return (
                                    <div
                                        className="conversation-item chat-conversation-border-item"
                                        key={conversation._id}
                                        onClick={() => handleClickedConversation(conversation)}
                                    >
                                        <img
                                            src={conversation.member ? conversation.member.avatar : logo.iconHeart}
                                            className="conversation-avatar"
                                            alt="img-conversation-avt"
                                        />

                                        <div className="conversation-info">
                                            <h4 className="chat-conversation-username">
                                                {conversation.member.username}
                                            </h4>
                                            <p className="chat-conversation-content">
                                                {conversation.last_message.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <i>Bạn chưa có cuộc trò chuyện nào.</i>
                    )}
                </div>
                <Divider type="vertical" className="divider-vertical" />

                {/* Messages */}
                {conversationClick ? (
                    <MessageChat conversationClick={conversationClick} messages={messages} patients={patients} />
                ) : (
                    <strong className="message-welcome">
                        XIN CHÀO, BẠN CÓ THỂ NHẮN TIN VỚI BÁC SĨ ĐỂ ĐƯỢC TƯ VẤN THÊM VỀ BỆNH NHÉ !
                    </strong>
                )}
            </div>
        </DefaultLayout>
    );
}

export default Chat;
