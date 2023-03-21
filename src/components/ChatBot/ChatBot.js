// lib
import { useState, useEffect, useRef } from 'react';

// me
import './ChatBot.css';
import MesageItemChatBot from './MesageItemChatBot';

function ChatBot() {
    const [value, setValue] = useState('');
    const [chatLog, setChatLog] = useState([
        {
            sender: 'gpt',
            message:
                'Chào mừng bạn đến với T&T Healthcare - Hệ Thống Chăm Sóc Sức Khoẻ Dành Cho Người Dùng. Hiện T&T Healthcare có thể hỗ trợ gì cho bạn ạ?',
        },
    ]);
    const [typing, setTyping] = useState(false);

    const scrollChat = useRef();

    // handle change input
    const handleChangeInput = (e) => {
        const message = e.target.value;

        setValue(message);
    };

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
                // console.log('data', data);
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

    return (
        <div className="wrapper-chatbot">
            <div className="content-chatbot">
                {/* message */}
                <div className="wrapper-chatbot-message">
                    {chatLog.map((message, index) => {
                        return (
                            <div key={index} ref={scrollChat}>
                                <MesageItemChatBot message={message} />
                            </div>
                        );
                    })}
                </div>

                {/* Input */}
                <div className="wrapper-chat-bot-footer">
                    <form onSubmit={handleSubmitForm}>
                        {typing ? (
                            <div className="loading-listen-message-inner">
                                <span className="loading-listen-message-chat-bot">Đang trả lời</span>
                            </div>
                        ) : null}

                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChangeInput(e)}
                            className="input-message-text-chat-bot"
                            rows="1"
                            placeholder="Nhập tin nhắn..."
                            spellCheck="false"
                        />
                        {value && <button className="btn-submit-footer">GỬI</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
