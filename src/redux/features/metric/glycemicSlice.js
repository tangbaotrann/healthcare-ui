// lib
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api glycemic by id of patient
export const fetchApiGlycemicByIdPatient = createAsyncThunk('bmi/fetchApiGlycemicByIdPatient', async (idPatient) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}glycemics/${idPatient}`);
        // console.log('res - patient - glycemic', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const glycemicSlice = createSlice({
    name: 'glycemic',
    initialState: {
        data: [],
        btnOptionSelectedGlycemic: null,
    },
    reducers: {
        arrivalFilterGlycemic: (state, action) => {
            state.btnOptionSelectedGlycemic = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiGlycemicByIdPatient.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default glycemicSlice;
