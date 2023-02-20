// lib
import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api bmis by id of patient
export const fetchApiBMIByIdPatient = createAsyncThunk('bmi/fetchApiBMIByIdPatient', async (patients) => {
    try {
        console.log('patients', patients);
        // if (idPatient) {
        //     console.log('slice id patient', idPatient);
        //     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}bmis/${idPatient}`);
        //     console.log('res - patient', res.data.data);

        //     return res.data.data;
        // }
        if (patients.length === 1) {
            const idPatient = patients[0];
            console.log('idPatient', idPatient);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}bmis/${idPatient}`);
            console.log('res - patient', res.data.data);

            return res.data.data;
        } else if (patients.length > 1) {
            const idPatient = patients.forEach((_idPatient) => _idPatient);
            console.log('idPatient', idPatient);

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}bmis/${idPatient}`);
            console.log('res - patient', res.data.data);

            return res.data.data;
        }
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
