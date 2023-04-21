import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchApiGetAllScheduleDetailOfPatient } from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import {
    filterRegisterScheduleAppointmentWithStatusFalse,
    filterRegisterScheduleAppointmentWithStatusTrue,
} from '~/redux/selector';
import CardItemRegisterSchedule from '../CardItemRegisterSchedule';

function CardListRegisterSchedule({ patients }) {
    const [status, setStatus] = useState(true);

    const dispatch = useDispatch();

    const scheduleDetailsStatusTrue = useSelector(filterRegisterScheduleAppointmentWithStatusTrue);
    const scheduleDetailsStatusFalse = useSelector(filterRegisterScheduleAppointmentWithStatusFalse);

    // console.log('patients', patients);
    // console.log('scheduleDetailsStatusTrue', scheduleDetailsStatusTrue);

    useEffect(() => {
        dispatch(fetchApiGetAllScheduleDetailOfPatient(patients?.patient?._id));
    }, [patients?.patient?._id]);

    // handle status true
    const handleFilterRegisterStatusTrue = () => {
        setStatus(true);
    };

    // handle status false
    const handleFilterRegisterStatusFalse = () => {
        setStatus(false);
    };

    return (
        <>
            <div className="display-btn-filter-status-register-schedule">
                <Button
                    className={`${
                        status ? 'btn-filter-status-register-schedule-active' : 'btn-filter-status-register-schedule'
                    }`}
                    onClick={handleFilterRegisterStatusTrue}
                >
                    Lịch khám
                </Button>
                <Button
                    className={`${
                        !status ? 'btn-filter-status-register-schedule-active' : 'btn-filter-status-register-schedule'
                    }`}
                    onClick={handleFilterRegisterStatusFalse}
                >
                    Lịch chờ Bác sĩ xác nhận khám
                </Button>
            </div>

            {status ? (
                <>
                    {scheduleDetailsStatusTrue.length > 0 ? (
                        scheduleDetailsStatusTrue.map((schedule) => {
                            return <CardItemRegisterSchedule schedule={schedule} key={schedule._id} />;
                        })
                    ) : (
                        <p className="message-empty-schedule">
                            <i>-- Bạn chưa có lịch khám nào --</i>
                        </p>
                    )}
                </>
            ) : (
                <>
                    {scheduleDetailsStatusFalse.length > 0 ? (
                        scheduleDetailsStatusFalse.map((schedule) => {
                            return <CardItemRegisterSchedule schedule={schedule} key={schedule._id} />;
                        })
                    ) : (
                        <p className="message-empty-schedule">
                            <i>-- Bạn chưa có lịch chờ nào --</i>
                        </p>
                    )}
                </>
            )}
        </>
    );
}

export default CardListRegisterSchedule;
