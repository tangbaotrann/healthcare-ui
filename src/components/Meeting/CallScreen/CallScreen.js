// lib
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import { useParams } from 'react-router-dom';

// me
import './CallScreen.css';
import { Button } from 'antd';
import { btnClickGetUserIdSelector } from '~/redux/selector';

function CallScreen({ infoUser }) {
    const [valueInput, setValueInput] = useState('');
    const [token, setToken] = useState(null);

    const userId = useSelector(btnClickGetUserIdSelector);

    // const { roomId } = useParams();

    // console.log('roomId', roomId);
    // console.log('infoUser', infoUser);
    console.log('userId', userId);

    useEffect(() => {
        const appID = 1659484907;
        const serverSecret = process.env.REACT_APP_SERVER_SECRET;
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userId, 'BOT');
        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        setToken(TOKEN);
        zp.addPlugins({ ZIM });
    }, [userId]);

    // // const myMeeting = async (element) => {
    // //     const appID = 1659484907;
    // //     const serverSecret = process.env.REACT_APP_SERVER_SECRET;
    // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    // //         appID,
    // //         serverSecret,
    // //         roomId,
    // //         Date.now().toString(),
    // //         `${infoUser.doctor.person ? infoUser.doctor.person.username : 'BOT'}`,
    // //     );

    // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

    // //     zp.joinRoom({
    // //         container: element,
    // //         scenario: {
    // //             mode: ZegoUIKitPrebuilt.VideoConference,
    // //         },
    // //     });
    // // };

    const handleInvite = () => {
        const zp = ZegoUIKitPrebuilt.create(token);

        zp.sendCallInvitation({
            callees: [{ userID: userId, userName: `user-${userId}` }],
            callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
            timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
        })
            .then((res) => res.json())
            .then((res) => {
                console.warn(res);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    return (
        // <div className="room-wrapper">
        //     {/* <div ref={myMeeting} className="room-container" /> */}
        // </div>
        // onClick={handleInvite}
        <div className="confirm-called">
            <Button className="confirm-called-btn" type="primary" onClick={handleInvite}>
                Gọi ngay
            </Button>
        </div>
    );
}

export default CallScreen;
