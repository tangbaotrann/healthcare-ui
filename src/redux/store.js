// lib
import { configureStore } from '@reduxjs/toolkit';
import conversationSlice from './features/conversation/conversationSlice';
import layoutSlice from './features/layout/layoutSlice';
import messageSlice from './features/message/messageSlice';
import bmisSlice from './features/metric/bmisSlice';
import glycemicSlice from './features/metric/glycemicSlice';
import notificationSlice from './features/notification/notificationSlice';
import patientSlice from './features/patient/patientSlice';
import scheduleDoctor from './features/scheduleDoctor/scheduleDoctorSlice';

// me
import userSlice from './features/user/userSlice';

const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        layoutSlice: layoutSlice.reducer,
        scheduleDoctor: scheduleDoctor.reducer,
        patientSlice: patientSlice.reducer,
        bmisSlice: bmisSlice.reducer,
        glycemicSlice: glycemicSlice.reducer,
        notificationSlice: notificationSlice.reducer,
        conversationSlice: conversationSlice.reducer,
        messageSlice: messageSlice.reducer,
    },
});

export default store;
