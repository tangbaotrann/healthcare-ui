// lib
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// me
import './MeetScreen.css';
import socket from '~/utils/socket';
import parserUTF8Config from '~/utils/parserUTF8Config';
import { fetchApiUpdateIsExam } from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';

function MeetScreen() {
    const { roomId, scheduleDetailId, username } = useParams();

    const dispatch = useDispatch();

    // console.log('roomId', roomId);
    console.log('scheduleDetailId', scheduleDetailId);
    // console.log('username', username.replace(/\s/g, ''));
    // console.log('userId', userId);

    const myMeeting = async (element) => {
        const appID = 1406738560;
        const serverSecret = process.env.REACT_APP_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            `${
                username
                    ? parserUTF8Config(username.toString()).replace(/\s/g, '').replace(/Đ/g, 'D').toString()
                    : 'BOT'
            }`,
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            onJoinRoom: () => {
                // Add your custom logic
                console.log('users joined ->', username);
                dispatch(fetchApiUpdateIsExam(scheduleDetailId));
                console.log('Updated');
                // dispatch(callSlice.actions.arrivalUsername(username));
            },
            onLeaveRoom: () => {
                console.log('users leaved ->', username);
                // dispatch(callSlice.actions.arrivalUsername(username));
                socket.emit('user_leave_room_call', { username, roomId });
            },
        });
    };

    return (
        <div className="room-wrapper">
            <div ref={myMeeting} className="room-container" />
        </div>
    );
}

export default MeetScreen;
