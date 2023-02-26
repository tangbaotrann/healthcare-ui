import axios from 'axios';

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

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiMessages.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default messageSlice;
