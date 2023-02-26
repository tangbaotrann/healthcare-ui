// lib
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

function Conversation() {
    const dispatch = useDispatch();

    const conversations = useSelector(cleanConversationListSelector);
    const idConversation = useSelector(btnClickGetIdConversationSelector);
    const messages = useSelector(messageOfUserFilter);

    // console.log('conversations', conversations);
    // console.log('idConversation', idConversation);
    // console.log('messages', messages);

    // handle click conversation -> get id conversation
    const handleClickConversation = (conversation) => {
        dispatch(conversationSlice.actions.arrivalIdConversation(conversation));
        dispatch(fetchApiMessages(conversation._id));
    };

    return (
        <div className="wrapper-messenger">
            {/* Conversation */}
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

            {/* Message */}
            {idConversation ? (
                <Message messages={messages} />
            ) : (
                <div className="wrapper-message">
                    <strong className="message-welcome">
                        XIN CHÀO, BẠN CÓ THỂ NHẮN TIN VỚI BÁC SĨ ĐỂ ĐƯỢC TƯ VẤN THÊM VỀ BỆNH NHÉ !
                    </strong>
                </div>
            )}
        </div>
    );
}

export default Conversation;
