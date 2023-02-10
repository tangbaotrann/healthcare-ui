const { createSlice } = require('@reduxjs/toolkit');

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        btnClickChangeLayout: null,
    },
    reducers: {
        btnSelectMenuChangeLayout: (state, action) => {
            state.btnClickChangeLayout = action.payload;
        },
    },
});

export default layoutSlice;
