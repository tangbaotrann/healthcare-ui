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
    fetchApiUpdateInfoUserSelector,
    fetchApiUserDoctorByTokenSelector,
    getDoctorLoginFilter,
    getIdDoctorFilter,
} from '~/redux/selector';
import CreateScheduleDoctor from '~/components/CreateScheduleDoctor';
import {
    fetchApiAllCreateScheduleDoctor,
    fetchApiScheduleByIdDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import AwaitBrowsingAccountDoctor from '~/components/AwaitBrowsingAccountDoctor';
import { fetchApiUserDoctors } from '~/redux/features/user/userSlice';
import PatientList from '~/components/PatientList';
import TableListScheduleMedical from '~/components/TableListScheduleMedical';
import TableListNotification from '~/components/TableListNotification';
import Conversation from '~/components/Conversation';
import Meeting from '~/components/Meeting';
import Dashboard from '~/components/Dashboard';

function DoctorManager() {
    const dispatch = useDispatch();

    const changeLayout = useSelector(btnSelectMenuChangeLayoutSelector);
    const infoUser = useSelector(fetchApiUserDoctorByTokenSelector);
    const schedules = useSelector(getIdDoctorFilter);
    const awaitAccept = useSelector(fetchApiUpdateInfoUserSelector);
    const checkAwaitAccept = useSelector(getDoctorLoginFilter);

    const notifications = useSelector(fetchApiNotificationByDoctorIdSelector); // filterNotifications

    // console.log(changeLayout);
    // console.log(infoUser);
    // console.log('checkUserLogin - doctor-manager', checkUserLogin);
    // console.log('awaitAccept', awaitAccept);
    // console.log('checkAwaitAccept', checkAwaitAccept);
    // console.log('schedules 27', schedules);

    useEffect(() => {
        dispatch(fetchApiAllCreateScheduleDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiUserDoctors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiScheduleByIdDoctor(schedules.doctor));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {(awaitAccept?.data?.isAccepted === false || checkAwaitAccept?.isAccepted === false) && (
                <AwaitBrowsingAccountDoctor awaitAccept={awaitAccept} />
            )}
            <LayoutDoctorManager infoUser={infoUser}>
                {changeLayout === constants.layoutDashboard || changeLayout === null ? (
                    <Dashboard />
                ) : changeLayout === constants.layoutListRegisterSchedule ? (
                    <CreateScheduleDoctor infoUser={infoUser} schedules={schedules} />
                ) : changeLayout === constants.layoutScheduleMedical ? (
                    <TableListScheduleMedical />
                ) : changeLayout === constants.layoutListPatient ? (
                    <PatientList />
                ) : changeLayout === constants.layoutListNotification ? (
                    <TableListNotification notifications={notifications} />
                ) : changeLayout === constants.layoutListConversation ? (
                    <Conversation />
                ) : changeLayout === constants.layoutMeeting ? (
                    <Meeting infoUser={infoUser} />
                ) : null}
            </LayoutDoctorManager>
        </>
    );
}

export default DoctorManager;
