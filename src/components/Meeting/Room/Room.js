// lib
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

// me
import './Room.css';

function Room({ infoUser }) {
    const { roomId } = useParams();

    // console.log('roomId', roomId);
    // console.log('infoUser', infoUser);

    const myMeeting = async (element) => {
        const appID = 1659484907;
        const serverSecret = process.env.REACT_APP_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            `${infoUser.doctor.person ? infoUser.doctor.person.username : 'BOT'}`,
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return (
        <div className="room-wrapper">
            <div ref={myMeeting} className="room-container" />
        </div>
    );
}

export default Room;
