// lib
import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api bmis by id of patient
export const fetchApiBMIByIdPatient = createAsyncThunk('bmi/fetchApiBMIByIdPatient', async (idPatient) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}bmis/${idPatient}`);
        console.log('res - patient', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const bmisSlice = createSlice({
    name: 'bmi',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiBMIByIdPatient.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default bmisSlice;
