// lib
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import './TableListScheduleMedicalMeeting.css';
import CartMeeting from './CartMeeting';
import { Select } from 'antd';
import patientSlice from '~/redux/features/patient/patientSlice';
import {
    fetchApiAllCreateDaysDoctor,
    fetchApiAllCreateScheduleDoctor,
    fetchApiAllScheduleDetails,
    fetchApiAllShiftsDoctor,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import { filterGetScheduleAppointmentAndHide } from '~/redux/selector';
import userSlice from '~/redux/features/user/userSlice';

function TableListScheduleMedicalMeeting({ infoUser }) {
    const dispatch = useDispatch();

    const schedules = useSelector(filterGetScheduleAppointmentAndHide);

    // console.log('schedule', schedules);

    useEffect(() => {
        dispatch(fetchApiAllScheduleDetails());
    }, []);

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
        dispatch(patientSlice.actions.arrivalFilterMeeting('all'));
    }, []);

    useEffect(() => {
        dispatch(userSlice.actions.btnOptionUsernameDoctorGetSchedule('all'));
    }, []);

    // handle filter meeting
    const handleChangeFilterMeeting = (value) => {
        dispatch(patientSlice.actions.arrivalFilterMeeting(value));
    };

    return (
        <>
            {/* Filter */}
            <div className="display-filter-meeting">
                <Select
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'date', label: 'Theo ngày (hôm nay)' },
                        { value: 'week', label: 'Theo tuần' },
                        { value: 'month', label: 'Theo tháng' },
                    ]}
                    defaultValue="all"
                    style={{ width: 175, zIndex: 99 }}
                    onSelect={handleChangeFilterMeeting}
                />
            </div>
            <div className="wrapper-schedule-medical-meeting">
                <CartMeeting infoUser={infoUser} schedules={schedules} />
            </div>
        </>
    );
}

export default TableListScheduleMedicalMeeting;
