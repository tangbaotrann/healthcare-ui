// lib
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// register
export const fetchApiRegister = createAsyncThunk('user/fetchApiRegister', async (values) => {
    try {
        const { confirmPassword, phone_number, password, rule } = values;

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, {
            phone_number: phone_number,
            password: password,
            rule: rule,
            headers: { Authorization: '***' },
        });
        console.log('res', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// update info user
export const fetchApiUpdateInfoUser = createAsyncThunk(
    'user/fetchApiUpdateInfoUser',
    async ({ values, tokenCurrent }) => {
        try {
            const { username, dob, address, gender, avatar } = values;

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}doctors`,
                {
                    username: username,
                    dob: dob,
                    address: address,
                    gender: gender,
                    avatar: avatar,
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

// create profile for doctor
export const fetchApiCreateProfileForDoctor = createAsyncThunk(
    'user/fetchApiCreateProfileForDoctor',
    async ({ values, tokenCurrent }) => {
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
        infoUser: [],
        profileForDoctor: [],
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(fetchApiRegister.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            // info user
            .addCase(fetchApiUpdateInfoUser, (state, action) => {
                state.infoUser = action.payload;
            })
            // profile for doctor
            .addCase(fetchApiCreateProfileForDoctor.fulfilled, (state, action) => {
                state.profileForDoctor = action.payload;
            });
    },
});

export default userSlice;
