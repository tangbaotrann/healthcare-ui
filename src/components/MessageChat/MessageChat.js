import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Popover, Tooltip } from 'antd';
import EmojiPicker, { SkinTones } from 'emoji-picker-react';
import {
    AudioMutedOutlined,
    AudioOutlined,
    CloseOutlined,
    FileJpgOutlined,
    LoadingOutlined,
    SendOutlined,
    SmileOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import './MessageChat.css';
import { logo } from '~/asset/images';
import messageSlice, { fetchApiCreateMessage } from '~/redux/features/message/messageSlice';
import socket from '~/utils/socket';
import MessageChatItem from './MessageChatItem';
import MessageChatPreviewImage from './MessageChatPreviewImage';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { isLoadingMessagesSelector } from '~/redux/selector';
import { endPoints } from '~/routers';

function MessageChat({ conversationClick, messages, patients }) {
    const [value, setValue] = useState('');
    const [newImageMessage, setNewImageMessage] = useState([]);
    const [previewEmoji, setPreviewEmoji] = useState(false);
    const [muteRecording, setMuteRecording] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [openModalCall, setOpenModalCall] = useState(false);
    const [roomId, setRoomId] = useState();

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    const dispatch = useDispatch();

    const scrollMessage = useRef();
    const focusInputMessage = useRef();

    const isLoadingMessages = useSelector(isLoadingMessagesSelector);

    // console.log('roomId -->', roomId);
    // console.log('conversationClick -->', conversationClick);
    // console.log('patients -->', patients);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversationClick); // obj
        socket.emit('add_user', patients.patient._id);

        socket.on('get_users', (users) => {
            // console.log('USER - ONLINE -', users);
            setOnlineUsers(users.filter((_user) => _user.userId === conversationClick.member._id));
        });

        // joined_room
        socket.on('joined_room', (conversationId) => {
            // console.log('[conversation - id] ->', conversationId);
        });
    }, [conversationClick, patients.patient._id]);

    // socket when send message
    useEffect(() => {
        socket.on('receiver_message', ({ message }) => {
            dispatch(messageSlice.actions.arrivalMessageFromSocket(message));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    // hide modal call now
    const handleHideModal = () => {
        setOpenModalCall(false);
    };

    // handle change input
    const handleChangeInput = (e) => {
        const message = e.target.value;

        setValue(message);
    };

    // handle send emoji
    const handleEmojiClicked = (emojiObj) => {
        let emojis = emojiObj.emoji;
        const _message = [...value, emojis];

        setValue(_message.join(''));
    };

    // handle preview emoji
    const handlePreviewEmoji = () => {
        setPreviewEmoji(true);
    };

    // handle close preview emoji
    const handleClosePreviewEmoji = () => {
        setPreviewEmoji(false);
    };

    // handle send message (create message)
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
        }
        dispatch(
            fetchApiCreateMessage({
                conversation: conversationClick._id,
                senderId: patients.patient._id,
                content: value,
                image: newImageMessage,
            }),
        );
        setValue('');
        setNewImageMessage([]);
    };

    // handle option change images
    const handleOptionChangeImages = (e) => {
        const files = e.target.files;
        const listFiles = [];

        [...files].forEach((_file) => {
            listFiles.push({
                imageFile: _file,
                preview: URL.createObjectURL(_file),
            });
        });

        setNewImageMessage(listFiles);
        focusInputMessage.current.focus();
    };

    // cleanup func
    useEffect(() => {
        return () => {
            newImageMessage &&
                URL.revokeObjectURL(
                    newImageMessage.map((_image) => {
                        return _image.preview;
                    }),
                );
        };
    }, [newImageMessage]);

    // handle delelet preview image
    const handleDeletePreviewImage = (_image) => {
        const fileImages = newImageMessage.filter((_img) => _img.preview !== _image.preview);
        setNewImageMessage(fileImages);
        focusInputMessage.current.focus();
    };

    // handle start recording
    const handleStartRecording = () => {
        setMuteRecording(true);
        setOpenPopover(true);
    };

    // handle stop recording
    const handleStopRecording = async (recordedBlob) => {
        setMuteRecording(false);
        setOpenPopover(false);

        // console.log('recordedBlob is: ', recordedBlob);
        // setAudio(recordedBlob);

        setIsLoadingSpeech(true);

        if (recordedBlob) {
            const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
            const formData = new FormData();
            formData.append('file', recordedBlob.blob, recordedBlob.startTime.toString() + '.mp3');
            formData.append('model', 'whisper-1');

            const response = await axios.post(`${process.env.REACT_APP_OPEN_AI_API}audio/transcriptions`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            setValue(response.data.text);
            focusInputMessage.current.focus();
            setIsLoadingSpeech(false);
        }
    };

    // scroll message
    useEffect(() => {
        conversationClick && messages && scrollMessage.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversationClick, messages, scrollMessage]);

    // get info user
    const handleCallGetInfoUser = () => {
        // socket.emit('call_id_room_to_user', { conversation, infoDoctor });
        socket.emit('call_now_to_user', { conversation: conversationClick, patients });
    };

    // handle not accept call
    const handleNotAcceptCall = () => {
        // console.log('not accept.');
        socket.emit('call_now_not_accept_to_user', {
            small_id: small_id,
            roomId: roomId.room_id,
            patient_id: patients.patient._id,
        });
        handleHideModal();
    };

    return (
        <div className="chat-messages-container">
            {roomId && (
                <Modal
                    open={openModalCall}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <p style={{ textAlign: 'center' }}>
                        <i className="call-title-name-from">
                            BS. {roomId.info_doctor.person.username} đang gọi cho bạn...
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

            <div className="chat-messages-header">
                <img
                    className="chat-messages-header-avatar"
                    src={conversationClick.member.avatar || logo.iconHeart}
                    alt="avatar"
                />

                <div className="chat-messages-header-info">
                    <h4>{conversationClick.member.username}</h4>

                    {/* <p>Offline</p> */}
                    {/* <div className="badge"></div> */}
                </div>

                {/* icon call video onClick={handleCallJoined} */}
                <button className="icon-call-video-btn">
                    <Link
                        to={`${endPoints.meetingRoom}/${conversationClick._id}/${patients.patient.person.username}`}
                        target="_blank"
                    >
                        <VideoCameraAddOutlined className="icon-call-video" onClick={handleCallGetInfoUser} />
                    </Link>
                </button>
            </div>

            {/* MAP messages */}
            <div className="chat-messages-body">
                {isLoadingMessages ? (
                    <p className="display-loading-icon">
                        <LoadingOutlined className="loading-messages" />
                    </p>
                ) : (
                    <>
                        {messages.map((message) => {
                            return (
                                <MessageChatItem
                                    message={message}
                                    patients={patients}
                                    scrollMessage={scrollMessage}
                                    key={message._id}
                                />
                            );
                        })}
                    </>
                )}
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
                                onChange={handleOptionChangeImages}
                            />
                        </div>
                    </label>
                </div>

                {isLoadingSpeech && <p className="loading-listen-message"></p>}
                <form>
                    <input
                        type="text"
                        ref={focusInputMessage}
                        value={value}
                        onChange={(e) => handleChangeInput(e)}
                        className="input-message-text"
                        rows="2"
                        placeholder={!isLoadingSpeech ? 'Nhập tin nhắn...' : ''}
                        spellCheck="false"
                    />

                    {/* Button send  */}
                    {(value || newImageMessage.length !== 0) && (
                        <button className="btn-submit" onClick={handleSendMessage}>
                            <SendOutlined className="btn-submit-icon" />
                        </button>
                    )}
                </form>

                {/* Preview Emoji */}
                <div className="container-emoji-picker">
                    <div className="preview-images">
                        <MessageChatPreviewImage
                            newImageMessage={newImageMessage}
                            handleDeletePreviewImage={handleDeletePreviewImage}
                        />
                    </div>

                    {muteRecording ? (
                        <Popover
                            title={() => {
                                return <p className="loading-listen">Đang nhận diện bằng giọng nói</p>;
                            }}
                            trigger="click"
                            open={openPopover}
                        >
                            <AudioOutlined
                                className="audio-un-mute-message chat-audio-un-mute-message"
                                onClick={handleStopRecording}
                            />
                        </Popover>
                    ) : (
                        <>
                            <Tooltip title="Nhận diện bằng giọng nói">
                                <AudioMutedOutlined
                                    className="audio-mute-message chat-audio-mute-message"
                                    onClick={handleStartRecording}
                                />
                            </Tooltip>
                        </>
                    )}

                    <ReactMic
                        record={muteRecording}
                        className="sound-wave"
                        onStop={handleStopRecording}
                        mimeType="wav"
                        strokeColor="#000000"
                        backgroundColor="#FF4081"
                    />

                    {previewEmoji ? (
                        <>
                            <EmojiPicker defaultSkinTone={SkinTones} onEmojiClick={handleEmojiClicked} />
                            <CloseOutlined
                                className="emoji-picker-close-btn chat-emoji-picker-close-btn"
                                onClick={handleClosePreviewEmoji}
                            />
                        </>
                    ) : (
                        <SmileOutlined
                            className="emoji-picker-open-btn chat-emoji-picker-open-btn"
                            onClick={handlePreviewEmoji}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessageChat;
