// lib
import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './features/layout/layoutSlice';
import bmisSlice from './features/metric/bmisSlice';
import glycemicSlice from './features/metric/glycemicSlice';
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
    },
});

export default store;
