const { createSlice } = require('@reduxjs/toolkit');

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        data: null,
    },
    reducers: {
        clickedGetAddress: (state, action) => {
            state.data = action.payload;
        },
    },
});

export default mapSlice;
