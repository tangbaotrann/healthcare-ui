// lib
import { useState, useEffect, useRef } from 'react';

// me
import './ChatBot.css';
import { AudioMutedOutlined, AudioOutlined, CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { logo } from '~/asset/images';
import MessageItemChatBot from './MesageItemChatBot';
import { Popover, Tooltip } from 'antd';
import { ReactMic } from 'react-mic';
import axios from 'axios';

function ChatBot({ patients }) {
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState('');
    const [chatLog, setChatLog] = useState([
        {
            sender: 'gpt',
            message:
                'Chào mừng bạn đến với T&T Healthcare - Hệ Thống Chăm Sóc Sức Khoẻ Dành Cho Người Dùng. Hiện T&T Healthcare có thể hỗ trợ gì cho bạn ạ?',
        },
    ]);
    const [typing, setTyping] = useState(false);
    const [muteRecording, setMuteRecording] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);

    const scrollChat = useRef();
    const focusInputMessage = useRef();

    // handle submit form
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
        }

        const newMessage = {
            message: value,
            sender: 'user',
            direction: 'outgoing',
        };

        const newMessages = [...chatLog, newMessage];

        // update message
        setChatLog(newMessages);

        setTyping(true);

        // AI api
        await processMessageToChatGPT(newMessages);

        setValue('');
    };

    // handle AI api
    const processMessageToChatGPT = async (chatMessages) => {
        const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
        let apiMessages = chatMessages.map((_message) => {
            let role = '';

            if (_message.sender === 'gpt') {
                role = 'assistant';
            } else {
                role = 'user';
            }

            return { role: role, content: _message.message };
        });

        const systemMessage = {
            role: 'system',
            content: 'Explain all accepts...',
        };

        const apiReqBody = {
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...apiMessages],
        };

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiReqBody),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log('data', data);
                setChatLog([
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: 'gpt',
                    },
                ]);
                setTyping(false);
            });
    };

    // handle scroll chat
    useEffect(() => {
        chatLog && scrollChat.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatLog]);

    // handle change input
    const handleChangeInput = (e) => {
        const message = e.target.value;

        setValue(message);
    };

    const handleOpenModalChatbot = () => {
        setOpenModal(true);
    };

    const handleHideModalChatbot = () => {
        setOpenModal(false);
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

    return (
        <div className="home-sp-chatbot-container">
            {openModal ? (
                <CloseOutlined onClick={handleHideModalChatbot} className="home-sp-chatbot-icon" />
            ) : (
                <CommentOutlined onClick={handleOpenModalChatbot} className="home-sp-chatbot-icon" />
            )}

            {openModal && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <img className="chatbot-header-avatar" src={logo.iconChatbotLogo} alt="iconChatbotLogo" />
                        <span className="chatbot-header-username">T&T HEALTHCARE</span>
                    </div>

                    {/* Chat log */}
                    <div className="chatbot-body-fix-scroll">
                        {chatLog.map((message, index) => {
                            return (
                                <div key={index} ref={scrollChat}>
                                    <MessageItemChatBot message={message} patients={patients} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmitForm}>
                        {typing ? (
                            <div className="loading-listen-message-inner">
                                <span className="loading-listen-message-chat-bot">Đang trả lời</span>
                            </div>
                        ) : null}

                        {isLoadingSpeech && (
                            <div className="loading-listen-message-inner">
                                <span className="loading-listen-message-chat-bot">Đang xử lý</span>
                            </div>
                        )}

                        <input
                            ref={focusInputMessage}
                            type="text"
                            value={value}
                            onChange={(e) => handleChangeInput(e)}
                            className="chatbot-footer-input"
                            rows="1"
                            placeholder="Nhập tin nhắn..."
                            spellCheck="false"
                        />
                        {value && <button className="chatbot-footer-btn-submit">GỬI</button>}
                    </form>

                    {/* Mic */}
                    <div className="chatbot-speech-to-text-container">
                        {muteRecording ? (
                            <Popover
                                title={() => {
                                    return <p className="loading-listen">Đang nhận diện bằng giọng nói</p>;
                                }}
                                trigger="click"
                                open={openPopover}
                            >
                                <AudioOutlined className="chatbot-audio-un-mute" onClick={handleStopRecording} />
                            </Popover>
                        ) : (
                            <>
                                <Tooltip title="Nhận diện bằng giọng nói">
                                    <AudioMutedOutlined className="chatbot-audio-mute" onClick={handleStartRecording} />
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBot;
