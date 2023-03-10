// lib
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// login
export const fetchApiLogin = createAsyncThunk('user/fetchApiLogin', async (values) => {
    try {
        const { phone_number, password } = values;

        const formatPhone = phone_number.replace('+84', '0');

        console.log('formatPhone ->', formatPhone);

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
            phone_number: formatPhone, //phone_number,
            password: password,
        });
        // console.log(res.data.data);

        localStorage.setItem('token_user_login', JSON.stringify(res.data.data.accessToken));

        return res.data.data;
    } catch (err) {
        console.log({ err });
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
        // console.log('res doctors -', res.data.data);

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
            // console.log('res doctor by id -', res.data.data);

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
    const { username, dob, address, gender, avatar } = values;

    const formData = new FormData();

    formData.append('username', username);
    formData.append('dob', dob);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('avatar', fileList[0].originFileObj);

    return formData;
};

// create info user
export const fetchApiUpdateInfoUser = createAsyncThunk(
    'user/fetchApiUpdateInfoUser',
    async ({ values, fileList, tokenCurrent }) => {
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
export const fetchApiUpdateInfoForDoctor = createAsyncThunk('user/fetchApiUpdateInfoForDoctor', async (values) => {
    try {
        const { username, dob, address, gender, doctor_id } = values;
        const getToken = JSON.parse(localStorage.getItem('token_user_login'));

        const res = await axios.put(
            `${process.env.REACT_APP_BASE_URL}doctors/profile`,
            {
                username: username,
                dob: dob,
                address: address,
                gender: gender,
                doctor_id: doctor_id,
            },
            {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: `Bearer ${getToken}`,
                    ContentType: 'application/json',
                },
            },
        );
        // console.log('update info doctor - ', res.data);

        return res.data;
    } catch (err) {
        console.log({ err });
    }
});

// create profile for doctor
export const fetchApiCreateProfileForDoctor = createAsyncThunk(
    'user/fetchApiCreateProfileForDoctor',
    async ({ values, tokenCurrent }) => {
        // console.log('values', values);
        // console.log('values', tokenCurrent);
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
        doctorByToken: [],
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
            });
    },
});

export default userSlice;
