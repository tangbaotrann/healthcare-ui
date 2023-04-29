import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_BASE_URL_FROM_SOCKET_SERVER}`, {
    withCredentials: true,
    transports: ['websocket', 'polling', 'flashsocket'],
});

export default socket;
