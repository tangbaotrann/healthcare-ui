import axios from 'axios';
import moment from 'moment';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api all shifts
export const fetchApiAllShiftsDoctor = createAsyncThunk('shifts/fetchApiAllShiftsDoctor', async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}shifts`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api all create days
export const fetchApiAllCreateDaysDoctor = createAsyncThunk('days/fetchApiAllCreateDaysDoctor', async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}days`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api create schedule for doctor
export const fetchApiCreateScheduleDoctor = createAsyncThunk(
    'scheduleDoctor/fetchApiCreateScheduleDoctor',
    async (values) => {
        try {
            const { time_per_conversation, fee, day, time, doctor } = values;
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}schedules`,
                {
                    time_per_conversation: time_per_conversation,
                    fee: fee,
                    day: day,
                    time: time,
                    doctor: doctor,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );
            // console.log('res', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api all schedule
export const fetchApiAllCreateScheduleDoctor = createAsyncThunk(
    'scheduleDoctor/fetchApiAllCreateScheduleDoctor',
    async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}schedules`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('res all schedule ->', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api find schedule by id doctor
export const fetchApiScheduleByIdDoctor = createAsyncThunk(
    'scheduleDoctor/fetchApiScheduleByIdDoctor',
    async (idDoctor) => {
        if (idDoctor) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}schedules/doctor/${idDoctor}`, {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        ContentType: 'application/json',
                    },
                });
                console.log('fetchApiScheduleByIdDoctor ->', res.data.data);

                return res.data.data;
            } catch (err) {
                console.log({ err });
            }
        }
    },
);

export const fetchApiAllScheduleDetails = createAsyncThunk('scheduleDoctor/fetchApiAllScheduleDetails', async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}schedule-details`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                ContentType: 'application/json',
            },
        });
        console.log('res all schedule details ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

export const fetchApiGetAllScheduleDetailOfPatient = createAsyncThunk(
    'scheduleDoctor/fetchApiGetAllScheduleDetailOfPatient',
    async (patient_id) => {
        try {
            if (patient_id) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}schedule-details/patient/${patient_id}`);
                console.log('res =>', res.data.data);

                return res.data.data;
            }
        } catch (err) {
            console.log({ err });
        }
    },
);

const scheduleDoctor = createSlice({
    name: 'scheduleDoctor',
    initialState: {
        data: [],
        days: [],
        shifts: [],
        createSchedule: [],
        idDoctor: [],
        isLoading: false,
        scheduleDetails: [],
        day_of_week: new Date(),
        allScheduleDetailOfPatient: [],
    },
    reducers: {
        btnOptionSelectDayOfWeek: (state, action) => {
            if (action.payload) {
                state.day_of_week = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiAllCreateDaysDoctor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiAllCreateDaysDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.days = action.payload;
            })
            .addCase(fetchApiAllShiftsDoctor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiAllShiftsDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.shifts = action.payload;
            })
            .addCase(fetchApiCreateScheduleDoctor.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(fetchApiAllCreateScheduleDoctor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiAllCreateScheduleDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiScheduleByIdDoctor.fulfilled, (state, action) => {
                state.idDoctor = action.payload;
            })
            .addCase(fetchApiAllScheduleDetails.fulfilled, (state, action) => {
                state.scheduleDetails = action.payload;
            })
            .addCase(fetchApiGetAllScheduleDetailOfPatient.fulfilled, (state, action) => {
                state.allScheduleDetailOfPatient = action.payload;
            });
    },
});

export default scheduleDoctor;
