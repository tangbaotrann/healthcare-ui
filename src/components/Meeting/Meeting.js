// lib
import { useParams } from 'react-router-dom';

// me
import './Meeting.css';
import MeetScreen from './MeetScreen';

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

    return <div className="meeting-wrapper">{roomId && <MeetScreen />}</div>;
}

export default Meeting;
