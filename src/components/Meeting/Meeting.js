// lib
import { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// me
import './Meeting.css';
import TitleName from '../TitleName';
import { endPoints } from '~/routers';
import MeetScreen from './MeetScreen';
import socket from '~/utils/socket';

const { Paragraph } = Typography;

function Meeting() {
    const [roomCodeWithInfoMember, setRoomCodeWithInfoMember] = useState('');
    const { roomId, username } = useParams();

    const navigate = useNavigate();

    // console.log('roomId meeting', roomId);
    // console.log('infoMember params ->', infoMember);
    // console.log('getIdDoctor ->', getIdDoctor);

    // handle submit
    const handleSubmitForm = (values) => {
        const { room_id } = values;
        setRoomCodeWithInfoMember(room_id);
        navigate(`${endPoints.meetingRoom}/${room_id}/${username}`);

        // socket call id room id to user
        socket.emit('call_id_room_to_user', { roomId: roomId });
    };

    return (
        <div className="meeting-wrapper">
            {roomCodeWithInfoMember ? (
                <MeetScreen />
            ) : (
                <div className="meeting-container">
                    <TitleName>Meeting</TitleName>

                    {/* Form */}
                    <Form
                        onFinish={handleSubmitForm}
                        onFinishFailed={(error) => {
                            console.log({ error });
                        }}
                        fields={[
                            {
                                name: ['room_id'],
                                value: roomId,
                            },
                        ]}
                    >
                        {/* id room */}
                        <Form.Item
                            name="room_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'B???n c???n ph???i nh???p m?? ph??ng.',
                                },
                            ]}
                            hasFeedback
                        >
                            <div className="meeting-generator-id-room">
                                <Input
                                    placeholder="Sao ch??p v?? d??n m?? ph??ng v??o..."
                                    defaultValue={roomId}
                                    style={{ width: '90%' }}
                                />
                                <Paragraph
                                    copyable={{
                                        tooltips: ['Sao ch??p', 'B???n ???? sao ch??p'],
                                        text: roomId,
                                    }}
                                    className="meeting-copy-icon"
                                ></Paragraph>
                            </div>
                        </Form.Item>

                        {/* Button */}
                        <Button className="meeting-join-btn" block htmlType="submit">
                            Tham gia ngay
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default Meeting;
