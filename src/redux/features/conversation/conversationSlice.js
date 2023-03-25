import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all conversation
export const fetchApiConversations = createAsyncThunk('conversation/fetchApiConversations', async (idDoctor) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/doctor/${idDoctor}`);
        console.log('res conversation', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        data: [],
        btnClickGetIdConversation: null,
        isLoading: false,
    },
    reducers: {
        arrivalIdConversation: (state, action) => {
            state.btnClickGetIdConversation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiConversations.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiConversations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
    },
});

export default conversationSlice;
