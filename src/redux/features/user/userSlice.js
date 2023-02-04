// lib
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// login
export const fetchApiLogin = createAsyncThunk('user/fetchApiLogin', async (values) => {
    try {
        const { phone_number, password } = values;

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
            phone_number: phone_number,
            password: password,
        });
        console.log(res.data.data);

        localStorage.setItem('token_user_login', JSON.stringify(res.data.data.accessToken));

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// find all user Doctor
export const fetchApiUserDoctors = createAsyncThunk('user/fetchApiUserDoctors', async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors`);
        console.log('res doctors -', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// find user Doctor by token
export const fetchApiUserDoctorByToken = createAsyncThunk('user/fetchApiUserDoctorByToken', async () => {
    try {
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));

        if (getToken !== null) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors/profile`, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${getToken}`,
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

        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}auth/register`,
            {
                phone_number: phone_number,
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
    const { username, dob, address, gender, avatar } = values;

    const formData = new FormData();

    formData.append('username', username);
    formData.append('dob', dob);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatar', fileList[0].originFileObj);

    return formData;
};

// update info user
export const fetchApiUpdateInfoUser = createAsyncThunk(
    'user/fetchApiUpdateInfoUser',
    async ({ values, fileList, tokenCurrent }) => {
        try {
            let formData = createFormData(values, fileList);

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}doctors`, formData, {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${tokenCurrent}`,
                    ContentType: 'multipart/form-data',
                },
            });
            console.log('update info me', res.data);

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
        console.log('values', values);
        console.log('values', tokenCurrent);
        try {
            const { specialist, training_place, degree, languages, education, experiences, doctor_id } = values;

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}doctors/profile`,
                {
                    specialist: specialist,
                    training_place: training_place,
                    degree: degree,
                    languages: languages,
                    education: education,
                    experiences: experiences,
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        userRegister: [],
        infoUser: [],
        profileForDoctor: [],
        userLogin: [],
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(fetchApiLogin.fulfilled, (state, action) => {
                state.userLogin = action.payload;
            })
            // find all user doctor
            .addCase(fetchApiUserDoctors.fulfilled, (state, action) => {
                // state.data = action.payload;
            })
            // find user doctor by id
            .addCase(fetchApiUserDoctorByToken.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            // register
            .addCase(fetchApiRegister.fulfilled, (state, action) => {
                state.userRegister = action.payload;
            })
            // info user
            .addCase(fetchApiUpdateInfoUser.fulfilled, (state, action) => {
                state.infoUser = action.payload;
            })
            // profile for doctor
            .addCase(fetchApiCreateProfileForDoctor.fulfilled, (state, action) => {
                state.profileForDoctor = action.payload;
            });
    },
});

export default userSlice;
