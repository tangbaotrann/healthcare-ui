// lib
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// login
export const fetchApiLogin = createAsyncThunk('user/fetchApiLogin', async (values, { rejectWithValue }) => {
    try {
        const { phone_number, password } = values;

        const formatPhone = phone_number.replace('+84', '0');

        console.log('formatPhone ->', formatPhone);

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
            phone_number: formatPhone, //phone_number,
            password: password,
        });
        console.log('res login', res.data.data);

        localStorage.setItem('token_user_login', JSON.stringify(res.data.data.accessToken));

        return res.data.data;
    } catch (err) {
        const message = err.response.data;
        return rejectWithValue(message);
    }
});

// find all user Doctor
export const fetchApiUserDoctors = createAsyncThunk('user/fetchApiUserDoctors', async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('res doctors -', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// find user Doctor by token
export const fetchApiUserDoctorByToken = createAsyncThunk('user/fetchApiUserDoctorByToken', async (token) => {
    try {
        if (token) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors/profile`, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${token}`,
                    ContentType: 'application/json',
                },
            });
            console.log('res doctor by id -', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

// register
export const fetchApiRegister = createAsyncThunk('user/fetchApiRegister', async (values) => {
    try {
        const { confirmPassword, phone_number, password, rule } = values;

        const formatPhone = phone_number.replace('+84', '0');

        console.log('formatPhone ->', formatPhone);

        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}auth/register`,
            {
                phone_number: formatPhone,
                password: password,
                rule: rule,
            },
            {
                headers: { Authorization: '***' },
            },
        );
        console.log('res', res.data.data);

        localStorage.setItem('token_user_login', JSON.stringify(res.data.data.accessToken));

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const createFormData = (values, fileList) => {
    const { username, dob, address, gender, work_type, avatar } = values;

    const formData = new FormData();

    formData.append('username', username);
    formData.append('dob', dob);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatar', fileList[0].originFileObj);
    formData.append('work_type', work_type);

    return formData;
};

// create info user
export const fetchApiUpdateInfoUser = createAsyncThunk(
    'user/fetchApiUpdateInfoUser',
    async ({ values, fileList, tokenCurrent }) => {
        // console.log('values', values);
        if (tokenCurrent) {
            try {
                let formData = createFormData(values, fileList);

                const res = await axios.post(`${process.env.REACT_APP_BASE_URL}doctors`, formData, {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${tokenCurrent}`,
                        ContentType: 'multipart/form-data',
                    },
                });

                return res.data;
            } catch (err) {
                console.log({ err });
            }
        }
    },
);

// update info for doctor
const createFormDataUpdateInfoPatient = (values, fileList) => {
    const { username, dob, address, gender, avatar } = values;
    console.log('->', new Date(dob));
    const formData = new FormData();

    formData.append('username', username);
    formData.append('dob', new Date(dob));
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatar', fileList);

    return formData;
};
export const fetchApiUpdateInfoForDoctor = createAsyncThunk(
    'user/fetchApiUpdateInfoForDoctor',
    async ({ values, fileList }) => {
        try {
            const { doctor_id } = values;
            let formData = createFormDataUpdateInfoPatient(values, fileList);
            const getToken = JSON.parse(localStorage.getItem('token_user_login'));

            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}doctors/${doctor_id}`, formData, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${getToken}`,
                    ContentType: 'multipart/form-data',
                },
            });
            console.log('update info doctor - ', res.data);

            return res.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// create profile for doctor
export const fetchApiCreateProfileForDoctor = createAsyncThunk(
    'user/fetchApiCreateProfileForDoctor',
    async ({ values, tokenCurrent }) => {
        // console.log('values', values);
        // console.log('values', tokenCurrent);
        try {
            const { specialist, training_place, degree, languages, education, experiences, work_place, doctor_id } =
                values;

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}doctors/profile`,
                {
                    specialist: specialist,
                    training_place: training_place,
                    degree: degree,
                    languages: languages,
                    education: education,
                    experiences: experiences,
                    work_place: work_place,
                    doctor_id: doctor_id,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${tokenCurrent}`,
                        ContentType: 'application/json',
                    },
                },
            );

            return res.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// -- Patient --
export const fetchApiAllPatients = createAsyncThunk('patient/fetchApiAllPatients', async () => {
    try {
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));

        if (getToken) {
            console.log('1111111111111');
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}patients`, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${getToken}`,
                    ContentType: 'application/json',
                },
            });
            console.log('res all patients ->', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

const createFormDataForPatient = (values, fileList) => {
    const { username, dob, address, gender, blood, avatar, anamnesis } = values;

    const formData = new FormData();

    formData.append('username', username);
    formData.append('dob', dob);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatar', fileList[0].originFileObj);
    formData.append('blood', blood);
    formData.append('anamnesis', anamnesis);

    return formData;
};
export const fetchApiCreateInfoPatient = createAsyncThunk(
    'patient/fetchApiCreateInfoPatient',
    async ({ values, fileList, tokenCurrent }) => {
        try {
            let formData = createFormDataForPatient(values, fileList);

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}patients`, formData, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${tokenCurrent}`,
                    ContentType: 'multipart/form-data',
                },
            });
            console.log('res create info patient ->', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

// check user exits (phone_number)
export const fetchApiCheckExistUserByNumberPhone = createAsyncThunk(
    'user/fetchApiCheckExistUserByNumberPhone',
    async (values) => {
        try {
            const { phone_number } = values;

            const formatPhone = phone_number.replace('+84', '0');

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}accounts/phone/${formatPhone}`);
            console.log('res check exits ->', res.data.data);

            return res.data.data;
        } catch (err) {
            console.log({ err });
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        doctorByToken: [],
        userRegister: [],
        infoUser: [],
        profileForDoctor: [],
        userLogin: [],
        isLoading: false,
        patient: [],
        patientInfo: [],
        checkExits: [],
    },
    reducers: {
        clickedLogoutPatient: (state, action) => {
            state.patient = action.payload;
        },
        clickedLogoutDoctor: (state, action) => {
            state.doctorByToken = action.payload;
        },
        clickedClearInfoLogin: (state, action) => {
            state.userLogin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(fetchApiLogin.fulfilled, (state, action) => {
                state.userLogin = action.payload;
            })
            .addCase(fetchApiLogin.rejected, (state, action) => {
                state.userLogin = action.payload;
            })
            // find all user doctor
            .addCase(fetchApiUserDoctors.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiUserDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            // find user doctor by id
            .addCase(fetchApiUserDoctorByToken.fulfilled, (state, action) => {
                state.doctorByToken = action.payload;
            })
            // register
            .addCase(fetchApiRegister.fulfilled, (state, action) => {
                state.userRegister = action.payload;
            })
            // create info user
            .addCase(fetchApiUpdateInfoUser.fulfilled, (state, action) => {
                state.infoUser = action.payload;
            })
            // update info for doctor
            // .addCase(fetchApiUpdateInfoForDoctor.fulfilled, (state, action) => {
            //     state.infoUser = action.payload;
            // })
            // create profile for doctor
            .addCase(fetchApiCreateProfileForDoctor.fulfilled, (state, action) => {
                state.profileForDoctor = action.payload;
            })
            .addCase(fetchApiAllPatients.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiAllPatients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.patient = action.payload;
            })
            .addCase(fetchApiCreateInfoPatient.fulfilled, (state, action) => {
                state.patientInfo = action.payload;
            })
            .addCase(fetchApiCheckExistUserByNumberPhone.fulfilled, (state, action) => {
                state.checkExits = action.payload;
            });
    },
});

export default userSlice;
