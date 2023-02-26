// lib
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// me
import { logo } from '~/asset/images';
import { btnClickGetIdConversationSelector } from '~/redux/selector';

function Message({ messages }) {
    const [value, setValue] = useState('');

    const infoMember = useSelector(btnClickGetIdConversationSelector);

    // console.log('infoMember ->', infoMember);
    // console.log('messages ->', messages);

    // handle change input
    const handleChangeInput = (e) => {
        const message = e.target.value;

        setValue(message);
    };

    return (
        <div className="wrapper-message">
            <div className="container-message">
                <div className="message-header">
                    <img src={logo.iconHeart} className="message-header-avt" alt="avt-header" />

                    <div className="message-header-info">
                        <h4>{infoMember.member.username}</h4>
                        <p>Offline</p>
                    </div>
                </div>

                <div className="message-body">
                    {messages.map((message) => {
                        return (
                            <div className="message-item" key={message._id}>
                                <img
                                    src={
                                        message.user.doctor.person ? message.user.doctor.person.avatar : logo.iconHeart
                                    }
                                    className="message-avt"
                                    alt="message-avt"
                                />

                                <div className="message-info">
                                    <p className="message-info-mess">{message.content}</p>
                                    <p className="message-info-time">{moment(message.createdAt).format('HH:mm')}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Input */}
            <div className="message-footer">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChangeInput(e)}
                    className="input-message-text"
                    rows="2"
                    placeholder="Type your message here..."
                    spellCheck="false"
                />
                {value && <button className="btn-submit">GỬI</button>}
            </div>
        </div>
    );
}

export default Message;
