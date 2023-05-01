// lib
import { useParams } from 'react-router-dom';

// me
import './Meeting.css';
import MeetScreen from './MeetScreen';
import { useEffect, useState } from 'react';
import socket from '~/utils/socket';

function Meeting() {
    // const [roomCodeWithInfoMember, setRoomCodeWithInfoMember] = useState('');

    const { roomId } = useParams();

    // console.log('username', username);
    // const checkLeavedRoom = useSelector(btnClickGetUsernameLeavedRoomSelector);

    // console.log('infoUserJoin -->', infoUserJoin);
    // console.log('checkLeavedRoom', checkLeavedRoom);
    // console.log('roomId meeting', roomId);
    // console.log('infoMember params ->', infoMember);
    // console.log('getIdDoctor ->', getIdDoctor);

    return (
        <div className="meeting-wrapper">
            {
                roomId && <MeetScreen />
                // : (
                //     <div className="meeting-container">
                //         <TitleName>Meeting</TitleName>

                //         {/* Form */}
                //         <Form
                //             onFinish={handleSubmitForm}
                //             onFinishFailed={(error) => {
                //                 console.log({ error });
                //             }}
                //             fields={[
                //                 {
                //                     name: ['room_id'],
                //                     value: roomId,
                //                 },
                //             ]}
                //         >
                //             {/* id room */}
                //             <Form.Item
                //                 name="room_id"
                //                 rules={[
                //                     {
                //                         required: true,
                //                         message: 'Bạn cần phải nhập mã phòng.',
                //                     },
                //                 ]}
                //                 hasFeedback
                //             >
                //                 <div className="meeting-generator-id-room">
                //                     <Input
                //                         placeholder="Sao chép và dãn mã phòng vào..."
                //                         defaultValue={roomId}
                //                         style={{ width: '90%' }}
                //                     />
                //                     <Paragraph
                //                         copyable={{
                //                             tooltips: ['Sao chép', 'Bạn đã sao chép'],
                //                             text: roomId,
                //                         }}
                //                         className="meeting-copy-icon"
                //                     ></Paragraph>
                //                 </div>
                //             </Form.Item>

                //             {/* Button */}
                //             <Button className="meeting-join-btn" block htmlType="submit">
                //                 Tham gia ngay
                //             </Button>
                //         </Form>
                //     </div>
                // )
            }
        </div>
    );
}

export default Meeting;
