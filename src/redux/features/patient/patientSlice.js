// lib
import axios from 'axios';
import socket from '~/utils/socket';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// get all schedule detail by id doctor (3.)
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

// get all schedule medical appointment (5. Lấy danh sách lịch khám hẹn khám của bác sĩ)
export const fetchApiScheduleMedicalAppointment = createAsyncThunk(
    'patient/fetchApiScheduleMedicalAppointment',
    async (getIdDoctor) => {
        // console.log('get ->', getIdDoctor);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/schedule-list/${getIdDoctor}`,
            );
            console.log('res schedule-medical-appointment -> ', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api confirm (2 Xác nhận khám bệnh)
export const fetchApiConfirmScheduleMedical = createAsyncThunk(
    'patient/fetchApiConfirmScheduleMedical',
    async (idSchedule) => {
        console.log('idSchedule ->', idSchedule);
        try {
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            console.log('token', getToken);

            const res = await axios.put(
                `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/accept/${idSchedule}`,
                null,
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );

            console.log('res confirm ->', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api delete (3 Xác nhận khám bệnh)
export const fetchApiDeleteScheduleMedical = createAsyncThunk(
    'patient/fetchApiDeleteScheduleMedical',
    async (values) => {
        // console.log('idSchedule ->', idSchedule);
        try {
            const { reason } = values;
            const { idDoctor, _id } = values.record;

            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}schedule-details/${_id}`, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    ContentType: 'application/json',
                },
                data: {
                    reason: reason,
                    from: idDoctor,
                },
            });

            console.log('res del ->', res.data);

            return res.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api remind for patient
export const fetchApiRemindPatient = createAsyncThunk('patient/fetchApiRemindPatient', async (values) => {
    try {
        const { content, from, idPatient } = values;
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));

        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}doctors/remind/${idPatient}`,
            {
                content: content,
                from: from,
            },
            {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${getToken}`,
                    ContentType: 'application/json',
                },
            },
        );

        console.log('res remind ->', res.data);

        return res.data;
    } catch (err) {
        console.log({ err });
    }
});

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        data: [],
        scheduleMedicalAppointment: [],
        // confirmScheduleMedical: [],
        deleteScheduleMedical: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiScheduleDetailByIdDoctor.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(fetchApiScheduleMedicalAppointment.fulfilled, (state, action) => {
            state.scheduleMedicalAppointment = action.payload;
        });
        builder.addCase(fetchApiConfirmScheduleMedical.fulfilled, (state, action) => {
            const schedule = action.payload;

            // console.log('schedule slice ->', schedule);

            const spliceSchedule = state.scheduleMedicalAppointment.findIndex(
                (_schedule) => _schedule._id === schedule.schedule_detail._id,
            );
            const updateSchedule = state.scheduleMedicalAppointment.find(
                (_schedule) => _schedule._id === schedule.schedule_detail._id,
            );

            // cut
            if (spliceSchedule) {
                state.scheduleMedicalAppointment.splice(spliceSchedule, 1);
            }

            // updated
            if (updateSchedule) {
                state.scheduleMedicalAppointment.push(schedule.schedule_detail); // -> obj
            }

            // socket
            socket.emit('notification_confirm_register_schedule', {
                data: action.payload,
            });
        });
        builder.addCase(fetchApiDeleteScheduleMedical.fulfilled, (state, action) => {
            const schedule = action.payload;

            // console.log('schedule del slice ->', schedule);

            const spliceSchedule = state.scheduleMedicalAppointment.findIndex(
                (_schedule) => _schedule._id === schedule.schedule_detail_id,
            );

            // cut
            if (spliceSchedule) {
                state.scheduleMedicalAppointment.splice(spliceSchedule, 1);
            }

            state.deleteScheduleMedical = action.payload;

            // socket
            socket.emit('notification_confirm_cancel_schedule', {
                data: action.payload.data,
            });
        });
        builder.addCase(fetchApiRemindPatient.fulfilled, (state, action) => {
            // socket
            socket.emit('notification_doctor_remind', {
                data: action.payload.data,
            });
        });
    },
});

export default patientSlice;
