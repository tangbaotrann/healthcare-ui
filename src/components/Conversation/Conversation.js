// lib
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { memo } from 'react';

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

function Conversation({ infoUser, recordConversation }) {
    const dispatch = useDispatch();

    const conversations = useSelector(cleanConversationListSelector);

    const conversation = useSelector(btnClickGetIdConversationSelector);
    const messages = useSelector(messageOfUserFilter);
    // const checkConversation = useSelector(btnClickedRecordGetIdConversationSelector);

    // console.log('conversations', conversations);
    // console.log('conversation info user patient ->', conversation);
    // console.log('messages', messages);
    // console.log('recordConversation', recordConversation);
    // console.log('checkConversation', checkConversation);

    // handle click conversation -> get id conversation
    const handleClickConversation = (conversation) => {
        // console.log('con', conversation);
        dispatch(conversationSlice.actions.arrivalIdConversation(conversation));
        dispatch(fetchApiMessages(conversation._id));
    };

    return (
        <div className="wrapper-messenger">
            {/* Conversation */}
            {/* {checkConversation ? null : ( */}
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
