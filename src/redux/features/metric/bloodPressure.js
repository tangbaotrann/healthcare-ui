import axios from 'axios';

// lib
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api blood pressure
export const fetchApiBloodPressureByIdPatient = createAsyncThunk(
    'bloodPressure/fetchApiBloodPressureByIdPatient',
    async (idPatient) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}blood-pressures/${idPatient}`);

            // console.log('res blood pressure', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

const bloodPressureSlice = createSlice({
    name: 'bloodPressure',
    initialState: {
        data: [],
        btnOptionSelectedBloodPressure: null,
    },
    reducers: {
        arrivalFilterBloodPressure: (state, action) => {
            state.btnOptionSelectedBloodPressure = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiBloodPressureByIdPatient.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default bloodPressureSlice;
