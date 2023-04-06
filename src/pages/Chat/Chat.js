import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Tooltip } from 'antd';
import { FileJpgOutlined, SendOutlined } from '@ant-design/icons';

import './Chat.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { cleanConversationOfPatientListSelector, fetchApiAllPatientsSelector } from '~/redux/selector';
import { logo } from '~/asset/images';
import { fetchApiConversationsOfPatient } from '~/redux/features/conversation/conversationSlice';

function Chat() {
    const [value, setValue] = useState('');

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const conversations = useSelector(cleanConversationOfPatientListSelector);

    const dispatch = useDispatch();

    console.log('conversations', conversations);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);
    useEffect(() => {
        dispatch(fetchApiConversationsOfPatient(patients?.patient?._id));
    }, [patients?.patient?._id]);

    // handle change input
    const handleChangeInput = (e) => {
        const message = e.target.value;

        setValue(message);
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
                <div className="chat-messages-container">
                    <div className="chat-messages-header">
                        <img className="chat-messages-header-avatar" src={logo.iconHeart} alt="avatar" />

                        <div className="chat-messages-header-info">
                            <h4>Tăng Bảo Trấn</h4>

                            {/* <p>Offline</p> */}
                            {/* <div className="badge"></div> */}
                        </div>
                    </div>

                    {/* MAP messages */}
                    <div className="chat-messages-body">
                        <div
                            className={`chat-message-item`} //${
                            // infoUser.doctor._id === message.senderId
                            // ? 'message-item-bg-own'
                            // : 'message-item-bg-user'
                            // }`}
                            // key={message._id}
                            // ref={scrollMessage}
                        >
                            <img
                                src={
                                    // message.user.doctor.person
                                    //     ? message.user.doctor.person.avatar
                                    //     : message.user.doctor.doctor.person
                                    //     ? message.user.doctor.doctor.person.avatar
                                    //     :
                                    logo.iconHeart
                                }
                                className="message-avt"
                                alt="message-avt"
                            />

                            <div className="chat-messages-body-info">
                                <p className="chat-messages-body-info-content">Chào bác sĩ</p>
                                <p className="message-info-time">10:10 pm</p>
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="chat-message-footer">
                        {/* File */}
                        <div className="message-footer-inner">
                            <label htmlFor="opt-file-label">
                                <div className="option-file-image">
                                    {/* <PaperClipOutlined  /> */}
                                    <Tooltip title="Chọn ảnh">
                                        <FileJpgOutlined className="option-file-image-icon" />
                                    </Tooltip>
                                    <input
                                        className="opt-file-label-hide"
                                        type="file"
                                        id="opt-file-label"
                                        name="opt-file-label"
                                        multiple
                                        accept=".png, .jpg, .jpeg, .mov, .mp4"
                                        // onChange={handleOptionChangeImages}
                                    />
                                </div>
                            </label>
                        </div>

                        <input
                            type="text"
                            // ref={focusInputMessage}
                            value={value}
                            onChange={(e) => handleChangeInput(e)}
                            // onKeyDown={handleSendMessage}
                            className="input-message-text"
                            rows="2"
                            // !isLoadingSpeech ?
                            placeholder={'Nhập tin nhắn...'}
                            spellCheck="false"
                        />
                        {/* Button send  */}
                        {/* || newImageMessage.length !== 0 onClick={handleSendMessage}*/}
                        {value && (
                            <button className="btn-submit">
                                <SendOutlined className="btn-submit-icon" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Chat;
