// lib
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// me
import './MessageItem.css';
import { logo } from '~/asset/images';
import { isLoadingMessagesSelector } from '~/redux/selector';

import 'moment/locale/vi'; // without this line it didn't work
moment.locale('vi');

function MessageItem({ messages, infoUser, scrollMessage }) {
    const isLoadingMessages = useSelector(isLoadingMessagesSelector);
    // const isLoadingWhenSended = useSelector(isLoadingWhenSendMessageSelector);

    // console.log('infoUser ->', infoUser);
    // console.log('messages ->', messages);
    // console.log('isLoadingWhenSended ->', isLoadingWhenSended);

    return (
        <>
            {isLoadingMessages ? (
                <p className="display-loading-icon">
                    <LoadingOutlined className="loading-messages" />
                </p>
            ) : (
                messages.map((message) => {
                    return (
                        <div
                            className={`message-item ${
                                infoUser.doctor._id === message.senderId
                                    ? 'message-item-bg-own'
                                    : 'message-item-bg-user'
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
                })
            )}
        </>
    );
}

export default MessageItem;
