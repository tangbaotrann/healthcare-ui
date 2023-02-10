// lib
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// me
import './DoctorManager.css';
import LayoutDoctorManager from '~/layouts/LayoutDoctorManager';
import {
    btnSelectMenuChangeLayoutSelector,
    fetchApiUserDoctorByTokenSelector,
    getIdDoctorFilter,
} from '~/redux/selector';
import CreateScheduleDoctor from '~/components/CreateScheduleDoctor';
import {
    fetchApiAllCreateScheduleDoctor,
    fetchApiScheduleByIdDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';

function DoctorManager() {
    const dispatch = useDispatch();

    const changeLayout = useSelector(btnSelectMenuChangeLayoutSelector);
    const infoUser = useSelector(fetchApiUserDoctorByTokenSelector);
    const schedules = useSelector(getIdDoctorFilter);

    // console.log(changeLayout);
    console.log('schedules 27', schedules);

    useEffect(() => {
        dispatch(fetchApiAllCreateScheduleDoctor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchApiScheduleByIdDoctor(schedules.doctor));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutDoctorManager>
            {changeLayout === '1' || changeLayout === null ? (
                <CreateScheduleDoctor infoUser={infoUser} schedules={schedules} />
            ) : changeLayout === '2' ? (
                <h2>Opt 2</h2>
            ) : null}
        </LayoutDoctorManager>
    );
}

export default DoctorManager;
