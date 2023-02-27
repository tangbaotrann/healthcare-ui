import axios from 'axios';
import socket from '~/utils/socket';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all message by id conversation
export const fetchApiMessages = createAsyncThunk('message/fetchApiMessages', async (idConversation) => {
    console.log('idConversation ->', idConversation);
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/${idConversation}`);

        console.log('res messages', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api create message
export const fetchApiCreateMessage = createAsyncThunk('message/fetchApiCreateMessage', async (message) => {
    try {
        const { conversation, senderId, content } = message;
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}messages`, {
            conversation: conversation,
            senderId: senderId,
            content: content,
        });

        console.log('res create message', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        data: [],
    },
    reducers: {
        arrivalMessageFromSocket: (state, action) => {
            const newMessage = action.payload;
            // console.log('newMessage ->', newMessage);

            const idMessage = state.data.find((_message) => _message._id === newMessage._id);

            if (!idMessage) {
                state.data.push(newMessage);
            } else {
                return;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiMessages.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(fetchApiCreateMessage.fulfilled, (state, action) => {
            state.data.push(action.payload);

            // socket
            socket.emit('send_message', {
                message: action.payload,
            });
        });
    },
});

export default messageSlice;
