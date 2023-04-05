// lib
import axios from 'axios';
import socket from '~/utils/socket';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// get all schedule detail by id doctor (3.)
export const fetchApiScheduleDetailByIdDoctor = createAsyncThunk(
    'patient/fetchApiScheduleDetailByIdDoctor',
    async (getIdDoctor) => {
        console.log('get id', getIdDoctor);
        if (getIdDoctor) {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/patient-list/${getIdDoctor}`,
                );
                console.log('res all schedule detail ->', res.data.data);

                return res.data.data;
            } catch (err) {
                console.log({ err });
            }
        }
    },
);

// get all schedule medical appointment (5. Lấy danh sách lịch khám hẹn khám của bác sĩ)
export const fetchApiScheduleMedicalAppointment = createAsyncThunk(
    'patient/fetchApiScheduleMedicalAppointment',
    async (getIdDoctor) => {
        console.log('get ->', getIdDoctor);
        if (getIdDoctor) {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/schedule-list/${getIdDoctor}`,
                );
                console.log('res schedule-medical-appointment -> ', res.data.data);

                return res.data.data;
            } catch (err) {
                console.log({ err });
            }
        }
    },
);

// fetch api confirm (2 Xác nhận khám bệnh)
export const fetchApiConfirmScheduleMedical = createAsyncThunk(
    'patient/fetchApiConfirmScheduleMedical',
    async (idSchedule) => {
        // console.log('idSchedule ->', idSchedule);
        try {
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            // console.log('token', getToken);

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

            // console.log('res confirm ->', res.data.data);

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

            // console.log('res del ->', res.data);

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

        // console.log('res remind ->', res.data);

        return res.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api stop examinated for patient
export const fetchApiStopExaminatedByPatientId = createAsyncThunk(
    'patient/fetchApiStopExaminatedByPatientId',
    async (values) => {
        try {
            const { doctor_id, patient_id, work_type } = values;
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            const res = await axios.put(
                `${process.env.REACT_APP_BASE_URL}doctors/cancel/patient/${patient_id}`,
                {
                    doctor_id: doctor_id,
                    work_type: work_type,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );

            console.log('res stop examinated ->', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api response content after examination
export const fetchApiResponseContentAfterExamiation = createAsyncThunk(
    'patient/fetchApiResponseContentAfterExamiation',
    async ({ values, scheduleDetailId }) => {
        try {
            console.log('values', values);
            console.log('scheduleDetailId', scheduleDetailId);

            const { result_exam, anamnesis } = values;
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            const res = await axios.put(
                `${process.env.REACT_APP_BASE_URL}schedule-details/${scheduleDetailId}`,
                {
                    result_exam: result_exam,
                    anamnesis: anamnesis,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );

            console.log('res examination', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// fetch api result heath
export const fetchApiResultHeathByIdPatient = createAsyncThunk(
    'patient/fetchApiResultHeathByIdPatient',
    async (idPatient) => {
        console.log(idPatient);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}schedule-details/patient/${idPatient}/results`,
            );

            console.log('res result health', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// Đăng ký lịch khám của bệnh nhân
export const fetchApiRegisterScheduleAppointmentOfPatient = createAsyncThunk(
    'patient/fetchApiRegisterScheduleAppointmentOfPatient',
    async (values) => {
        try {
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));
            const { content_exam, schedule, day_exam } = values;

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}schedule-details`,
                {
                    content_exam: content_exam,
                    schedule: schedule,
                    day_exam: day_exam,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${getToken}`,
                        ContentType: 'application/json',
                    },
                },
            );
            console.log('res register schedule appointment ->', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
            const message = await err.response.data;
            return message;
        }
    },
);

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        data: [],
        scheduleMedicalAppointment: [],
        // confirmScheduleMedical: [],
        deleteScheduleMedical: [],
        resultHealthMessage: [],
        btnOptionSelectedMeeting: null,
        isLoading: false,
        patientRegisterSchedule: [],
    },
    reducers: {
        arrivalFilterMeeting: (state, action) => {
            state.btnOptionSelectedMeeting = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiScheduleDetailByIdDoctor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiScheduleDetailByIdDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiScheduleMedicalAppointment.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiScheduleMedicalAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.scheduleMedicalAppointment = action.payload;
            })
            .addCase(fetchApiConfirmScheduleMedical.fulfilled, (state, action) => {
                const schedule = action.payload;

                // console.log('schedule slice ->', schedule);

                const spliceSchedule = state.scheduleMedicalAppointment.findIndex(
                    (_schedule) => _schedule._id === schedule.schedule_detail._id,
                );
                const updateSchedule = state.scheduleMedicalAppointment.find(
                    (_schedule) => _schedule._id === schedule.schedule_detail._id,
                );

                // cut
                if (spliceSchedule > -1) {
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
            })
            .addCase(fetchApiDeleteScheduleMedical.fulfilled, (state, action) => {
                const schedule = action.payload;

                // console.log('schedule del slice ->', schedule);

                const spliceSchedule = state.scheduleMedicalAppointment.findIndex(
                    (_schedule) => _schedule._id === schedule.schedule_detail_id,
                );

                // cut
                if (spliceSchedule > -1) {
                    state.scheduleMedicalAppointment.splice(spliceSchedule, 1);
                }

                state.deleteScheduleMedical = action.payload;

                // socket
                socket.emit('notification_confirm_cancel_schedule', {
                    data: action.payload.data,
                });
            })
            .addCase(fetchApiRemindPatient.fulfilled, (state, action) => {
                // socket
                socket.emit('notification_doctor_remind', {
                    data: action.payload.data,
                });
            })
            .addCase(fetchApiResultHeathByIdPatient.fulfilled, (state, action) => {
                state.resultHealthMessage = action.payload;
            })
            .addCase(fetchApiRegisterScheduleAppointmentOfPatient.fulfilled, (state, action) => {
                state.patientRegisterSchedule = action.payload;
            });
    },
});

export default patientSlice;
