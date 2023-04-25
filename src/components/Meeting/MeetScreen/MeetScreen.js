// lib
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
// import { decode } from 'as-latin1';

// me
import './MeetScreen.css';
import socket from '~/utils/socket';
import parserUTF8Config from '~/utils/parserUTF8Config';

function MeetScreen() {
    const { roomId, username } = useParams();

    // console.log('roomId', roomId);
    console.log('username', username);
    // console.log('userId', userId);

    const myMeeting = async (element) => {
        // let _username = decode(username);
        // console.log('_username', _username);
        const appID = 1406738560;
        const serverSecret = process.env.REACT_APP_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            // parserUTF8Config(username)
            `${username ? parserUTF8Config(username) : 'BOT'}`,
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
