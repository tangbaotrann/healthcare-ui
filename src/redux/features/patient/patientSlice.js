// lib
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// get schedule detail by id doctor
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

// get info patient
export const fetchApiGetInfoPatient = createAsyncThunk('patient/fetchApiGetInfoPatient', async (patients) => {
    try {
        // const res = await axios.get(`${process.env.REACT_APP_BASE_URL}patients/${id}`);
        // const patientPromies = patients.map((id) => {
        //     return axios.get(`${process.env.REACT_APP_BASE_URL}patients/${id}`);
        // });

        // const values = await Promise.all(patientPromies);
        // console.log('values ->', values);

        if (patients.length === 1) {
            const idPatient = patients[0];
            // console.log('idPatient', idPatient);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}patients/${idPatient}`);
            // console.log('res - patient', res.data.data);

            return res.data.data;
        } else if (patients.length > 1) {
            const idPatient = patients.forEach((_idPatient) => _idPatient);
            console.log('idPatient', idPatient);

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}patients/${idPatient}`);
            console.log('res - patient', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        data: [],
        patientInfo: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiScheduleDetailByIdDoctor.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(fetchApiGetInfoPatient.fulfilled, (state, action) => {
            state.patientInfo = action.payload;
        });
    },
});

export default patientSlice;
