// lib
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// me
import './DoctorManager.css';
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

function DoctorManager() {
    const dispatch = useDispatch();

    const changeLayout = useSelector(btnSelectMenuChangeLayoutSelector);
    const infoUser = useSelector(fetchApiUserDoctorByTokenSelector);
    const schedules = useSelector(getIdDoctorFilter);
    const awaitAccept = useSelector(fetchApiUpdateInfoUserSelector);
    const checkAwaitAccept = useSelector(getDoctorLoginFilter);

    // console.log(changeLayout);
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
                {changeLayout === '1' || changeLayout === null ? (
                    <CreateScheduleDoctor infoUser={infoUser} schedules={schedules} />
                ) : changeLayout === '2' ? (
                    <h2>Opt 2</h2>
                ) : null}
            </LayoutDoctorManager>
        </>
    );
}

export default DoctorManager;
