// lib
import { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// me
import './Meeting.css';
import TitleName from '../TitleName';
import { endPoints } from '~/routers';
import Room from './Room';

const { Paragraph } = Typography;

function Meeting({ infoUser }) {
    const [roomCode, setRoomCode] = useState('');
    const unique_id = uuid();

    const navigate = useNavigate();

    // handle submit
    const handleSubmitForm = (values) => {
        const { roomId } = values;
        setRoomCode(roomId);
        navigate(`${endPoints.doctorManagerJoinIdRoom}/${roomId}`);
    };

    return (
        <div className="meeting-wrapper">
            {roomCode ? (
                <Room infoUser={infoUser} />
            ) : (
                <div className="meeting-container">
                    <TitleName>Meeting</TitleName>

                    {/* Form */}
                    <Form
                        onFinish={handleSubmitForm}
                        onFinishFailed={(error) => {
                            console.log({ error });
                        }}
                    >
                        {/* id room */}
                        <Form.Item
                            name="roomId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn cần phải nhập mã phòng.',
                                },
                            ]}
                            hasFeedback
                        >
                            <div className="meeting-generator-id-room">
                                <Input placeholder="Sao chép và dãn mã phòng vào..." style={{ width: '90%' }} />
                                <Paragraph
                                    copyable={{
                                        tooltips: ['Sao chép', 'Bạn đã sao chép'],
                                        text: unique_id,
                                    }}
                                    className="meeting-copy-icon"
                                ></Paragraph>
                            </div>
                        </Form.Item>

                        {/* Button */}
                        <Button className="meeting-join-btn" block htmlType="submit">
                            Tham gia ngày
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default Meeting;
