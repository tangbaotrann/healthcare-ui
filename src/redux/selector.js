// lib
import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';

// find user doctor by token
export const fetchApiUserDoctorByTokenSelector = (state) => state.userSlice.doctorByToken;
export const isLoadingUserDoctorByTokenSelector = (state) => state.userSlice.isLoading;

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
export const isLoadingScheduleDoctorSelector = (state) => state.scheduleDoctor.isLoading;
export const fetchApiAllCreateDaysDoctorSelector = (state) => state.scheduleDoctor.days;
export const fetchApiAllShiftsDoctorSelector = (state) => state.scheduleDoctor.shifts;
export const fetchApiScheduleByIdDoctorSelector = (state) => state.scheduleDoctor.idDoctor;

// schedule detail by id doctor
export const fetchApiScheduleDetailByIdDoctorSelector = (state) => state.patientSlice.data; // nằm ở Quản lý bệnh nhân (mục Danh sách bệnh nhân)
export const isLoadingScheduleDetailByIdDoctorSelector = (state) => state.patientSlice.isLoading;

// get patient -> bmis
export const fetchApiBMIByIdPatientSelector = (state) => state.bmisSlice.data;
export const btnOptionSelectedBMISelector = (state) => state.bmisSlice.btnOptionSelectedBMI;

// get patient -> glycemic
export const fetchApiGlycemicByIdPatientSelector = (state) => state.glycemicSlice.data;
export const btnOptionSelectedGlycemicSelector = (state) => state.glycemicSlice.btnOptionSelectedGlycemic;

// get patient -> blood pressure
export const fetchApiBloodPressuresByIdPatientSelector = (state) => state.bloodPressureSlice.data;
export const btnOptionSelectedBloodPressure = (state) => state.bloodPressureSlice.btnOptionSelectedBloodPressure;

// get all schedule medical appointment
export const fetchApiScheduleMedicalAppointmentSelector = (state) => state.patientSlice.scheduleMedicalAppointment;
export const btnOptionSelectedMeetingSelector = (state) => state.patientSlice.btnOptionSelectedMeeting;

// get all notification by id doctor
export const fetchApiNotificationByDoctorIdSelector = (state) => state.notificationSlice.data;
export const isLoadingNotificationSelector = (state) => state.notificationSlice.isLoading;
export const getTotalNotifications = (state) => state.notificationSlice.notifications;
// update seen notification
export const fetchApiUpdateSeenNotificationSelector = (state) => state.notificationSlice.seen; // hide

// get all conversation by id doctor
export const fetchApiConversationsSelector = (state) => state.conversationSlice.data;
export const isLoadingConversationsSelector = (state) => state.conversationSlice.isLoading;

// get id conversation when clicked
export const btnClickGetIdConversationSelector = (state) => state.conversationSlice.btnClickGetIdConversation;
export const btnClickedRecordGetIdConversationSelector = (state) =>
    state.conversationSlice.btnClickedRecordGetIdConversation;

// get id user when clicked button call
export const btnClickGetUserIdSelector = (state) => state.callSlice.btnClickCallUserId; // hide
export const btnClickGetUsernameLeavedRoomSelector = (state) => state.callSlice.btnClickLeaveRoom;

// get all message by id conversation
export const fetchApiMessagesSelector = (state) => state.messageSlice.data;
export const isLoadingMessagesSelector = (state) => state.messageSlice.isLoading;
export const isLoadingWhenSendMessageSelector = (state) => state.messageSlice.isLoadingWhenSend;

export const fetchApiResultHeathByIdPatientSelector = (state) => state.patientSlice.resultHealthMessage;

// get all post
// export const fetchApiGetAllPostSelector = (state) => state.blogSlice.data;
export const fetchApiAllPostByIdDoctorSelector = (state) => state.blogSlice.data;
export const btnOptionSelectedBlogSelector = (state) => state.blogSlice.btnOptionSelectedBlog;
export const btnClickedPostSelector = (state) => state.blogSlice.btnClickedPost;
// get post by id
export const fetchApiGetPostByIdSelector = (state) => state.blogSlice.getPost;
// isLoading
export const isLoadingGetAllPostSelector = (state) => state.blogSlice.isLoading;

// get comment by id post
export const fetchApiCommentByIdPostSelector = (state) => state.commentSlice.data;
export const btnClickedCommentByIdPostSelector = (state) => state.commentSlice.btnClickedComment;
// liked
export const fetchApiLikePostSelector = (state) => state.blogSlice.likes;

/* -- Handle Selector -- */

// get all post
// export const getAllPostSelector = createSelector(
//     fetchApiGetAllPostSelector,
//     fetchApiUserDoctorByTokenSelector,
//     (posts, userDoctor) => {
//         console.log('posts', posts);
//         console.log('userDoctor', userDoctor);

//         if (posts.length > 0) {
//             const _posts = posts.map((_post) => {
//                 const _userDoctor =
//                     userDoctor.doctor._id === _post.author._id || userDoctor.doctor._id === _post.author
//                         ? userDoctor
//                         : null;

//                 return {
//                     author: _userDoctor,
//                     comments: _post.comments,
//                     content: _post.content,
//                     createdAt: _post.createdAt,
//                     images: _post.images,
//                     updatedAt: _post.updatedAt,
//                     title: _post.title,
//                     likes: _post.likes,
//                     _id: _post._id,
//                 };
//             });

//             return _posts;
//         }
//     },
// );

// filter blog btnOptionSelectedBlogSelector
export const blogOptionSelectedFilter = createSelector(
    fetchApiAllPostByIdDoctorSelector,
    btnOptionSelectedBlogSelector,
    (posts, option) => {
        console.log('posts selector ->', posts);
        const now = new Date();
        if (posts.length > 0) {
            if (option === 'all') {
                return posts;
            } else if (option === 'week') {
                const _posts = posts.filter((b) => moment(b.createdAt).week() === moment(now).week());

                return _posts;
            }
        }

        return [];
    },
);

// Tổng lịch khám
export const totalScheduleOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    (listScheduleMedical) => {
        if (listScheduleMedical) {
            return listScheduleMedical.length;
        }
    },
);

// Lịch hẹn khám
export const totalAppointmentScheduleOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    (listScheduleMedical) => {
        if (listScheduleMedical) {
            const appointmentSchedule = listScheduleMedical.filter((_schedule) => _schedule.status === false);

            return appointmentSchedule.length;
        }
    },
);

// Tổng số bệnh nhân
export const totalPatients = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    fetchApiUserDoctorByTokenSelector,
    (listPatient, userDoctorCurrent) => {
        if (listPatient) {
            const listScheduleDetailFilter = listPatient.filter(
                (_listScheduleDetail) =>
                    (_listScheduleDetail.patient.doctor_glycemic_id !== null &&
                        _listScheduleDetail.patient.doctor_glycemic_id === userDoctorCurrent.doctor._id) ||
                    (_listScheduleDetail.patient.doctor_blood_id !== null &&
                        _listScheduleDetail.patient.doctor_blood_id === userDoctorCurrent.doctor._id),
            );

            return listScheduleDetailFilter.length;
        }
    },
);

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

// filter notification (HIDED)
export const filterNotifications = createSelector(
    fetchApiNotificationByDoctorIdSelector,
    fetchApiUpdateSeenNotificationSelector,
    (listNotification, seenNotification) => {
        // console.log('listNotification ->', listNotification);
        // console.log('seenNotification ->', seenNotification);

        const notifications = listNotification.map((_notification) => {
            //const seens =
            //seenNotification[0]._id === _notification._id ? seenNotification[0].hasSeen : _notification.hasSeen;

            const seens = seenNotification.find((_seen) => _seen._id === _notification._id);
            // console.log('seens ->', seens);

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

// list schedule detail -> return patient id (Patients list)
export const scheduleDetailByIdDoctorFilters = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    fetchApiUserDoctorByTokenSelector,
    (listScheduleDetail, userDoctorCurrent) => {
        // console.log('listScheduleDetail selector ->', listScheduleDetail);
        if (listScheduleDetail) {
            const listScheduleDetailFilter = listScheduleDetail.filter(
                (_listScheduleDetail) =>
                    (_listScheduleDetail.patient.doctor_glycemic_id !== null &&
                        _listScheduleDetail.patient.doctor_glycemic_id === userDoctorCurrent.doctor._id) ||
                    (_listScheduleDetail.patient.doctor_blood_id !== null &&
                        _listScheduleDetail.patient.doctor_blood_id === userDoctorCurrent.doctor._id),
            );

            // console.log('listScheduleDetailFilter selector ->', listScheduleDetailFilter);

            return listScheduleDetailFilter;
        } else {
            return [];
        }
    },
);

// filter status health of patient -> Chart (Normal)
export const filterStatusHealthNormalOfPatientForChart = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    fetchApiUserDoctorByTokenSelector,
    (listPatient, userDoctorCurrent) => {
        console.log('listPatient selector ->', listPatient);
        if (listPatient) {
            const patient = listPatient.filter(
                (_patient) =>
                    ((_patient.patient.doctor_glycemic_id !== null &&
                        _patient.patient.doctor_glycemic_id === userDoctorCurrent.doctor._id) ||
                        (_patient.patient.doctor_blood_id !== null &&
                            _patient.patient.doctor_blood_id === userDoctorCurrent.doctor._id)) &&
                    _patient.status.message?.code === 0,
            );

            return patient;
        }
    },
);

// filter status health of patient -> Chart (Alarm)
export const filterStatusHealthAlarmOfPatientForChart = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    fetchApiUserDoctorByTokenSelector,
    (listPatient, userDoctorCurrent) => {
        if (listPatient) {
            const patient = listPatient.filter(
                (_patient) =>
                    ((_patient.patient.doctor_glycemic_id !== null &&
                        _patient.patient.doctor_glycemic_id === userDoctorCurrent.doctor._id) ||
                        (_patient.patient.doctor_blood_id !== null &&
                            _patient.patient.doctor_blood_id === userDoctorCurrent.doctor._id)) &&
                    _patient.status.message?.code === 2,
            );

            return patient;
        }
    },
);

// filter status health of patient -> Chart (Warning)
export const filterStatusHealthWarningOfPatientForChart = createSelector(
    fetchApiScheduleDetailByIdDoctorSelector,
    fetchApiUserDoctorByTokenSelector,
    (listPatient, userDoctorCurrent) => {
        if (listPatient) {
            const patient = listPatient.filter(
                (_patient) =>
                    ((_patient.patient.doctor_glycemic_id !== null &&
                        _patient.patient.doctor_glycemic_id === userDoctorCurrent.doctor._id) ||
                        (_patient.patient.doctor_blood_id !== null &&
                            _patient.patient.doctor_blood_id === userDoctorCurrent.doctor._id)) &&
                    _patient.status.message?.code === 1,
            );

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
        // console.log('conversations selector ->', conversations);

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

// filter -> day (Thứ) + time (Ca làm) of doctor (TẤT CẢ LỊCH HẸN KHÁM)
export const getDayAndTimeScheduleMedicalALLFilterOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    cleanConversationListSelector,
    (listScheduleMedical, listDay, listShift, cleanConversation) => {
        console.log('listScheduleMedical', listScheduleMedical);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);
        // console.log('cleanConversationListSelector', cleanConversation);

        const scheduleMedicals = listScheduleMedical.map((_scheduleMedical) => {
            const days = listDay.find((_day) => _day._id === _scheduleMedical.schedule.day);
            const shifts = listShift.find((_shift) => _shift._id === _scheduleMedical.schedule.time);
            const conversation = cleanConversation.find(
                (_conversation) => _conversation.member._id === _scheduleMedical.patient,
            );

            return {
                status: _scheduleMedical.status,
                content_exam: _scheduleMedical.content_exam,
                result_exam: _scheduleMedical.result_exam,
                createdAt: _scheduleMedical.createdAt,
                doctor: _scheduleMedical.doctor,
                patient: _scheduleMedical.patient,
                schedule: _scheduleMedical.schedule,
                updatedAt: _scheduleMedical.updatedAt,
                days,
                shifts,
                conversation,
                _id: _scheduleMedical._id,
            };
        });

        console.log('scheduleMedicals ->', scheduleMedicals);

        return scheduleMedicals;
    },
);

// filter -> day (Thứ) + time (Ca làm) of doctor (LỊCH HẸN KHÁM)
export const getDayAndTimeScheduleMedicalFilterOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    cleanConversationListSelector,
    (listScheduleMedical, listDay, listShift, cleanConversation) => {
        // console.log('listScheduleMedical', listScheduleMedical);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);
        // console.log('cleanConversationListSelector', cleanConversation);

        const scheduleMedicals = listScheduleMedical
            .filter((_status) => _status.status === false)
            .map((_scheduleMedical) => {
                const days = listDay.find((_day) => _day._id === _scheduleMedical.schedule.day);
                const shifts = listShift.find((_shift) => _shift._id === _scheduleMedical.schedule.time);
                const conversations = cleanConversation.find(
                    (_conversation) => _conversation.member._id === _scheduleMedical.patient,
                );

                return {
                    status: _scheduleMedical.status,
                    content_exam: _scheduleMedical.content_exam,
                    result_exam: _scheduleMedical.result_exam,
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

// filter -> day (Thứ) + time (Ca làm) of doctor (LỊCH HẸN KHÁM)
export const getDayAndTimeScheduleMedicalMeetingFilterOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    cleanConversationListSelector,
    (listScheduleMedical, listDay, listShift, cleanConversation) => {
        // console.log('listScheduleMedical', listScheduleMedical);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);
        // console.log('cleanConversationListSelector', cleanConversation);

        const scheduleMedicals = listScheduleMedical
            .filter((_status) => _status.status === true && _status.result_exam === null)
            .map((_scheduleMedical) => {
                const days = listDay.find((_day) => _day._id === _scheduleMedical.schedule.day);
                const shifts = listShift.find((_shift) => _shift._id === _scheduleMedical.schedule.time);
                const conversations = cleanConversation.find(
                    (_conversation) => _conversation.member._id === _scheduleMedical.patient,
                );

                return {
                    status: _scheduleMedical.status,
                    content_exam: _scheduleMedical.content_exam,
                    result_exam: _scheduleMedical.result_exam,
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

// getDayAndTimeScheduleMedicalMeetingFilterOfDoctor + filter meeting week
export const scheduleMedicalMeetingFilterOfDoctor = createSelector(
    getDayAndTimeScheduleMedicalMeetingFilterOfDoctor,
    btnOptionSelectedMeetingSelector,
    (listMeeting, option) => {
        console.log('listMeeting', listMeeting);
        const now = new Date();
        if (listMeeting.length > 0) {
            if (option === 'all') {
                return listMeeting;
            } else if (option === 'week') {
                const _listMeeting = listMeeting.filter((b) => moment(b.createdAt).week() === moment(now).week());

                return _listMeeting;
            }
        }

        return [];
    },
);

// filter notification -> get id conversation -> show screen
export const filterNotificationGetConversationId = createSelector(
    fetchApiNotificationByDoctorIdSelector,
    getDayAndTimeScheduleMedicalALLFilterOfDoctor,
    (notifications, listSchedule) => {
        console.log('notifications ->', notifications);
        console.log('listSchedule ->', listSchedule);

        const _notifications = notifications.map((_notification) => {
            // conversation
            const _conversations = listSchedule.find(
                (_conversation) => _conversation?.conversation?._id === _notification?.conversation_id,
            );

            // console.log('_conversations ->', _conversations);

            return {
                content: _notification.content,
                createdAt: _notification.createdAt,
                from: _notification.from,
                hasSeen: _notification.hasSeen,
                rule: _notification.rule,
                to: _notification.to,
                updatedAt: _notification.updatedAt,
                _id: _notification._id,
                conversation: _conversations,
            };
        });

        console.log('_notifications ->', _notifications);
        return _notifications;
    },
);

// get message theo user
export const messageOfUserFilter = createSelector(
    fetchApiUserDoctorByTokenSelector,
    fetchApiMessagesSelector,
    fetchApiConversationsSelector,
    (user, listMessage, conversations) => {
        // console.log('user ->', user);
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
                _id: _message?._id,
                content: _message?.content,
                conversation: _message?.conversation,
                createdAt: _message?.createdAt,
                images: _message?.images,
                updatedAt: _message?.updatedAt,
                senderId: _message?.senderId,
                user: {
                    doctor: _user,
                },
            };
        });

        // console.log('message selector ->', messages);

        return messages;
    },
);

// filter chart glycemic
export const userGlycemicListSelectorFilter = createSelector(
    fetchApiGlycemicByIdPatientSelector,
    btnOptionSelectedGlycemicSelector,
    (glycemics, option) => {
        const now = new Date();
        if (glycemics.length > 0) {
            if (option === 'all') {
                return glycemics;
            } else if (option === 'week') {
                const _glycemics = glycemics.filter((b) => moment(b.createdAt).week() === moment(now).week());

                return _glycemics;
            } else if (option === 'month') {
                const _glycemics = glycemics.filter((b) => moment(b.createdAt).month() === moment(now).month());

                return _glycemics;
            }
        }
        return [];
    },
);

// filter chart bmis
export const userBMIListSelectorFilter = createSelector(
    fetchApiBMIByIdPatientSelector,
    btnOptionSelectedBMISelector,
    (bmis, option) => {
        const now = new Date();
        if (bmis.length > 0) {
            if (option === 'all') {
                return bmis;
            } else if (option === 'week') {
                const _bmis = bmis.filter((b) => moment(b.createdAt).week() === moment(now).week());

                return _bmis;
            } else if (option === 'month') {
                const _bmis = bmis.filter((b) => moment(b.createdAt).month() === moment(now).month());

                return _bmis;
            }
        }
        return [];
    },
);

// filter chart blood pressure
export const userBloodPressureListSelectorFilter = createSelector(
    fetchApiBloodPressuresByIdPatientSelector,
    btnOptionSelectedBloodPressure,
    (bloodPressure, option) => {
        const now = new Date();
        if (bloodPressure.length > 0) {
            if (option === 'all') {
                return bloodPressure;
            } else if (option === 'week') {
                const _blood = bloodPressure.filter((b) => moment(b.createdAt).week() === moment(now).week());

                return _blood;
            } else if (option === 'month') {
                const _blood = bloodPressure.filter((b) => moment(b.createdAt).month() === moment(now).month());

                return _blood;
            }
        }

        return [];
    },
);

// filter doctors -> handle move patient
export const filterDoctorForMovePatient = createSelector(
    fetchApiUserDoctorsSelector,
    fetchApiUserDoctorByTokenSelector,
    (userDoctors, userDoctorCurrent) => {
        // console.log('userDoctors ->', userDoctors);
        // console.log('userDoctorCurrent ->', userDoctorCurrent);

        if (userDoctors.length > 0) {
            const _userDoctors = userDoctors.filter((_userDoctor) => _userDoctor._id !== userDoctorCurrent.doctor._id);

            // console.log('_userDoctors ->', _userDoctors);

            return _userDoctors;
        }
    },
);
