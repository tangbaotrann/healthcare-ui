// lib
import { configureStore } from '@reduxjs/toolkit';

// me
import userSlice from './features/user/userSlice';

const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
    },
});

export default store;
