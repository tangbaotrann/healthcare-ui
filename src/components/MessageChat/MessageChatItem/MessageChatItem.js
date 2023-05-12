import { Image } from 'antd';
import moment from 'moment';

import { logo } from '~/asset/images';

function MessageChatItem({ message, patients, scrollMessage }) {
    return (
        <div
            className={`chat-message-item ${
                patients.patient._id === message.senderId ? 'message-item-bg-own' : 'message-item-bg-user'
            }`}
            key={message._id}
            ref={scrollMessage}
        >
            <img
                src={
                    message?.user?.patient?.person
                        ? message?.user?.patient?.person?.avatar
                        : message?.user?.patient?.patient?.person
                        ? message?.user?.patient?.patient?.person?.avatar
                        : logo.iconChatbotLogo
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
                                        <div className="display-images" key={index}>
                                            <Image className="message-item-image" src={_image} />
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
                                <div className="display-images" key={index}>
                                    <Image className="message-item-image" src={_image} />
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
}

export default MessageChatItem;
