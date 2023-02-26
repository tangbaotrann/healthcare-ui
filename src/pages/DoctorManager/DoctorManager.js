// lib
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// me
import './DoctorManager.css';
import constants from '~/utils/constants';
import LayoutDoctorManager from '~/layouts/LayoutDoctorManager';
import {
    btnSelectMenuChangeLayoutSelector,
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
import socket from '~/utils/socket';
import TableListNotification from '~/components/TableListNotification';
import Conversation from '~/components/Conversation';

function DoctorManager() {
    const dispatch = useDispatch();

    const changeLayout = useSelector(btnSelectMenuChangeLayoutSelector);
    const infoUser = useSelector(fetchApiUserDoctorByTokenSelector);
    const schedules = useSelector(getIdDoctorFilter);
    const awaitAccept = useSelector(fetchApiUpdateInfoUserSelector);
    const checkAwaitAccept = useSelector(getDoctorLoginFilter);

    console.log(changeLayout);
    // console.log('checkUserLogin - doctor-manager', checkUserLogin);
    // console.log('awaitAccept', awaitAccept);
    // console.log('checkAwaitAccept', checkAwaitAccept);
    // console.log('schedules 27', schedules);

    // Test socket from server
    useEffect(() => {
        socket.on('from_server', (message) => {
            console.log(message);
        });
    }, []);

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
                {changeLayout === constants.layoutListRegisterSchedule || changeLayout === null ? (
                    <CreateScheduleDoctor infoUser={infoUser} schedules={schedules} />
                ) : changeLayout === constants.layoutScheduleMedical ? (
                    <TableListScheduleMedical />
                ) : changeLayout === constants.layoutListPatient ? (
                    <PatientList />
                ) : changeLayout === constants.layoutListNotification ? (
                    <TableListNotification />
                ) : changeLayout === constants.layoutListConversation ? (
                    <Conversation />
                ) : null}
            </LayoutDoctorManager>
        </>
    );
}

export default DoctorManager;
