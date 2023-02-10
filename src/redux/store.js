// lib
import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './features/layout/layoutSlice';
import scheduleDoctor from './features/scheduleDoctor/scheduleDoctorSlice';

// me
import userSlice from './features/user/userSlice';

const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        layoutSlice: layoutSlice.reducer,
        scheduleDoctor: scheduleDoctor.reducer,
    },
});

export default store;
