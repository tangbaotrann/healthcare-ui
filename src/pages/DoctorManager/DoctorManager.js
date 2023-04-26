// lib
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// me
import './DoctorManager.css';
import constants from '~/utils/constants';
import LayoutDoctorManager from '~/layouts/LayoutDoctorManager';
import {
    btnSelectMenuChangeLayoutSelector,
    fetchApiNotificationByDoctorIdSelector,
    fetchApiScheduleMedicalAppointmentResultExamSelector,
    fetchApiUpdateInfoUserSelector,
    fetchApiUserDoctorByTokenSelector,
    filterTotalFee,
    filterTotalFeeOfMonth,
    filterTotalFeeOfWeek,
    getDoctorLoginFilter,
    getIdDoctorFilter,
    isLoadingAllPostByIdDoctorSelector,
    isLoadingAllShiftsDoctorSelector,
    isLoadingConversationsSelector,
    isLoadingNotificationSelector,
    isLoadingScheduleDetailByIdDoctorSelector,
    isLoadingScheduleDoctorSelector,
    isLoadingUserDoctorByTokenSelector,
    scheduleMedicalMeetingFilterOfDoctor,
} from '~/redux/selector';
import CreateScheduleDoctor from '~/components/CreateScheduleDoctor';
import {
    fetchApiAllCreateDaysDoctor,
    fetchApiAllCreateScheduleDoctor,
    fetchApiAllShiftsDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import AwaitBrowsingAccountDoctor from '~/components/AwaitBrowsingAccountDoctor';
import { fetchApiUserDoctors } from '~/redux/features/user/userSlice';
import PatientList from '~/components/PatientList';
import TableListScheduleMedical from '~/components/TableListScheduleMedical';
import TableListNotification from '~/components/TableListNotification';
import Conversation from '~/components/Conversation';
import Dashboard from '~/components/Dashboard';
import { fetchApiNotificationByDoctorId } from '~/redux/features/notification/notificationSlice';
import {
    fetchApiScheduleDetailByIdDoctor,
    fetchApiScheduleMedicalAppointment,
    fetchApiScheduleMedicalAppointmentAwait,
    fetchApiScheduleMedicalAppointmentResultExam,
} from '~/redux/features/patient/patientSlice';
import ResultHeathPatient from '~/components/ResultHeathPatient/ResultHeathPatient';
import { LoadingOutlined } from '@ant-design/icons';
import TableListScheduleMedicalMeeting from '~/components/TableListScheduleMedicalMeeting';
import Blog from '~/components/Blog';

function DoctorManager() {
    const dispatch = useDispatch();

    const changeLayout = useSelector(btnSelectMenuChangeLayoutSelector);
    const infoUser = useSelector(fetchApiUserDoctorByTokenSelector);
    const schedules = useSelector(getIdDoctorFilter);
    const feeOfPatientResultedExam = useSelector(fetchApiScheduleMedicalAppointmentResultExamSelector);
    const totalFee = useSelector(filterTotalFee);
    const totalFeeOfWeek = useSelector(filterTotalFeeOfWeek);
    const totalFeeOfMonth = useSelector(filterTotalFeeOfMonth);
    const awaitAccept = useSelector(fetchApiUpdateInfoUserSelector);
    const checkAwaitAccept = useSelector(getDoctorLoginFilter);
    const getIdDoctor = useSelector(getDoctorLoginFilter);
    const notifications = useSelector(fetchApiNotificationByDoctorIdSelector); // filterNotifications

    // loading
    const isLoadingScheduleDoctor = useSelector(isLoadingScheduleDoctorSelector);
    const isLoadingNotification = useSelector(isLoadingNotificationSelector);
    const isLoadingUser = useSelector(isLoadingUserDoctorByTokenSelector);
    const isLoadingScheduleDetail = useSelector(isLoadingScheduleDetailByIdDoctorSelector);
    const isLoadingConversation = useSelector(isLoadingConversationsSelector);
    const isLoadingAllShiftsDoctor = useSelector(isLoadingAllShiftsDoctorSelector);
    const isLoadingAllPostByIdDoctor = useSelector(isLoadingAllPostByIdDoctorSelector);

    // console.log('scheduleMedicalsMeetingFilter', scheduleMedicalsMeetingFilter);
    // console.log('scheduleMedicalsMeetingFilter', scheduleMedicalsMeetingFilter);
    // console.log('fee', totalFee);
    // console.log('totalFeeOfWeek', totalFeeOfWeek);
    // console.log('totalFeeOfMonth', totalFeeOfMonth);
    // console.log('feeOfPatientResultedExam', feeOfPatientResultedExam);
    // console.log(changeLayout);
    // console.log(infoUser);
    // console.log('getIdDoctor', getIdDoctor);
    // console.log('checkUserLogin - doctor-manager', checkUserLogin);
    // console.log('awaitAccept', awaitAccept);
    // console.log('checkAwaitAccept', checkAwaitAccept);
    // console.log('schedules 46 ->', schedules);

    useEffect(() => {
        dispatch(fetchApiAllCreateScheduleDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllCreateDaysDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllShiftsDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiNotificationByDoctorId(getIdDoctor?._id));
    }, [getIdDoctor?._id]);

    useEffect(() => {
        dispatch(fetchApiUserDoctors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiScheduleMedicalAppointment(getIdDoctor?._id));
    }, [getIdDoctor?._id]);

    useEffect(() => {
        dispatch(fetchApiScheduleMedicalAppointmentAwait(getIdDoctor?._id));
    }, [getIdDoctor?._id]);

    useEffect(() => {
        dispatch(fetchApiScheduleMedicalAppointmentResultExam(getIdDoctor?._id));
    }, [getIdDoctor?._id]);

    useEffect(() => {
        dispatch(fetchApiScheduleDetailByIdDoctor(getIdDoctor?._id));
    }, [getIdDoctor?._id]);

    return (
        <>
            {(awaitAccept?.data?.is_accepted === false || checkAwaitAccept?.is_accepted === false) && (
                <AwaitBrowsingAccountDoctor awaitAccept={awaitAccept} />
            )}
            {(isLoadingScheduleDoctor ||
                isLoadingNotification ||
                isLoadingUser ||
                isLoadingScheduleDetail ||
                isLoadingConversation ||
                isLoadingAllShiftsDoctor ||
                isLoadingAllPostByIdDoctor) && (
                <div className="loading-main">
                    <div className="loader"></div>
                </div>
            )}
            <LayoutDoctorManager infoUser={infoUser}>
                {changeLayout === constants.layoutDashboard || changeLayout === null ? (
                    <>
                        {/* {isLoadingScheduleDoctor ||
                        isLoadingNotification ||
                        isLoadingUser ||
                        isLoadingScheduleDetail ? (
                            <LoadingOutlined className="icon-loading-dashboard" spin />
                        ) : (
                            )} */}
                        <Dashboard
                            schedules={schedules}
                            totalFee={totalFee}
                            feeOfPatientResultedExam={feeOfPatientResultedExam}
                            totalFeeOfWeek={totalFeeOfWeek}
                            totalFeeOfMonth={totalFeeOfMonth}
                        />
                    </>
                ) : changeLayout === constants.layoutListRegisterSchedule ? (
                    <CreateScheduleDoctor infoUser={infoUser} schedules={schedules} />
                ) : changeLayout === constants.layoutScheduleMedical ? (
                    <TableListScheduleMedical infoUser={infoUser} />
                ) : changeLayout === constants.layoutScheduleMedicalMeeting ? (
                    <TableListScheduleMedicalMeeting infoUser={infoUser} />
                ) : changeLayout === constants.layoutListPatient ? (
                    <PatientList />
                ) : changeLayout === constants.layoutResultHealthPatient ? (
                    <ResultHeathPatient />
                ) : changeLayout === constants.layoutListNotification ? (
                    <TableListNotification notifications={notifications} infoUser={infoUser} />
                ) : changeLayout === constants.layoutListConversation ? (
                    <Conversation infoUser={infoUser} />
                ) : changeLayout === constants.layoutBlog ? (
                    <Blog infoUser={infoUser} />
                ) : null}
            </LayoutDoctorManager>
        </>
    );
}

export default DoctorManager;
