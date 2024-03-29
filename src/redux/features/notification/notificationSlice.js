import axios from 'axios';
import { toast } from 'react-toastify';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all notification by id doctor
export const fetchApiNotificationByDoctorId = createAsyncThunk(
    'notification/fetchApiNotificationByDoctorId',
    async (idDoctor) => {
        // console.log('id doctor', idDoctor);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}notifications/${idDoctor}`);
            // console.log('res', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api all notification by id patient
export const fetchApiNotificationByPatientId = createAsyncThunk(
    'notification/fetchApiNotificationByPatientId',
    async (idPatient) => {
        // console.log('id doctor', idDoctor);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}notifications/${idPatient}`);
            // console.log('res', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api update field seen notification (Doctor)
export const fetchApiUpdateSeenNotification = createAsyncThunk(
    'notification/fetchApiUpdateSeenNotification',
    async (record) => {
        try {
            const { _id } = record;

            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}notifications`, {
                ids: [_id],
            });
            // console.log('res update seen', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);
// fetch api update field seen notification (Patient)
export const fetchApiUpdateSeenNotificationPatient = createAsyncThunk(
    'notification/fetchApiUpdateSeenNotificationPatient',
    async (record) => {
        try {
            const { _id } = record;

            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}notifications`, {
                ids: [_id],
            });
            // console.log('res update seen', res.data.data);

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
        dataPatient: [],
        seen: [], // hide
        notifications: [],
        isLoading: false,
    },
    reducers: {
        notificationRegisterScheduleFromPatientSuccess: (state, action) => {
            const notification = action.payload;
            // console.log('act pay', notification);

            const getNotification = state.data.find((_notification) => _notification._id === notification._id);

            if (!getNotification) {
                toast.success(`${notification.content}`);
                state.data.unshift(notification);
            } else {
                console.log('err notification!');
                return;
            }
        },
        notificationRegisterScheduleFromDoctorSuccess: (state, action) => {
            const notification = action.payload;
            // console.log('act pay', notification);

            const getNotification = state.dataPatient.find((_notification) => _notification._id === notification._id);

            if (!getNotification) {
                toast.success(`${notification.content}`);
                state.dataPatient.unshift(notification);
            } else {
                // console.log('err notification!');
                return;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiNotificationByDoctorId.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiNotificationByDoctorId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiNotificationByPatientId.fulfilled, (state, action) => {
                state.dataPatient = action.payload;
            })
            .addCase(fetchApiUpdateSeenNotification.fulfilled, (state, action) => {
                // state.seen = action.payload;

                const hasSeen = action.payload;

                const spliceHasSeen = state.data.findIndex((_hasSeen) => _hasSeen._id === hasSeen[0]._id);
                const allHasSeen = state.data.find((_hasSeen) => _hasSeen._id === hasSeen[0]._id);

                if (spliceHasSeen > -1) {
                    state.data.splice(spliceHasSeen, 1);
                }

                if (allHasSeen) {
                    state.data.push(hasSeen[0]);
                }
            })
            .addCase(fetchApiUpdateSeenNotificationPatient.fulfilled, (state, action) => {
                // state.seen = action.payload;

                const hasSeen = action.payload;

                const spliceHasSeen = state.dataPatient.findIndex((_hasSeen) => _hasSeen._id === hasSeen[0]._id);
                const allHasSeen = state.dataPatient.find((_hasSeen) => _hasSeen._id === hasSeen[0]._id);

                if (spliceHasSeen > -1) {
                    state.dataPatient.splice(spliceHasSeen, 1);
                }

                if (allHasSeen) {
                    state.dataPatient.push(hasSeen[0]);
                }
            });
    },
});

export default notificationSlice;
