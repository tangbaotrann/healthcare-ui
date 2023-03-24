// lib
import moment from 'moment';

// me
import './MessageItem.css';
import { logo } from '~/asset/images';
import { Image } from 'antd';

function MessageItem({ messages, infoUser, scrollMessage }) {
    // console.log('infoUserDoctor ->', infoUser);

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
                            {/* Content + Image */}
                            {message.content && message.images.length > 0 ? (
                                <div className="message-info-text-and-image">
                                    <p className="message-info-content">{message.content}</p>
                                    <div className="display-message-item-image">
                                        {message.images.length === 1 ? (
                                            <Image src={message.images[0]} className="message-item-image" />
                                        ) : message.images.length > 1 ? (
                                            message.images.map((_image, index) => {
                                                return (
                                                    <div className="display-images">
                                                        <Image
                                                            className="message-item-image"
                                                            key={index}
                                                            src={_image}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : null}
                                    </div>
                                </div>
                            ) : message.images.length === 1 ? (
                                <Image src={message.images[0]} className="message-item-image" />
                            ) : message.images.length > 1 ? (
                                // Image
                                <div className="display-message-item-image">
                                    {message.images.map((_image, index) => {
                                        return (
                                            <div className="display-images">
                                                <Image className="message-item-image" key={index} src={_image} />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                // Content
                                <p className="message-info-content">{message.content}</p>
                            )}
                            <p className="message-info-time">{moment(message.createdAt).format('HH:mm')}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default MessageItem;
