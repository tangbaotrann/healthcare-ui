import { message } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import socket from '~/utils/socket';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all message by id conversation
export const fetchApiMessages = createAsyncThunk('message/fetchApiMessages', async (idConversation) => {
    // console.log('idConversation ->', idConversation);
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/${idConversation}`);

        // console.log('res messages', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// Form data for message
const createFormData = (message) => {
    const { conversation, senderId, content, image } = message;
    // console.log('img slice ->', image);

    const formData = new FormData();

    formData.append('conversation', conversation);
    formData.append('senderId', senderId);
    formData.append('content', content);

    // Check images
    if (image.length === 1) {
        formData.append('image', image[0].imageFile);
    } else if (image.length > 1) {
        image.forEach((_image) => {
            formData.append('image', _image.imageFile);
        });
    }

    return formData;
};

// fetch api create message
export const fetchApiCreateMessage = createAsyncThunk('message/fetchApiCreateMessage', async (message) => {
    if (message) {
        console.log('message slice ->', message);
        try {
            let formData = createFormData(message);
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}messages`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            // console.log('res create message', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    }
});

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        data: [],
        messageNotAcceptCall: [],
        isLoading: false,
        isLoadingWhenSend: false,
    },
    reducers: {
        arrivalMessageFromSocket: (state, action) => {
            const newMessage = action.payload;
            // console.log('newMessage ->', newMessage);

            const idMessage = state.data.find((_message) => _message._id === newMessage._id);

            if (!idMessage) {
                toast.success(`Bạn có 1 tin nhắn mới.`);
                state.data.push(newMessage);
            } else {
                return;
            }
        },
        arrivalMessageNotAcceptCall: (state, action) => {
            const { small_id, schedule_details_id, patient_id } = action.payload;
            // console.log('small_id ac.pay ->', small_id);
            // console.log('schedule_details_id ac.pay ->', schedule_details_id);
            // console.log('patient_id ac.pay ->', patient_id);

            const _message = state.messageNotAcceptCall.find((_message) => _message === small_id);

            if (!_message) {
                if (schedule_details_id) {
                    toast.error(
                        `${
                            patient_id ? 'Bạn đã từ chối đến cuộc hẹn khám!' : 'Bệnh nhân đã từ chối đến cuộc hẹn khám!'
                        }`,
                    );
                    state.messageNotAcceptCall.push(small_id);
                } else {
                    toast.error('Cuộc gọi đã bị từ chối!');
                    state.messageNotAcceptCall.push(small_id);
                }
            } else {
                return;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiMessages.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiCreateMessage.pending, (state, action) => {
                state.isLoadingWhenSend = true;
            })
            .addCase(fetchApiCreateMessage.fulfilled, (state, action) => {
                state.isLoadingWhenSend = false;
                state.data.push(action.payload);

                // socket
                socket.emit('send_message', {
                    message: action.payload,
                });
            });
    },
});

export default messageSlice;
