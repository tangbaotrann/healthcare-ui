// Hide
const { createSlice } = require('@reduxjs/toolkit');

const callSlice = createSlice({
    name: 'call',
    initialState: {
        btnClickCallUserId: null,
    },
    reducers: {
        arrivalUserId: (state, action) => {
            state.btnClickCallUserId = action.payload;
        },
    },
});

export default callSlice;
// Hide
