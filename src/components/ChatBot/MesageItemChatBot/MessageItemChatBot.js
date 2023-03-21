// me
import { avatarGPT, logo } from '~/asset/images';

// me
import './MessageItemChatBot.css';

function MessageItemChatBot({ message }) {
    console.log('messaeg =>', message);
    return (
        <>
            {/* User: me || gpt */}
            {message.sender && (
                <div className={`container-message-chatbot ${message.sender === 'gpt' && 'chatgpt'}`}>
                    <img
                        className={`avatar ${message.sender === 'gpt' && 'chatgpt'}`}
                        src={`${message.sender === 'gpt' ? avatarGPT.avatarGPT : logo.iconHeart}`}
                        alt="avatar-img"
                    />

                    <div className="message">{message.message}</div>
                </div>
            )}
        </>
    );
}

export default MessageItemChatBot;
