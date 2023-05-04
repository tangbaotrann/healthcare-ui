import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all conversation
export const fetchApiConversations = createAsyncThunk('conversation/fetchApiConversations', async (idDoctor) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/doctor/${idDoctor}`);
        // console.log('res conversation', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api all conversation of patient
export const fetchApiConversationsOfPatient = createAsyncThunk(
    'conversation/fetchApiConversationsOfPatient',
    async (idPatient) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/patient/${idPatient}`);
            // console.log('res conversation', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        data: [],
        conversationsOfPatient: [],
        btnClickGetIdConversation: null,
        btnClickedRecordGetIdConversation: null,
        isLoading: false,
    },
    reducers: {
        arrivalIdConversation: (state, action) => {
            state.btnClickGetIdConversation = action.payload;
        },
        arrivalFromRecordIdConversation: (state, action) => {
            state.btnClickedRecordGetIdConversation = action.payload;
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
            })
            .addCase(fetchApiConversationsOfPatient.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiConversationsOfPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversationsOfPatient = action.payload;
            });
    },
});

export default conversationSlice;
