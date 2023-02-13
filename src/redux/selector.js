// lib
import { createSelector } from '@reduxjs/toolkit';

// find user doctor by token
export const fetchApiUserDoctorByTokenSelector = (state) => state.userSlice.doctorByToken;

// all user doctor
export const fetchApiUserDoctorsSelector = (state) => state.userSlice.data;

// login
export const fetchApiLoginSelector = (state) => state.userSlice.userLogin;

// register
export const fetchApiRegisterSelector = (state) => state.userSlice.userRegister;

// update info user
export const fetchApiUpdateInfoUserSelector = (state) => state.userSlice.infoUser;

// profile for doctor
export const fetchApiCreateProfileForDoctorSelector = (state) => state.userSlice.profileForDoctor;

// btn change layout
export const btnSelectMenuChangeLayoutSelector = (state) => state.layoutSlice.btnClickChangeLayout;

// all schedule doctor
export const fetchApiAllCreateScheduleDoctorSelector = (state) => state.scheduleDoctor.data;
export const fetchApiAllCreateDaysDoctorSelector = (state) => state.scheduleDoctor.days;
export const fetchApiAllShiftsDoctorSelector = (state) => state.scheduleDoctor.shifts;
export const fetchApiScheduleByIdDoctorSelector = (state) => state.scheduleDoctor.idDoctor;

// get all user doctor -> get doctor login -> fetch api
export const getDoctorLoginFilter = createSelector(
    fetchApiUserDoctorsSelector,
    fetchApiUserDoctorByTokenSelector,
    (listUser, userLogin) => {
        // console.log('1111', listUser);
        // console.log('2222', userLogin);

        const getUserLogin = listUser.filter((_user) => _user?.person?._id === userLogin?.doctor?.person?._id);

        return getUserLogin[0];
    },
);

// get doctor id -> fetch api
export const getIdDoctorFilter = createSelector(
    fetchApiUserDoctorByTokenSelector,
    fetchApiAllCreateScheduleDoctorSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    (infoDoctor, listSchedule, listDay, listShift) => {
        // console.log('infoDoctor', infoDoctor);
        // console.log('listSchedule', listSchedule);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);

        const getIdDoctorFromListSchedule = listSchedule.filter(
            (schedule) => schedule.doctor === infoDoctor?.doctor?._id,
        );
        // console.log('getIdDoctorFromListSchedule', getIdDoctorFromListSchedule);

        return getIdDoctorFromListSchedule.map((schedule) => {
            const days = listDay.find((_day) => _day._id === schedule.day);
            const shifts = listShift.find((_shift) => _shift._id === schedule.time);
            return {
                _id: schedule._id,
                time_per_conversation: schedule.time_per_conversation,
                fee: schedule.fee,
                day: {
                    _id: days._id,
                    day: days.day,
                    day_number: days.day_number,
                },
                time: {
                    _id: shifts?._id,
                    name: shifts.name,
                    desc: shifts.desc,
                    time_start: shifts.time_start,
                    time_end: shifts.time_end,
                },
                doctor: {
                    doctor_id: infoDoctor.doctor._id,
                    person: infoDoctor.doctor.person,
                },
            };
        });
    },
);
