// lib
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// get all schedule detail by id doctor
export const fetchApiScheduleDetailByIdDoctor = createAsyncThunk(
    'patient/fetchApiScheduleDetailByIdDoctor',
    async (getIdDoctor) => {
        // console.log('get id', getIdDoctor);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/patient-list/${getIdDoctor}`,
            );
            console.log('res schedule detail', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// get all schedule medical appointment
export const fetchApiScheduleMedicalAppointment = createAsyncThunk(
    'patient/fetchApiScheduleMedicalAppointment',
    async (getIdDoctor) => {
        console.log('get ->', getIdDoctor);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/schedule-list/${getIdDoctor}`,
            );
            console.log('res -> ', res.data.data);

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
        scheduleMedicalAppointment: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiScheduleDetailByIdDoctor.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(fetchApiScheduleMedicalAppointment.fulfilled, (state, action) => {
            state.scheduleMedicalAppointment = action.payload;
        });
    },
});

export default patientSlice;
