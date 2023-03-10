const { createSlice } = require('@reduxjs/toolkit');

const callSlice = createSlice({
    name: 'call',
    initialState: {
        btnClickCallGetUserId: null,
    },
    reducers: {
        arrivalUserId: (state, action) => {
            state.btnClickCallGetUserId = action.payload;
        },
    },
});

export default callSlice;
