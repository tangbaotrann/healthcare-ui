// lib
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// me
import './MeetScreen.css';
import callSlice from '~/redux/features/call/callSlice';

function MeetScreen() {
    const { roomId, username } = useParams();

    const dispatch = useDispatch();

    // console.log('roomId', roomId);
    // console.log('username', username);
    // console.log('userId', userId);

    const myMeeting = async (element) => {
        const appID = 1659484907;
        const serverSecret = process.env.REACT_APP_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            `${username ? username : 'BOT'}`,
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
                dispatch(callSlice.actions.arrivalUsername(username));
            },
            onLeaveRoom: () => {
                console.log('users leaved ->', username);
                dispatch(callSlice.actions.arrivalUsername(username));
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
