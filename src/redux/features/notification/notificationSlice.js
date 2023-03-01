import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all notification by id doctor
export const fetchApiNotificationByDoctorId = createAsyncThunk(
    'notification/fetchApiNotificationByDoctorId',
    async (idDoctor) => {
        // console.log('id doctor', idDoctor);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}notifications/${idDoctor}`);
            console.log('res', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api update field seen notification
export const fetchApiUpdateSeenNotification = createAsyncThunk(
    'notification/fetchApiUpdateSeenNotification',
    async (record) => {
        try {
            const { _id } = record;

            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}notifications`, {
                ids: [_id],
            });
            console.log('res update seen', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
        seen: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiNotificationByDoctorId.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(fetchApiUpdateSeenNotification.fulfilled, (state, action) => {
            const hasSeen = action.payload;
            // console.log('hasSeen ->', action.payload);

            const spliceHasSeen = state.data.findIndex((_hasSeen) => _hasSeen._id === hasSeen[0]._id);
            const allHasSeen = state.data.find((_hasSeen) => _hasSeen._id === hasSeen[0]._id);

            // console.log('allHasSeen ->', allHasSeen);

            if (spliceHasSeen) {
                state.data.splice(spliceHasSeen, 1);
            }

            if (allHasSeen) {
                state.data.push(hasSeen[0]);
            }
        });
    },
});

export default notificationSlice;