// Hide
const { createSlice } = require('@reduxjs/toolkit');

const callSlice = createSlice({
    name: 'call',
    initialState: {
        btnClickCallUserId: null,
        btnClickLeaveRoom: null,
        btnClickPatientLeaveRoom: null,
    },
    reducers: {
        arrivalUserId: (state, action) => {
            state.btnClickCallUserId = action.payload;
        },
        arrivalUsername: (state, action) => {
            state.btnClickLeaveRoom = action.payload;
        },
        arrivalPatientUsername: (state, action) => {
            state.btnClickPatientLeaveRoom = action.payload;
        },
    },
});

export default callSlice;
// Hide
