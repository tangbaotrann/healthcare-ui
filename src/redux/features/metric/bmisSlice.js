// lib
import { message } from 'antd';
import axios from 'axios';
import socket from '~/utils/socket';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api bmis by id of patient
export const fetchApiBMIByIdPatient = createAsyncThunk('bmi/fetchApiBMIByIdPatient', async (idPatient) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}bmis/${idPatient}`);
        // console.log('res - patient', res.data.data.bmis);

        return res.data.data.bmis;
    } catch (err) {
        console.log({ err });
    }
});

// create bmi for patient
export const fetchApiCreateBMIForPatient = createAsyncThunk('bmi/fetchApiCreateBMIForPatient', async (values) => {
    try {
        const { patient, weight, gender, height } = values;
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));

        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}bmis`,
            {
                patient: patient,
                weight: weight,
                gender: gender,
                height: height,
            },
            {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${getToken}`,
                    ContentType: 'application/json',
                },
            },
        );
        message.success('Bạn đã tạo thành công chỉ số BMI.');
        // console.log('res create bmi', res.data.data);

        return res.data.data;
    } catch (err) {
        // const message = err.response.data;
        // return rejectWithValue(message);
        message.error(`${err.response.data.message}`);
        return;
    }
});

// get all bmi for patient
export const fetchApiAllBMIOfPatient = createAsyncThunk('bmi/fetchApiAllBMIOfPatient', async (idPatient) => {
    try {
        if (idPatient) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}bmis/${idPatient}`);
            // console.log('res all bmi', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

// create glycemic for patient
export const fetchApiCreateGlycemicForPatient = createAsyncThunk(
    'bmi/fetchApiCreateGlycemicForPatient',
    async (values) => {
        try {
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}glycemics`,
                {
                    patient: values.patient,
                    metric: values.metric,
                    case: values.case,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );
            message.success('Bạn đã tạo thành công chỉ số đường huyết.');
            // console.log('res create glycemic', res.data.data);

            return res.data.data;
        } catch (err) {
            message.error(`${err.response.data.message}`);
            console.log({ err });
            return;
        }
    },
);

// get all glycemic for patient
export const fetchApiAllGlycemicOfPatient = createAsyncThunk('bmi/fetchApiAllGlycemicOfPatient', async (idPatient) => {
    try {
        if (idPatient) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}glycemics/${idPatient}`);
            // console.log('res all glycemics', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

// create blood for patient
export const fetchApiCreateBloodForPatient = createAsyncThunk(
    'bmi/fetchApiCreateBloodForPatient',
    async (values, { rejectWithValue }) => {
        try {
            const { diastole, patient, systolic } = values;
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}blood-pressures`,
                {
                    diastole: diastole,
                    patient: patient,
                    systolic: systolic,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );
            message.success('Bạn đã tạo thành công chỉ số huyết áp.');
            // console.log('res create blood', res.data.data);

            return res.data.data;
        } catch (err) {
            message.error(`${err.response.data.message}`);
            return;
        }
    },
);

// get all blood for patient
export const fetchApiAllBloodOfPatient = createAsyncThunk('bmi/fetchApiAllBloodOfPatient', async (idPatient) => {
    try {
        if (idPatient) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}blood-pressures/${idPatient}`);
            // console.log('res all glycemics', res.data.data);

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
        btnOptionSelectedBMI: null,
        bmisPatient: [],
        glycemicPatient: [],
        bloodPatient: [],
        messageReject: null,
        messageGlycemicReject: null,
        messageBloodReject: null,
    },
    reducers: {
        arrivalFilterBMI: (state, action) => {
            state.btnOptionSelectedBMI = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiBMIByIdPatient.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchApiCreateBMIForPatient.fulfilled, (state, action) => {
                // console.log('ac.pay create bmi ->', action.payload);

                if (action.payload) {
                    state.bmisPatient.bmis.push(action.payload.doc);

                    socket.emit('notification_register_schedule_from_patient', {
                        data: {
                            notification: action.payload.notifications[0],
                        },
                    });
                }
            })
            .addCase(fetchApiCreateBMIForPatient.rejected, (state, action) => {
                state.messageReject = action.payload;
            })
            .addCase(fetchApiAllBMIOfPatient.fulfilled, (state, action) => {
                state.bmisPatient = action.payload;
            })
            .addCase(fetchApiCreateGlycemicForPatient.fulfilled, (state, action) => {
                // console.log('ac.pay create glycemic', action.payload);

                if (action.payload) {
                    state.glycemicPatient.push(action.payload.doc);

                    socket.emit('notification_register_schedule_from_patient', {
                        data: action.payload,
                    });
                }
            })
            .addCase(fetchApiCreateGlycemicForPatient.rejected, (state, action) => {
                state.messageGlycemicReject = action.payload;
            })
            .addCase(fetchApiAllGlycemicOfPatient.fulfilled, (state, action) => {
                state.glycemicPatient = action.payload;
            })
            .addCase(fetchApiCreateBloodForPatient.fulfilled, (state, action) => {
                // console.log('ac.pay create blood', action.payload);

                if (action.payload) {
                    state.bloodPatient.push(action.payload.doc);

                    socket.emit('notification_register_schedule_from_patient', {
                        data: action.payload,
                    });
                }
            })
            .addCase(fetchApiCreateBloodForPatient.rejected, (state, action) => {
                state.messageBloodReject = action.payload;
            })
            .addCase(fetchApiAllBloodOfPatient.fulfilled, (state, action) => {
                state.bloodPatient = action.payload;
            });
    },
});

export default bmisSlice;
