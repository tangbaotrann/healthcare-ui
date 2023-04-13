// lib
import { configureStore } from '@reduxjs/toolkit';
import callSlice from './features/call/callSlice';
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
import bloodPressureSlice from './features/metric/bloodPressure';
import blogSlice from './features/blog/blogSlice';
import commentSlice from './features/comment/commentSlice';

const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        layoutSlice: layoutSlice.reducer,
        scheduleDoctor: scheduleDoctor.reducer,
        patientSlice: patientSlice.reducer,
        bmisSlice: bmisSlice.reducer,
        glycemicSlice: glycemicSlice.reducer,
        bloodPressureSlice: bloodPressureSlice.reducer,
        notificationSlice: notificationSlice.reducer,
        conversationSlice: conversationSlice.reducer,
        messageSlice: messageSlice.reducer,
        callSlice: callSlice.reducer,
        blogSlice: blogSlice.reducer,
        commentSlice: commentSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
