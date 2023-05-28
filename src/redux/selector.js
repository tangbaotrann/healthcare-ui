// lib
import jwt_decode from 'jwt-decode';
import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';

// find user doctor by token
export const fetchApiUserDoctorByTokenSelector = (state) => state.userSlice.doctorByToken;
export const isLoadingUserDoctorByTokenSelector = (state) => state.userSlice.isLoading;
export const isLoadingFetchApiLoginSelector = (state) => state.userSlice.isLoading;
export const isLoadingFetchApiForgotPasswordSelector = (state) => state.userSlice.isLoadingForgotPassword;
export const isLoadingFetchApiRegisterSelector = (state) => state.userSlice.isLoadingRegister;

// all user doctor
export const fetchApiUserDoctorsSelector = (state) => state.userSlice.data;
export const btnOptionUsernameDoctorGetScheduleSelector = (state) => state.userSlice.optionUsernameDoctorGetSchedule;

// login
export const fetchApiLoginSelector = (state) => state.userSlice.userLogin;
export const fetchApiCheckExistUserByNumberPhoneSelector = (state) => state.userSlice.checkExits;

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
export const isLoadingAllShiftsDoctorSelector = (state) => state.scheduleDoctor.isLoading;
export const fetchApiScheduleByIdDoctorSelector = (state) => state.scheduleDoctor.idDoctor;
export const fetchApiAllScheduleDetailsSelector = (state) => state.scheduleDoctor.scheduleDetails;
export const btnOptionSelectDayOfWeekSelector = (state) => state.scheduleDoctor.day_of_week;
export const fetchApiCreateScheduleDoctorSelector = (state) => state.scheduleDoctor.createSchedule;
export const fetchApiCreateScheduleDoctorMessageRejectSelector = (state) => state.scheduleDoctor.messageReject;
export const fetchApiGetAllScheduleDetailOfPatientSelector = (state) => state.scheduleDoctor.allScheduleDetailOfPatient;
export const isLoadingGetAllScheduleDetailOfPatient = (state) => state.scheduleDoctor.isLoading;

// schedule detail by id doctor
export const fetchApiScheduleDetailByIdDoctorSelector = (state) => state.patientSlice.data; // nằm ở Quản lý bệnh nhân (mục Danh sách bệnh nhân)
export const isLoadingScheduleDetailByIdDoctorSelector = (state) => state.patientSlice.isLoading;

// get patient -> bmis
export const fetchApiBMIByIdPatientSelector = (state) => state.bmisSlice.data;
export const btnOptionSelectedBMISelector = (state) => state.bmisSlice.btnOptionSelectedBMI;
export const fetchApiAllBMIOfPatientSelector = (state) => state.bmisSlice.bmisPatient;
export const fetchApiAllGlycemicOfPatientSelector = (state) => state.bmisSlice.glycemicPatient;
export const fetchApiAllBloodOfPatientSelector = (state) => state.bmisSlice.bloodPatient;
// message error
export const fetchApiCreateBMIForPatientMessageRejectedSelector = (state) => state.bmisSlice.messageReject;
export const fetchApiCreateGlycemicForPatientMessageRejectedSelector = (state) => state.bmisSlice.messageGlycemicReject;
export const fetchApiCreateBloodForPatientForPatientMessageRejectedSelector = (state) =>
    state.bmisSlice.messageBloodReject;

// get patient -> glycemic
export const fetchApiGlycemicByIdPatientSelector = (state) => state.glycemicSlice.data;
export const btnOptionSelectedGlycemicSelector = (state) => state.glycemicSlice.btnOptionSelectedGlycemic;

// get patient -> blood pressure
export const fetchApiBloodPressuresByIdPatientSelector = (state) => state.bloodPressureSlice.data;
export const btnOptionSelectedBloodPressure = (state) => state.bloodPressureSlice.btnOptionSelectedBloodPressure;

// get all schedule medical appointment
export const fetchApiScheduleMedicalAppointmentSelector = (state) => state.patientSlice.scheduleMedicalAppointment;
export const fetchApiScheduleMedicalAppointmentAwaitSelector = (state) =>
    state.patientSlice.scheduleMedicalAppointmentAwait;
export const btnOptionSelectedMeetingSelector = (state) => state.patientSlice.btnOptionSelectedMeeting;

// get all notification by id doctor
export const fetchApiNotificationByDoctorIdSelector = (state) => state.notificationSlice.data;
export const fetchApiNotificationByPatientIdSelector = (state) => state.notificationSlice.dataPatient;
export const isLoadingNotificationSelector = (state) => state.notificationSlice.isLoading;
export const getTotalNotifications = (state) => state.notificationSlice.notifications;
// update seen notification
export const fetchApiUpdateSeenNotificationSelector = (state) => state.notificationSlice.seen; // hide

// get all conversation by id doctor
export const fetchApiConversationsSelector = (state) => state.conversationSlice.data;
export const isLoadingConversationsSelector = (state) => state.conversationSlice.isLoading;
// get all conversation by id patient
export const fetchApiConversationsOfPatientSelector = (state) => state.conversationSlice.conversationsOfPatient;

// get id conversation when clicked
export const btnClickGetIdConversationSelector = (state) => state.conversationSlice.btnClickGetIdConversation;
export const btnClickedRecordGetIdConversationSelector = (state) =>
    state.conversationSlice.btnClickedRecordGetIdConversation;

// get id user when clicked button call
export const btnClickGetUserIdSelector = (state) => state.callSlice.btnClickCallUserId; // hide
export const btnClickGetUsernameLeavedRoomSelector = (state) => state.callSlice.btnClickLeaveRoom;
export const btnClickGetPatientUsernameLeaveRoomSelector = (state) => state.callSlice.btnClickPatientLeaveRoom;

// get all message by id conversation
export const fetchApiMessagesSelector = (state) => state.messageSlice.data;
export const isLoadingMessagesSelector = (state) => state.messageSlice.isLoading;
export const isLoadingWhenSendMessageSelector = (state) => state.messageSlice.isLoadingWhenSend;

export const fetchApiResultHeathByIdPatientSelector = (state) => state.patientSlice.resultHealthMessage;

// get all post
export const fetchApiGetAllPostSelector = (state) => state.blogSlice.blogAllPostForPatient;
export const fetchApiAllPostByIdDoctorSelector = (state) => state.blogSlice.data;
export const isLoadingAllPostByIdDoctorSelector = (state) => state.blogSlice.isLoading;
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

// Patient info
export const fetchApiAllPatientsSelector = (state) => state.userSlice.patient;
export const isLoadingApiAllPatientsSelector = (state) => state.userSlice.isLoading;
export const fetchApiCreateInfoPatientSelector = (state) => state.userSlice.patientInfo;

export const fetchApiRegisterScheduleAppointmentOfPatientSelector = (state) =>
    state.patientSlice.patientRegisterSchedule;

export const fetchApiScheduleMedicalAppointmentResultExamSelector = (state) => state.patientSlice.resultExam;
export const isLoadingScheduleMedicalAppointmentResultExamSelector = (state) => state.patientSlice.isLoading;

// history
export const fetchApiHistoryExamOfPatientSelector = (state) => state.patientSlice.historyExam;
export const isLoadingHistoryExamOfPatientSelector = (state) => state.patientSlice.isLoading;
export const btnClickedOpenHistorySelector = (state) => state.patientSlice.btnClickedOpenHistory;

// map
export const selectedGetAddressSelector = (state) => state.mapSlice.data;

/* -- Handle Selector -- */

// get all schedule of patient (lấy hết lịch khám của bệnh nhân)
export const filterRegisterScheduleAppointmentWithStatusFalse = createSelector(
    fetchApiGetAllScheduleDetailOfPatientSelector,
    (lists) => {
        if (lists?.length > 0) {
            // console.log('list', lists);
            const now = new Date();

            const _listSchedule = lists.filter(
                (_schedule) =>
                    // new Date(_schedule.day_exam) >= now &&
                    moment(_schedule.day_exam).add(45, 'minutes').isAfter(moment(now)) &&
                    _schedule.status === false &&
                    _schedule.result_exam === null,
            );

            const _schedule_now = _listSchedule.filter(
                (_schedule) =>
                    moment(_schedule.day_exam).diff(new Date(), 'day') === 0 &&
                    moment(_schedule.day_exam).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY'),
            );

            const _schedule_now_ids = _schedule_now.map((_schedule) => _schedule._id);

            const _schedule_after = _listSchedule.filter((_schedule) => {
                return !_schedule_now_ids.includes(_schedule._id);
            });

            const _results = _schedule_now.concat(_schedule_after);

            // console.log('_results list false', _results);

            return _results;
        } else {
            return [];
        }
    },
);

export const filterRegisterScheduleAppointmentWithStatusTrue = createSelector(
    fetchApiGetAllScheduleDetailOfPatientSelector,
    (lists) => {
        if (lists?.length > 0) {
            // console.log('list', lists);
            const now = new Date();
            // console.log('now', now);

            const _listSchedule = lists.filter(
                (_schedule) =>
                    // new Date(_schedule.day_exam) >= now &&
                    moment(_schedule.day_exam).add(45, 'minutes').isAfter(moment(now)) &&
                    _schedule.status === true &&
                    _schedule.result_exam === null,
            );
            // console.log('_listSchedule', _listSchedule);

            const _schedule_now = _listSchedule.filter(
                (_schedule) =>
                    moment(_schedule.day_exam).diff(new Date(), 'day') === 0 &&
                    moment(_schedule.day_exam).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY'),
            );
            // console.log('_schedule_now ->', _schedule_now);

            const _schedule_now_ids = _schedule_now.map((_schedule) => _schedule._id);

            const _schedule_after = _listSchedule.filter((_schedule) => {
                return !_schedule_now_ids.includes(_schedule._id);
            });

            const _results = _schedule_now.concat(_schedule_after);

            // console.log('_results', _results);

            return _results;
        } else {
            return [];
        }
    },
);

// get comments
export const filterGetCommentPost = createSelector(
    fetchApiGetPostByIdSelector,
    fetchApiCommentByIdPostSelector,
    (posts, comments) => {
        // console.log('posts 106 ->', posts);
        // console.log('comments 106 ->', comments);

        const _comments = comments.map((_comment) => {
            const _posts = _comment.post_id === posts._id ? _comment : null;

            return _posts;
        });

        return _comments;
    },
);

// get Patient info
export const filterGetInfoPatientByAccountId = createSelector(fetchApiAllPatientsSelector, (listPatient) => {
    const getToken = JSON.parse(localStorage.getItem('token_user_login'));
    const decodedToken = jwt_decode(getToken);

    // console.log('getToken', getToken);
    // console.log('listPatient', listPatient);
    // console.log('decodedToken', decodedToken);

    if (listPatient.length > 0) {
        const patients = listPatient.map((_patient) => {
            const patientCurrent = _patient.patient.person.account === decodedToken.account_id ? _patient : null;

            return patientCurrent;
        });

        return patients;
    }
});

// filter blog btnOptionSelectedBlogSelector
export const blogOptionSelectedFilter = createSelector(
    fetchApiAllPostByIdDoctorSelector,
    btnOptionSelectedBlogSelector,
    (posts, option) => {
        // console.log('posts selector ->', posts);
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

// filter blog btnOptionSelectedBlogSelector (Patient)
export const blogPatientOptionSelectedFilter = createSelector(
    fetchApiGetAllPostSelector,
    btnOptionSelectedBlogSelector,
    (posts, option) => {
        // console.log('posts selector ->', posts);
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
    // fetchApiScheduleMedicalAppointmentSelector,
    fetchApiScheduleMedicalAppointmentAwaitSelector,
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
            const listScheduleDetailFilter = listPatient?.filter(
                (_listScheduleDetail) =>
                    (_listScheduleDetail.patient.doctor_glycemic_id !== null &&
                        _listScheduleDetail.patient.doctor_glycemic_id === userDoctorCurrent?.doctor?._id) ||
                    (_listScheduleDetail.patient.doctor_blood_id !== null &&
                        _listScheduleDetail.patient.doctor_blood_id === userDoctorCurrent?.doctor?._id),
            );

            return listScheduleDetailFilter.length;
        }
    },
);

// filter notification not has seen (Doctor)
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

// filter notification not has seen (Doctor)
export const filterNotificationPatientNotHasSeen = createSelector(
    fetchApiNotificationByPatientIdSelector,
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

// get all user doctor with is_accepted && !deleted
export const filterUserDoctorsWithAccepted = createSelector(fetchApiUserDoctorsSelector, (listDoctor) => {
    if (listDoctor?.length > 0) {
        const _lists = listDoctor.filter((_doctor) => _doctor.is_accepted && !_doctor.deleted);

        return _lists;
    }
});

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

        const getIdDoctorFromListSchedule = listSchedule?.filter(
            (schedule) => schedule?.doctor?._id === infoDoctor?.doctor?._id,
        );
        // console.log('getIdDoctorFromListSchedule', getIdDoctorFromListSchedule);

        return getIdDoctorFromListSchedule?.map((schedule) => {
            // console.log('sche -->', schedule);
            const days = listDay?.find((_day) => _day._id === schedule.day._id);
            const shifts = listShift?.find((_shift) => _shift._id === schedule.time._id);
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
        // console.log('userDoctorCurrent selector ->', userDoctorCurrent);
        if (listScheduleDetail) {
            const listScheduleDetailFilter = listScheduleDetail?.filter(
                (_listScheduleDetail) =>
                    (_listScheduleDetail.patient.doctor_glycemic_id !== null &&
                        _listScheduleDetail.patient.doctor_glycemic_id === userDoctorCurrent?.doctor?._id) ||
                    (_listScheduleDetail.patient.doctor_blood_id !== null &&
                        _listScheduleDetail.patient.doctor_blood_id === userDoctorCurrent?.doctor?._id),
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
        // console.log('listPatient selector ->', listPatient);
        if (listPatient) {
            const patient = listPatient.filter(
                (_patient) =>
                    ((_patient.patient.doctor_glycemic_id !== null &&
                        _patient.patient.doctor_glycemic_id === userDoctorCurrent?.doctor?._id) ||
                        (_patient.patient.doctor_blood_id !== null &&
                            _patient.patient.doctor_blood_id === userDoctorCurrent?.doctor?._id)) &&
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
                        _patient.patient.doctor_glycemic_id === userDoctorCurrent?.doctor?._id) ||
                        (_patient.patient.doctor_blood_id !== null &&
                            _patient.patient.doctor_blood_id === userDoctorCurrent?.doctor?._id)) &&
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
                        _patient.patient.doctor_glycemic_id === userDoctorCurrent?.doctor?._id) ||
                        (_patient.patient.doctor_blood_id !== null &&
                            _patient.patient.doctor_blood_id === userDoctorCurrent?.doctor?._id)) &&
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

        if (conversations?.length > 0) {
            const conversationList = conversations?.map((conversation) => {
                const member =
                    conversation?.members[0]?._id === user?._id ? conversation?.members[1] : conversation?.members[0];

                // console.log('member', member);

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
        } else {
            return [];
        }
    },
);

// get conversation of Patient
export const cleanConversationOfPatientListSelector = createSelector(
    fetchApiAllPatientsSelector,
    fetchApiConversationsOfPatientSelector,
    (user, conversations) => {
        // console.log('user ->', user);
        // console.log('conversations selector ->', conversations);

        if (conversations.length > 0) {
            const conversationList = conversations.map((conversation) => {
                const member =
                    conversation.members[0]._id === user.patient._id
                        ? conversation.members[1]
                        : conversation.members[0];

                // console.log('member ->>', member);

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
        }
    },
);

// filter -> day (Thứ) + time (Ca làm) of doctor (TẤT CẢ LỊCH HẸN KHÁM)
export const getDayAndTimeScheduleMedicalALLFilterOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    cleanConversationListSelector,
    (listScheduleMedical, listDay, listShift, cleanConversation) => {
        // console.log('listScheduleMedical', listScheduleMedical);
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
                day_exam: _scheduleMedical.day_exam,
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

        // console.log('scheduleMedicals ->', scheduleMedicals);

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
        const now = new Date();

        if (listScheduleMedical?.length > 0) {
            const scheduleMedicals = listScheduleMedical
                ?.filter(
                    (_status) =>
                        moment(_status.day_exam).add(45, 'minutes').isAfter(moment(now)) && _status.status === false,
                )
                ?.map((_scheduleMedical) => {
                    const days = listDay?.find((_day) => _day._id === _scheduleMedical.schedule.day);
                    const shifts = listShift?.find((_shift) => _shift._id === _scheduleMedical.schedule.time);
                    const conversations = cleanConversation?.find(
                        (_conversation) => _conversation.member._id === _scheduleMedical.patient._id,
                    );

                    return {
                        status: _scheduleMedical.status,
                        content_exam: _scheduleMedical.content_exam,
                        result_exam: _scheduleMedical.result_exam,
                        createdAt: _scheduleMedical.createdAt,
                        day_exam: _scheduleMedical.day_exam,
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
        } else {
            return [];
        }
    },
);

// filter -> day (Thứ) + time (Ca làm) of doctor (CUỘC HẸN KHÁM)
export const getDayAndTimeScheduleMedicalMeetingFilterOfDoctor = createSelector(
    fetchApiScheduleMedicalAppointmentAwaitSelector,
    fetchApiAllCreateDaysDoctorSelector,
    fetchApiAllShiftsDoctorSelector,
    cleanConversationListSelector,
    (listScheduleMedical, listDay, listShift, cleanConversation) => {
        // console.log('fetchApiScheduleMedicalAppointmentAwaitSelector ->', listScheduleMedical);
        // console.log('listDay', listDay);
        // console.log('listShift', listShift);
        // console.log('cleanConversationListSelector', cleanConversation);

        // new
        const now = new Date();
        const _schedules = listScheduleMedical?.filter((schedule) => {
            return moment(schedule?.day_exam).add(45, 'minutes').isAfter(moment(now));
        });
        // console.log('_schedules ->', _schedules);

        const scheduleMedicals = _schedules
            // .filter((_status) => _status.status === true && _status.result_exam === null)
            ?.map((_scheduleMedical) => {
                const days = listDay?.find((_day) => _day._id === _scheduleMedical.schedule.day);
                const shifts = listShift?.find((_shift) => _shift._id === _scheduleMedical.schedule.time);
                const conversations = cleanConversation?.find(
                    (_conversation) => _conversation.member._id === _scheduleMedical.patient._id,
                );

                return {
                    status: _scheduleMedical.status,
                    content_exam: _scheduleMedical.content_exam,
                    result_exam: _scheduleMedical.result_exam,
                    createdAt: _scheduleMedical.createdAt,
                    day_exam: _scheduleMedical.day_exam,
                    doctor: _scheduleMedical.doctor,
                    patient: _scheduleMedical.patient,
                    schedule: _scheduleMedical.schedule,
                    updatedAt: _scheduleMedical.updatedAt,
                    days,
                    shifts,
                    conversations,
                    _id: _scheduleMedical._id,
                    is_exam: _scheduleMedical.is_exam,
                };
            });

        return scheduleMedicals;
    },
);

// Tổng doanh thu (lịch đã khám)
export const filterTotalFee = createSelector(fetchApiScheduleMedicalAppointmentResultExamSelector, (list) => {
    if (list) {
        const _listFee = list.filter((_list) => _list.schedule.fee);

        const _total = _listFee.reduce((fee, curr) => {
            return fee + curr.schedule.fee;
        }, 0);

        return _total;
    }
});

// Lọc doanh thu (theo tuần)
export const filterTotalFeeOfWeek = createSelector(fetchApiScheduleMedicalAppointmentResultExamSelector, (list) => {
    const now = new Date();

    // console.log('list ->', list);

    if (list?.length > 0) {
        const _filterWeek = list.filter((_list) => moment(_list.day_exam).week() === moment(now).week());
        // console.log('_filterWeek', _filterWeek);

        const _listFee = _filterWeek.filter((_list) => _list.schedule.fee);
        const _total = _listFee.reduce((fee, curr) => {
            return fee + curr.schedule.fee;
        }, 0);

        return _total;
    }
});

// Lọc doanh thu (theo tháng)
export const filterTotalFeeOfMonth = createSelector(fetchApiScheduleMedicalAppointmentResultExamSelector, (list) => {
    const now = new Date();

    if (list?.length > 0) {
        const _filterMonth = list.filter((_list) => moment(_list.day_exam).month() === moment(now).month());
        // console.log('_filterWeek', _filterWeek);

        const _listFee = _filterMonth.filter((_list) => _list.schedule.fee);
        const _total = _listFee.reduce((fee, curr) => {
            return fee + curr.schedule.fee;
        }, 0);

        return _total;
    }
});

// getDayAndTimeScheduleMedicalMeetingFilterOfDoctor + filter meeting week
export const scheduleMedicalMeetingFilterOfDoctor = createSelector(
    getDayAndTimeScheduleMedicalMeetingFilterOfDoctor,
    btnOptionSelectedMeetingSelector,
    (listMeeting, option) => {
        // console.log('listMeeting', listMeeting);

        const now = new Date();
        // console.log('week ->', moment(now).week());
        // moment(_scheduleMedicalMeeting?.day_exam).diff(new Date(), 'day') === 0
        if (listMeeting?.length > 0) {
            if (option === 'all') {
                return listMeeting;
            } else if (option === 'week') {
                const _listMeeting = listMeeting.filter((b) => moment(b.createdAt).week() === moment(now).week());

                return _listMeeting;
            } else if (option === 'month') {
                const _listMeeting = listMeeting.filter((b) => moment(b.createdAt).month() === moment(now).month());

                return _listMeeting;
            } else if (option === 'date') {
                const _listMeeting = listMeeting.filter(
                    (b) =>
                        moment(b.day_exam).diff(new Date(), 'day') === 0 &&
                        moment(b.day_exam).format('DD/MM/YYYY') === moment(now).format('DD/MM/YYYY'),
                );

                return _listMeeting;
            }
        }

        return [];
    },
);

// Lấy lịch đã khám rồi -> hide
export const filterGetScheduleAppointmentAndHide = createSelector(
    fetchApiAllCreateScheduleDoctorSelector,
    fetchApiAllScheduleDetailsSelector,
    btnOptionSelectDayOfWeekSelector,
    btnOptionUsernameDoctorGetScheduleSelector,
    (schedules, scheduleDetails, day, optionUsername) => {
        // console.log('all schedules', schedules);
        // console.log('all schedules details', scheduleDetails);
        // console.log('day', day);
        // console.log('day.getDay', day.getDay());
        // console.log('optionUsername ->', optionUsername);

        if (schedules?.length > 0) {
            const now = new Date();

            //Lấy tất cả lịch ngày hôm nay
            const _schedules = schedules.filter((_schedule) => {
                return now.getDay() === day.getDay() && now.getMonth() === day.getMonth()
                    ? new Date(_schedule['day']['day']).getDay() === day.getDay() &&
                          now.getHours() < new Date(_schedule['time']['time_start']).getHours()
                    : new Date(_schedule['day']['day']).getDay() === day.getDay();
            });
            // console.log('_schedules ->', _schedules);
            // console.log('now ->', now);
            // console.log('now.getDay() ->', typeof now.getDay());
            // console.log('now.getMonth() ->', now.getMonth());

            // Lấy tất cả chi tiết lịch ngày hôm nay(lịch đã đăng ký)
            const _scheduleDetails = scheduleDetails.filter(
                (_scheduleDetail) => new Date(_scheduleDetail.day_exam).getDay() === day.getDay(),
            );
            // console.log('_scheduleDetails', _scheduleDetails);

            // Lấy mảng ngày ra để so sánh
            const schedule_details_day_exams = _scheduleDetails.map((_schedule) => {
                return {
                    day_exam: _schedule.day_exam,
                    doctor_id: _schedule.doctor,
                };
            });
            // console.log('schedule_details_day_exams', schedule_details_day_exams);

            // Tạo thêm date_compare để so sánh
            const __schedules = _schedules
                .filter((__schedule) => __schedule.doctor.is_accepted && !__schedule.doctor.deleted)
                .map((_schedule) => {
                    const time = `${new Date(_schedule['time']['time_start']).getHours()}: ${new Date(
                        _schedule['time']['time_start'],
                    ).getMinutes()}`;

                    const dateStr = moment(day).format('DD/MM/YYYY');
                    const date = moment(dateStr);
                    const date_time = moment(time, 'HH:mm');
                    date.set({
                        hour: date_time.get('hour'),
                        minute: date_time.get('minute'),
                        second: date_time.get('second'),
                    });

                    return {
                        ..._schedule,
                        date_compare: date,
                        doctor_id: _schedule.doctor._id,
                    };
                });
            // console.log('__schedules', __schedules);

            // Tiến hành so sánh

            const final_schedule = __schedules.filter((_finalSchedule) => {
                // giờ
                const timeStart = moment(_finalSchedule.time.time_start).format('HH:mm');

                // ngày
                const scheduleDateStart = moment(
                    _finalSchedule.date_compare._i.split('/').reverse().join('/') + ' ' + timeStart,
                );
                // console.log('scheduleDateStart', scheduleDateStart);

                return !schedule_details_day_exams.some(
                    (_schedule) =>
                        moment(_schedule.day_exam).isSame(new Date(scheduleDateStart)) &&
                        _schedule.doctor_id === _finalSchedule.doctor_id,
                );
            });

            // console.log('final_schedule', final_schedule);

            const after_filter = final_schedule.filter((_schedule) => _schedule.doctor._id === optionUsername);

            if (optionUsername === 'all') {
                return final_schedule;
            } else {
                return after_filter.filter((_after_filter) =>
                    moment(
                        _after_filter.date_compare._i.split('/').reverse().join('/') +
                            ' ' +
                            moment(_after_filter.time.time_start).format('HH:mm'),
                    ),
                );
            }

            // return final_schedule;
        }

        return [];
    },
);

// filter notification -> get id conversation -> show screen (Doctor)
export const filterNotificationGetConversationId = createSelector(
    fetchApiNotificationByDoctorIdSelector,
    // getDayAndTimeScheduleMedicalALLFilterOfDoctor,
    getDayAndTimeScheduleMedicalMeetingFilterOfDoctor,
    (notifications, listSchedule) => {
        // console.log('notifications ->', notifications);
        // console.log('listSchedule ->', listSchedule);

        const _notifications = notifications.map((_notification) => {
            // conversation
            const _conversations = listSchedule?.find(
                (_conversation) => _conversation?.conversations?._id === _notification?.conversation_id, // notification chưa có conversation_id
            );

            // console.log('_conversations ->', _conversations);

            return {
                content: _notification?.content,
                createdAt: _notification?.createdAt,
                from: _notification?.from,
                hasSeen: _notification?.hasSeen,
                rule: _notification?.rule,
                to: _notification?.to,
                updatedAt: _notification?.updatedAt,
                _id: _notification?._id,
                conversation: _conversations,
            };
        });

        // console.log('_notifications ->', _notifications);
        return _notifications;
    },
);

// get message theo user (Doctor)
export const messageOfUserFilter = createSelector(
    fetchApiUserDoctorByTokenSelector,
    fetchApiMessagesSelector,
    fetchApiConversationsSelector,
    (user, listMessage, conversations) => {
        // console.log('user ->', user);
        // console.log('listMessage ->', listMessage);
        // console.log('conversations ->', conversations);

        const messages = listMessage.map((_message) => {
            const getMember = conversations.map((_conversation) => {
                const member =
                    _conversation.members[0]._id === user.doctor._id
                        ? _conversation.members[1]
                        : _conversation.members[0];

                return member;
            });
            // console.log('getMember ->', getMember);

            const test = getMember.find((_member) => _member._id === _message.senderId);

            const _user = _message?.senderId === user?.doctor?._id ? user : test; //getMember[0];
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

// get message theo user (Patient)
export const patientMessageOfUserFilter = createSelector(
    fetchApiAllPatientsSelector,
    fetchApiMessagesSelector,
    fetchApiConversationsOfPatientSelector,
    (user, listMessage, conversations) => {
        // console.log('user ->', user);
        // console.log('listMessage ->', listMessage);
        // console.log('conversations ->', conversations);

        const messages = listMessage.map((_message) => {
            const getMember = conversations.map((_conversation) => {
                const member =
                    _conversation.members[0]._id === user.patient._id
                        ? _conversation.members[1]
                        : _conversation.members[0];

                return member;
            });
            // console.log('getMember ->', getMember);

            const test = getMember.find((_member) => _member._id === _message.senderId);

            const _user = _message?.senderId === user?.patient?._id ? user : test;
            // console.log('_user ->>>>', _user);

            return {
                _id: _message?._id,
                content: _message?.content,
                conversation: _message?.conversation,
                createdAt: _message?.createdAt,
                images: _message?.images,
                updatedAt: _message?.updatedAt,
                senderId: _message?.senderId,
                user: {
                    patient: _user,
                },
            };
        });

        // // console.log('message selector ->', messages);

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
