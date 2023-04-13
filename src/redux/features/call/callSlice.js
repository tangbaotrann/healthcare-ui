// Hide
const { createSlice } = require('@reduxjs/toolkit');

const callSlice = createSlice({
    name: 'call',
    initialState: {
        btnClickCallUserId: null,
        btnClickLeaveRoom: null,
    },
    reducers: {
        arrivalUserId: (state, action) => {
            state.btnClickCallUserId = action.payload;
        },
        arrivalUsername: (state, action) => {
            state.btnClickLeaveRoom = action.payload;
        },
    },
});

export default callSlice;
// Hide
