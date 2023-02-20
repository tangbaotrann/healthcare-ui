// lib
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// get schedule detail by id doctor
export const fetchApiScheduleDetailByIdDoctor = createAsyncThunk(
    'patient/fetchApiScheduleDetailByIdDoctor',
    async (getIdDoctor) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}schedule-details/doctor/${getIdDoctor}`);
            console.log('res schedule detail', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiScheduleDetailByIdDoctor.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default patientSlice;
