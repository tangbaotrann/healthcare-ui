// lib
import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmojiPicker, { SkinTones } from 'emoji-picker-react';
import { Popover, Tooltip } from 'antd';
import { ReactMic } from 'react-mic';

// me
import './Message.css';
import { logo } from '~/asset/images';
import messageSlice, { fetchApiCreateMessage } from '~/redux/features/message/messageSlice';
import { btnClickGetIdConversationSelector, getDoctorLoginFilter } from '~/redux/selector';
import {
    AudioMutedOutlined,
    AudioOutlined,
    CloseOutlined,
    FileJpgOutlined,
    SendOutlined,
    SmileOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import socket from '~/utils/socket';
import { endPoints } from '~/routers';
import MessageItem from './MessageItem';
import axios from 'axios';
import callSlice from '~/redux/features/call/callSlice';
import MessageChatPreviewImage from '~/components/MessageChat/MessageChatPreviewImage/MessageChatPreviewImage';

function Message({ messages, conversation, infoUser }) {
    // recordConversation
    const [value, setValue] = useState('');
    const [previewEmoji, setPreviewEmoji] = useState(false);
    const [muteRecording, setMuteRecording] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
    const [newImageMessage, setNewImageMessage] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // const [audio, setAudio] = useState(null);
    // const [transcription, setTranscription] = useState('');

    const dispatch = useDispatch();

    const infoMember = useSelector(btnClickGetIdConversationSelector);
    const infoDoctor = useSelector(getDoctorLoginFilter);
    // const checkLeavedRoom = useSelector(btnClickGetUsernameLeavedRoomSelector);

    const scrollMessage = useRef();
    const focusInputMessage = useRef();

    // console.log('checkLeavedRoom', checkLeavedRoom);
    console.log('infoMember ->', infoMember);
    // console.log('messages ->', messages);
    // console.log('infoDoctor ->', infoDoctor);
    // console.log('conversation ->', conversation);
    // console.log('new img', newImageMessage);
    // console.log('recordConversation ->', recordConversation);
    // console.log('onlineUsers ->', onlineUsers);

    useEffect(() => {
        socket.on('user_leave_room_call_success', ({ username, roomId }) => {
            console.log('user_leave_room_call_success ->', username, roomId);
            dispatch(callSlice.actions.arrivalUsername(username));
        });
    }, []);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversation); // obj
        socket.emit('add_user', infoDoctor._id);

        socket.on('get_users', (users) => {
            // console.log('USER - ONLINE -', users);
            setOnlineUsers(users.filter((_user) => _user.userId === conversation.member._id));
        });

        // joined_room
        socket.on('joined_room', (conversationId) => {
            // console.log('[conversation - id] ->', conversationId);
        });
    }, [conversation, infoDoctor._id]);

    // socket when send message
    useEffect(() => {
        socket.on('receiver_message', ({ message }) => {
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
                    image: newImageMessage,
                }),
            );
            setValue('');
            setNewImageMessage([]);
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

    // get info user
    const handleCallGetInfoUser = () => {
        socket.emit('call_id_room_to_user', { conversation, infoDoctor });
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

        console.log('recordedBlob is: ', recordedBlob);
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

    // scroll message
    useEffect(() => {
        conversation && messages && scrollMessage.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation, messages, scrollMessage]);

    return (
        <>
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

                        {/* icon call video onClick={handleCallJoined} */}
                        <button className="icon-call-video-btn">
                            <Link
                                to={`${endPoints.meetingRoom}/${conversation._id}/${infoDoctor.person.username}`}
                                target="_blank"
                            >
                                <VideoCameraAddOutlined className="icon-call-video" onClick={handleCallGetInfoUser} />
                            </Link>
                        </button>
                    </div>

                    {/* Render messages */}
                    <div className="message-body">
                        <MessageItem messages={messages} infoUser={infoUser} scrollMessage={scrollMessage} />
                    </div>
                </div>

                {/* Input */}
                <div className="message-footer">
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
                    <input
                        type="text"
                        ref={focusInputMessage}
                        value={value}
                        onChange={(e) => handleChangeInput(e)}
                        onKeyDown={handleSendMessage}
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

                    <div className="container-emoji-picker">
                        <div className="preview-images">
                            {/* render preview images  */}
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
                                <AudioOutlined className="audio-un-mute-message" onClick={handleStopRecording} />
                            </Popover>
                        ) : (
                            <>
                                <Tooltip title="Nhận diện bằng giọng nói">
                                    <AudioMutedOutlined className="audio-mute-message" onClick={handleStartRecording} />
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

                        {/* Preview Emoji */}
                        {previewEmoji ? (
                            <>
                                <EmojiPicker defaultSkinTone={SkinTones} onEmojiClick={handleEmojiClicked} />
                                <CloseOutlined className="emoji-picker-close-btn" onClick={handleClosePreviewEmoji} />
                            </>
                        ) : (
                            <SmileOutlined className="emoji-picker-open-btn" onClick={handlePreviewEmoji} />
                        )}
                    </div>
                </div>
            </div>

            {/* {checkLeavedRoom !== null ? <ContentAfterExaminated recordConversation={recordConversation} /> : null} */}
        </>
    );
}

export default memo(Message);
