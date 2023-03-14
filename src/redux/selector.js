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

// schedule detail by id doctor
export const fetchApiScheduleDetailByIdDoctorSelector = (state) => state.patientSlice.data; // nằm ở Quản lý bệnh nhân (mục Danh sách bệnh nhân)

// get patient -> bmis
export const fetchApiBMIByIdPatientSelector = (state) => state.bmisSlice.data;

// get patient -> glycemic
export const fetchApiGlycemicByIdPatientSelector = (state) => state.glycemicSlice.data;

// get all schedule medical appointment
export const fetchApiScheduleMedicalAppointmentSelector = (state) => state.patientSlice.scheduleMedicalAppointment;

// get all notification by id doctor
export const fetchApiNotificationByDoctorIdSelector = (state) => state.notificationSlice.data;
export const getTotalNotifications = (state) => state.notificationSlice.notifications;
// update seen notification
export const fetchApiUpdateSeenNotificationSelector = (state) => state.notificationSlice.seen; // hide

// get all conversation by id doctor
export const fetchApiConversationsSelector = (state) => state.conversationSlice.data;

// get id conversation when clicked
export const btnClickGetIdConversationSelector = (state) => state.conversationSlice.btnClickGetIdConversation;

// get id user when clicked button call
export const btnClickGetUserIdSelector = (state) => state.callSlice.btnClickCallUserId; // hide

// get all message by id conversation
export const fetchApiMessagesSelector = (state) => state.messageSlice.data;

/* -- Handle Selector -- */

// filter notification not has seen
export const filterNotificationNotHasSeen = createSelector(
    fetchApiNotificationByDoctorIdSelector,
    (listNotification) => {
        if (listNotification) {
            const getNotificationNotHasSeen = listNotification.filter(
                (_notification) => _notification.hasSeen === false,
            );

            return getNotificationNotHasSeen;
        }
    },
);

// filter notification
export const filterNotifications = createSelector(
    fetchApiNotificationByDoctorIdSelector,
    fetchApiUpdateSeenNotificationSelector,
    (listNotification, seenNotification) => {
        console.log('listNotification ->', listNotification);
        console.log('seenNotification ->', seenNotification);

        const notifications = listNotification.map((_notification) => {
            //const seens =
            //seenNotification[0]._id === _notification._id ? seenNotification[0].hasSeen : _notification.hasSeen;

            const seens = seenNotification.find((_seen) => _seen._id === _notification._id);
            console.log('seens ->', seens);

            return {
                content: _notification.content,
                createdAt: _notification.createdAt,
                from: _notification.from,
                hasSeen: _notification.hasSeen,
                rule: _notification.rule,
                to: _notification.to,
                updatedAt: _notification.updatedAt,
                _id: _notification._id,
            };
        });

        return notifications;
    },
);

// get all user doctor -> get doctor login -> fetch api
export const getDoctorLoginFilter = createSelector(
    fetchApiUserDoctorsSelector,
    fetchApiUserDoctorByTokenSelector,
    (listUser, userLogin) => {
        // console.log('1111', listUser);
        // console.log('2222', userLogin);
        if (listUser) {
            const getUserLogin = listUser.filter((_user) => _user?.person?._id === userLogin?.doctor?.person?._id);

            return getUserLogin[0];
        } else {
            return [];
        }
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
        // console.log('listSchedule -selector', listSchedule);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);

        const getIdDoctorFromListSchedule = listSchedule.filter(
            (schedule) => schedule?.doctor?._id === infoDoctor?.doctor?._id,
        );
        // console.log('getIdDoctorFromListSchedule', getIdDoctorFromListSchedule);

        return getIdDoctorFromListSchedule.map((schedule) => {
            // console.log('sche -->', schedule);
            const days = listDay.find((_day) => _day._id === schedule.day._id);
            const shifts = listShift.find((_shift) => _shift._id === schedule.time._id);
            return {
                _id: schedule?._id,
                time_per_conversation: schedule?.time_per_conversation,
                fee: schedule?.fee,
                day: {
                    _id: days?._id,
                    day: days?.day,
                    day_number: days?.day_number,
                },
                time: {
                    _id: shifts?._id,
                    name: shifts?.name,
                    desc: shifts?.desc,
                    time_start: shifts?.time_start,
                    time_end: shifts?.time_end,
                },
                doctor: {
                    doctor_id: infoDoctor?.doctor?._id,
                    person: infoDoctor?.doctor?.person,
                },
            };
        });
    },
);

// list schedule detail -> return patient id
export const scheduleDetailByIdDoctorFilters = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    (listScheduleDetail) => {
        if (listScheduleDetail) {
            return listScheduleDetail.map((_list) => {
                return _list;
            });
        } else {
            return [];
        }
    },
);

// filter status health of patient -> Chart (Normal)
export const filterStatusHealthNormalOfPatientForChart = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    (listPatient) => {
        if (listPatient) {
            const patient = listPatient.filter((_patient) => _patient.status.message.code === 0);

            return patient;
        }
    },
);

// filter status health of patient -> Chart (Alarm)
export const filterStatusHealthAlarmOfPatientForChart = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    (listPatient) => {
        if (listPatient) {
            const patient = listPatient.filter((_patient) => _patient.status.message.code === 2);

            return patient;
        }
    },
);

// filter status health of patient -> Chart (Warning)
export const filterStatusHealthWarningOfPatientForChart = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    (listPatient) => {
        if (listPatient) {
            const patient = listPatient.filter((_patient) => _patient.status.message.code === 1);

            return patient;
        }
    },
);

// get member conversation
export const cleanConversationListSelector = createSelector(
    fetchApiUserDoctorByTokenSelector,
    fetchApiConversationsSelector,
    (user, conversations) => {
        // console.log('user ->', user);
        console.log('conversations selector ->', conversations);

        const conversationList = conversations.map((conversation) => {
            const member = conversation.members[0]._id === user._id ? conversation.members[1] : conversation.members[0];

            console.log('member', member);

            return {
                _id: conversation._id,
                member: {
                    username: member.person.username,
                    avatar: member.person.avatar,
                    _id: member._id,
                },
                last_message: {
                    content: conversation?.last_message?.content,
                    createdAt: conversation?.last_message?.createdAt,
                },
            };
        });

        // console.log(conversationList);
        return conversationList;
    },
);

// filter -> day (Thứ) + time (Ca làm) of doctor
export const getDayAndTimeScheduleMedicalFilterOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    cleanConversationListSelector,
    (listScheduleMedical, listDay, listShift, cleanConversation) => {
        // console.log('listScheduleMedical', listScheduleMedical);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);
        console.log('cleanConversationListSelector', cleanConversation);

        const scheduleMedicals = listScheduleMedical.map((_scheduleMedical) => {
            const days = listDay.find((_day) => _day._id === _scheduleMedical.schedule.day);
            const shifts = listShift.find((_shift) => _shift._id === _scheduleMedical.schedule.time);
            const conversations = cleanConversation.find(
                (_conversation) => _conversation.member._id === _scheduleMedical.patient,
            );

            console.log('conversations ->', conversations);
            // console.log('days', days);
            // console.log('shifts', shifts);

            return {
                status: _scheduleMedical.status,
                content_exam: _scheduleMedical.content_exam,
                createdAt: _scheduleMedical.createdAt,
                doctor: _scheduleMedical.doctor,
                patient: _scheduleMedical.patient,
                schedule: _scheduleMedical.schedule,
                updatedAt: _scheduleMedical.updatedAt,
                days,
                shifts,
                conversations,
                _id: _scheduleMedical._id,
            };
        });

        return scheduleMedicals;
    },
);

// get message theo user
export const messageOfUserFilter = createSelector(
    fetchApiUserDoctorByTokenSelector,
    fetchApiMessagesSelector,
    fetchApiConversationsSelector,
    (user, listMessage, conversations) => {
        console.log('user ->', user);
        // console.log('listMessage ->', listMessage);

        const messages = listMessage.map((_message) => {
            const getMember = conversations.map((_conversation) => {
                const member =
                    _conversation.members[0]._id === user.doctor._id
                        ? _conversation.members[1]
                        : _conversation.members[0];

                return member;
            });
            // console.log('getMember ->', getMember);

            const _user = _message?.senderId === user?.doctor?._id ? user : getMember[0];
            // console.log('_user ->', _user);

            return {
                _id: _message._id,
                content: _message.content,
                conversation: _message.conversation,
                createdAt: _message.createdAt,
                images: _message.images,
                updatedAt: _message.updatedAt,
                senderId: _message.senderId,
                user: {
                    doctor: _user,
                },
            };
        });

        // console.log('message selector ->', messages);

        return messages;
    },
);
