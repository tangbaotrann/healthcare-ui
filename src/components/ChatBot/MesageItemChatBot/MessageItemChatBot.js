// me
import { logo } from '~/asset/images';

// me
import './MessageItemChatBot.css';

function MessageItemChatBot({ message, patients }) {
    // console.log('messaeg =>', message);
    return (
        <>
            {/* User: me || gpt */}
            {message.sender && (
                <div className="wrapper-message-item-chat-bot">
                    <img
                        className={`avatar ${message.sender === 'gpt' && 'chatgpt'}`}
                        src={`${message.sender === 'gpt' ? logo.iconChatbotLogo : patients?.patient?.person?.avatar}`}
                        alt="avatar-img"
                    />
                    <div className={`container-message-chatbot ${message.sender === 'gpt' && 'chatgpt'}`}>
                        <div className="message">{message.message}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MessageItemChatBot;
