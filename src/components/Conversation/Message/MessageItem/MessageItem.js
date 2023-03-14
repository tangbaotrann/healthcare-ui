// lib
import moment from 'moment';

// me
import './MessageItem.css';
import { logo } from '~/asset/images';

function MessageItem({ messages, infoUser, scrollMessage }) {
    console.log('infoUserDoctor ->', infoUser);

    return (
        <>
            {messages.map((message) => {
                return (
                    <div
                        className={`message-item ${
                            infoUser.doctor._id === message.senderId ? 'message-item-bg-own' : 'message-item-bg-user'
                        }`}
                        key={message._id}
                        ref={scrollMessage}
                    >
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
        </>
    );
}

export default MessageItem;
