// lib
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api glycemic by id of patient
export const fetchApiGlycemicByIdPatient = createAsyncThunk('bmi/fetchApiGlycemicByIdPatient', async (idPatient) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}glycemics/${idPatient}`);
        console.log('res - patient - glycemic', res.data.data);

        return res.data.data;
        // if (patients.length === 1) {
        //     const idPatient = patients[0];
        //     console.log('idPatient', idPatient);
        //     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}glycemics/${idPatient}`);
        //     console.log('res - patient', res.data.data);

        //     return res.data.data;
        // } else if (patients.length > 1) {
        //     const idPatient = patients.forEach((_idPatient) => _idPatient);
        //     console.log('idPatient', idPatient);

        //     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}glycemics/${idPatient}`);
        //     console.log('res - patient', res.data.data);

        //     return res.data.data;
        // }
    } catch (err) {
        console.log({ err });
    }
});

const glycemicSlice = createSlice({
    name: 'glycemic',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiGlycemicByIdPatient.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default glycemicSlice;
