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

// get all schedule medical appointment (Đổi từ api số 7 sang 11)
export const fetchApiScheduleMedicalAppointment = createAsyncThunk(
    'patient/fetchApiScheduleMedicalAppointment',
    async (getIdDoctor) => {
        console.log('get ->', getIdDoctor);
        if (getIdDoctor) {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/schedule-list-waiting/${getIdDoctor}`,
                );
                console.log('res schedule-medical-appointment -> ', res.data.data);

                return res.data.data;
            } catch (err) {
                console.log({ err });
            }
        }
    },
);

// Lịch đợi khám
export const fetchApiScheduleMedicalAppointmentAwait = createAsyncThunk(
    'patient/fetchApiScheduleMedicalAppointmentAwait',
    async (getIdDoctor) => {
        try {
            if (getIdDoctor) {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/schedule-list/${getIdDoctor}?filter=view_wating_exam`,
                );

                console.log('res lịch chờ khám ->', res.data.data);

                return res.data.data;
            }
        } catch (err) {
            console.log({ err });
        }
    },
);

export const fetchApiScheduleMedicalAppointmentResultExam = createAsyncThunk(
    'patient/fetchApiScheduleMedicalAppointmentResultExam',
    async (getIdDoctor) => {
        try {
            if (getIdDoctor) {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}schedule-details/doctor/schedule-list/${getIdDoctor}?filter=view_result_exam`,
                );

                console.log('res result exam ->', res.data.data);

                return res.data.data;
            }
        } catch (err) {
            console.log({ err });
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

// fetch api delete (3 Xác nhận khám bệnh) - DOCTOR
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

            console.log('res del ->', res.data.data);

            return res.data.data;
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

        console.log('res remind ->', res.data.data);

        return res.data.data;
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
            console.log(err);
            return err.response.data;
            // const message = await err.response.data;
            // return message;
        }
    },
);

// move patient
export const fetchApiMovePatient = createAsyncThunk('user/fetchApiMovePatient', async (values) => {
    try {
        const { doctor_new_id, doctor_old_id, patient_id, reason, work_type } = values;
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));

        const res = await axios.put(
            `${process.env.REACT_APP_BASE_URL}doctors/move/patient/${patient_id}`,
            {
                doctor_new_id: doctor_new_id,
                doctor_old_id: doctor_old_id,
                reason: reason,
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

        console.log('res move patient ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api history
export const fetchApiHistoryExamOfPatient = createAsyncThunk(
    'patient/fetchApiHistoryExamOfPatient',
    async (idPatient) => {
        try {
            if (idPatient) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}patients/${idPatient}/histories`);

                console.log('res history exam ->', res.data.data);

                return res.data.data;
            }
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
        scheduleMedicalAppointmentAwait: [],
        // confirmScheduleMedical: [],
        deleteScheduleMedical: [],
        resultHealthMessage: [],
        btnOptionSelectedMeeting: null,
        isLoading: false,
        patientRegisterSchedule: [],
        resultExam: [],
        historyExam: [],
        btnClickedOpenHistory: null,
    },
    reducers: {
        clickedOpenHistory: (state, action) => {
            state.btnClickedOpenHistory = action.payload;
        },
        arrivalFilterMeeting: (state, action) => {
            state.btnOptionSelectedMeeting = action.payload;
        },
        arrivalConfirmScheduleMedicalAppointment: (state, action) => {
            console.log('ac.pay 346 ->', action.payload);

            const _update = state.scheduleMedicalAppointment.find(
                (_scheduleDetail) => _scheduleDetail._id === action.payload._id,
            );

            if (!_update) {
                state.scheduleMedicalAppointment.push(action.payload);
            }
        },
        arrivalDeleteScheduleMedicalAppointment: (state, action) => {
            console.log('ac.pay 357 ->', action.payload); // -> id

            const _splice = state.scheduleMedicalAppointment.findIndex(
                (_scheduleDetail) => _scheduleDetail._id === action.payload,
            );

            if (_splice > -1) {
                state.scheduleMedicalAppointment.splice(_splice, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiScheduleMedicalAppointmentResultExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiScheduleMedicalAppointmentResultExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resultExam = action.payload;
            })
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
            // lịch chờ khám
            .addCase(fetchApiScheduleMedicalAppointmentAwait.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiScheduleMedicalAppointmentAwait.fulfilled, (state, action) => {
                state.isLoading = false;
                state.scheduleMedicalAppointmentAwait = action.payload;
            })
            .addCase(fetchApiConfirmScheduleMedical.fulfilled, (state, action) => {
                const schedule = action.payload;

                console.log('schedule confirm slice ->', schedule);

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

                console.log('schedule del slice ->', schedule);

                const spliceSchedule = state.scheduleMedicalAppointment.findIndex(
                    (_schedule) => _schedule._id === schedule.schedule_detail_id,
                );

                // cut
                if (spliceSchedule > -1) {
                    state.scheduleMedicalAppointment.splice(spliceSchedule, 1);
                }

                state.deleteScheduleMedical = action.payload;

                // socket (notification_confirm_cancel_schedule)
                socket.emit('notification_confirm_register_schedule', {
                    data: action.payload,
                });
            })
            // Nhắc nhở
            .addCase(fetchApiRemindPatient.fulfilled, (state, action) => {
                // socket (notification_doctor_remind)
                socket.emit('notification_confirm_register_schedule', {
                    data: action.payload,
                });
            })
            .addCase(fetchApiStopExaminatedByPatientId.fulfilled, (state, action) => {
                console.log('stop slice ->', action.payload);
                const slicePatient = state.data.findIndex(({ patient }) => patient._id === action.payload.patient._id);

                if (slicePatient > -1) {
                    state.data.splice(slicePatient, 1);
                }

                socket.emit('notification_confirm_register_schedule', {
                    data: action.payload,
                });
            })
            .addCase(fetchApiResultHeathByIdPatient.fulfilled, (state, action) => {
                state.resultHealthMessage = action.payload;
            })
            .addCase(fetchApiRegisterScheduleAppointmentOfPatient.fulfilled, (state, action) => {
                state.patientRegisterSchedule = action.payload;
            })
            // Chuyển bệnh nhân
            .addCase(fetchApiMovePatient.fulfilled, (state, action) => {
                console.log('Move patient slice ->', action.payload);
                const slicePatient = state.data.findIndex(({ patient }) => patient._id === action.payload.patient._id);

                if (slicePatient > -1) {
                    state.data.splice(slicePatient, 1);
                }

                socket.emit('notification_confirm_register_schedule', {
                    data: action.payload,
                });
            })
            .addCase(fetchApiResponseContentAfterExamiation.fulfilled, (state, action) => {
                console.log('notification_register_schedule_from_patient', action.payload);

                const _splice = state.scheduleMedicalAppointmentAwait.findIndex(
                    (_schedule_detail) => _schedule_detail._id === action.payload.schedule_detail._id,
                );

                if (_splice > -1) {
                    state.scheduleMedicalAppointmentAwait.splice(_splice, 1);
                }

                socket.emit('notification_register_schedule_from_patient', {
                    data: action.payload,
                });
            })
            .addCase(fetchApiHistoryExamOfPatient.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiHistoryExamOfPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.historyExam = action.payload;
            });
    },
});

export default patientSlice;
