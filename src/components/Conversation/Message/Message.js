// lib
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker, { SkinTones } from 'emoji-picker-react';

// me
import './Message.css';
import { logo } from '~/asset/images';
import messageSlice, { fetchApiCreateMessage } from '~/redux/features/message/messageSlice';
import {
    btnClickGetIdConversationSelector,
    filterInfoDoctorInConversationListSelector,
    getDoctorLoginFilter,
} from '~/redux/selector';
import { CloseOutlined, PhoneOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import socket from '~/utils/socket';

function Message({ messages, conversation }) {
    const [value, setValue] = useState('');
    const [previewEmoji, setPreviewEmoji] = useState(false);

    const dispatch = useDispatch();

    const infoMember = useSelector(btnClickGetIdConversationSelector);
    const infoDoctor = useSelector(getDoctorLoginFilter);

    const scrollMessage = useRef();

    // console.log('infoMember ->', infoMember);
    // console.log('messages ->', messages);
    // console.log('infoDoctor ->', infoDoctor);
    // console.log('conversation ->', conversation);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversation);
        socket.emit('status_user', infoMember.member._id);

        socket.on('get_users', (users) => {
            console.log('USER - ONLINE -', users);
        });

        // joined_room
        socket.on('joined_room', (conversationId) => {
            console.log('[conversation - id] ->', conversationId);
        });
    }, [conversation, infoMember.member._id]);

    // socket when send message
    useEffect(() => {
        socket.on('receiver_message', (message) => {
            // console.log('message socket ->', message);
            dispatch(messageSlice.actions.arrivalMessageFromSocket(message));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handle joined in room
    const handleRoomJoined = () => {};

    // handle change input
    const handleChangeInput = (e) => {
        const message = e.target.value;

        setValue(message);
    };

    // handle send message (create message)
    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            dispatch(
                fetchApiCreateMessage({
                    conversation: conversation._id,
                    senderId: infoDoctor._id,
                    content: value,
                }),
            );
            setValue('');
        }
    };

    // handle preview emoji
    const handlePreviewEmoji = () => {
        setPreviewEmoji(true);
    };

    // handle close preview emoji
    const handleClosePreviewEmoji = () => {
        setPreviewEmoji(false);
    };

    // handle send emoji
    const handleEmojiClicked = (emojiObj) => {
        let emojis = emojiObj.emoji;
        const _message = [...value, emojis];

        setValue(_message.join(''));
    };

    // scroll message
    useEffect(() => {
        conversation && scrollMessage.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation, scrollMessage]);

    return (
        <div className="wrapper-message">
            <div className="container-message">
                <div className="message-header">
                    <img
                        src={infoMember.member ? infoMember.member.avatar : logo.iconHeart}
                        className="message-header-avt"
                        alt="avt-header"
                    />

                    <div className="message-header-info">
                        <h4>{infoMember.member.username}</h4>

                        {/* <p>Offline</p> */}
                        {/* <div className="badge"></div> */}
                    </div>

                    {/* icon call video */}
                    <button className="icon-call-video-btn" onClick={handleRoomJoined}>
                        <PhoneOutlined className="icon-call-video" />
                    </button>
                </div>

                <div className="message-body">
                    {messages.map((message) => {
                        return (
                            <div className="message-item" key={message._id} ref={scrollMessage}>
                                <img
                                    src={
                                        message.user.doctor.person
                                            ? message.user.doctor.person.avatar
                                            : message.user.doctor.doctor.person
                                            ? message.user.doctor.doctor.person.avatar
                                            : logo.iconHeart
                                    }
                                    className="message-avt"
                                    alt="message-avt"
                                />

                                <div className="message-info">
                                    <p className="message-info-content">{message.content}</p>
                                    <p className="message-info-time">{moment(message.createdAt).format('HH:mm')}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Input */}
            <div className="message-footer">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChangeInput(e)}
                    onKeyDown={handleSendMessage}
                    className="input-message-text"
                    rows="2"
                    placeholder="Type your message here..."
                    spellCheck="false"
                />
                {value && (
                    <button className="btn-submit" onClick={handleSendMessage}>
                        <SendOutlined className="btn-submit-icon" />
                    </button>
                )}
                <div className="container-emoji-picker">
                    {!previewEmoji && <SmileOutlined onClick={handlePreviewEmoji} />}
                    {previewEmoji && (
                        <>
                            <EmojiPicker defaultSkinTone={SkinTones} onEmojiClick={handleEmojiClicked} />
                            <CloseOutlined className="emoji-picker-close-btn" onClick={handleClosePreviewEmoji} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message;
