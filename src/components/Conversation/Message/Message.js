// lib
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import './Message.css';
import { logo } from '~/asset/images';
import messageSlice, { fetchApiCreateMessage } from '~/redux/features/message/messageSlice';
import { btnClickGetIdConversationSelector, getDoctorLoginFilter } from '~/redux/selector';
import { SendOutlined } from '@ant-design/icons';
import socket from '~/utils/socket';

function Message({ messages, conversation }) {
    const [value, setValue] = useState('');

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
        socket.emit('join_room', conversation._id);
        socket.emit('status_user', infoMember.member._id);

        socket.on('get_users', (users) => {
            console.log('USER - ONLINE -', users);
        });
    }, [conversation._id, infoMember.member._id]);

    // socket when send message
    useEffect(() => {
        socket.on('receiver_message', (message) => {
            // console.log('message socket ->', message);
            dispatch(messageSlice.actions.arrivalMessageFromSocket(message));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                </div>

                <div className="message-body">
                    {messages.map((message) => {
                        return (
                            <div className="message-item" key={message._id} ref={scrollMessage}>
                                <img
                                    src={
                                        message.user.doctor.person ? message.user.doctor.person.avatar : logo.iconHeart
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
            </div>
        </div>
    );
}

export default Message;
