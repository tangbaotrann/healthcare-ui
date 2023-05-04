import { Button, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import scheduleDoctor, {
    fetchApiGetAllScheduleDetailOfPatient,
} from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import {
    filterRegisterScheduleAppointmentWithStatusFalse,
    filterRegisterScheduleAppointmentWithStatusTrue,
    isLoadingGetAllScheduleDetailOfPatient,
} from '~/redux/selector';
import CardItemRegisterSchedule from '../CardItemRegisterSchedule';
import socket from '~/utils/socket';
import ButtonLoadMore from '~/components/ButtonLoadMore/ButtonLoadMore';

function CardListRegisterSchedule({ patients }) {
    const [status, setStatus] = useState(true);
    const [visible, setVisible] = useState(5);

    const dispatch = useDispatch();

    const scheduleDetailsStatusTrue = useSelector(filterRegisterScheduleAppointmentWithStatusTrue);
    const scheduleDetailsStatusFalse = useSelector(filterRegisterScheduleAppointmentWithStatusFalse);
    const isLoading = useSelector(isLoadingGetAllScheduleDetailOfPatient);

    // console.log('patients', patients);
    // console.log('scheduleDetailsStatusTrue', scheduleDetailsStatusTrue);
    // console.log('scheduleDetailsStatusFalse', scheduleDetailsStatusFalse);
    // console.log('visible', visible);

    useEffect(() => {
        socket.on('notification_confirm_register_schedule_success', ({ notification }) => {
            console.log('notification_confirm_register_schedule_success', notification);
            dispatch(scheduleDoctor.actions.arrivalScheduleDetailOfPatientStatusFalse(notification.schedule_detail_id));
        });
    }, []);

    useEffect(() => {
        socket.on('notification_register_schedule_from_patient_success', ({ schedule_detail }) => {
            console.log('notification_register_schedule_from_patient_success', schedule_detail);
            dispatch(scheduleDoctor.actions.arrivalDeleteScheduleMedicalAppointmentAwait(schedule_detail));
        });
    }, []);

    useEffect(() => {
        dispatch(fetchApiGetAllScheduleDetailOfPatient(patients?.patient?._id));
    }, [patients?.patient?._id]);

    // handle status true
    const handleFilterRegisterStatusTrue = () => {
        setStatus(true);
        dispatch(fetchApiGetAllScheduleDetailOfPatient(patients?.patient?._id));
    };

    // handle status false
    const handleFilterRegisterStatusFalse = () => {
        setStatus(false);
    };

    const handleShowMoreCards = () => {
        setVisible((prev) => prev + 5);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleLessCards = () => {
        setVisible(5);
        window.scrollTo({
            top: 100,
            behavior: 'smooth',
        });
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
                    {scheduleDetailsStatusTrue?.length > 0 ? (
                        <>
                            {isLoading ? (
                                <Skeleton active />
                            ) : (
                                scheduleDetailsStatusTrue.slice(0, visible).map((schedule) => {
                                    return (
                                        <CardItemRegisterSchedule
                                            schedule={schedule}
                                            patients={patients}
                                            key={schedule._id}
                                        />
                                    );
                                })
                            )}
                        </>
                    ) : (
                        <p className="message-empty-schedule">
                            <i>-- Bạn chưa có lịch khám nào --</i>
                        </p>
                    )}
                </>
            ) : (
                <>
                    {scheduleDetailsStatusFalse?.length > 0 ? (
                        <>
                            {isLoading ? (
                                <Skeleton active />
                            ) : (
                                scheduleDetailsStatusFalse.map((schedule) => {
                                    return (
                                        <CardItemRegisterSchedule
                                            schedule={schedule}
                                            patients={patients}
                                            key={schedule._id}
                                        />
                                    );
                                })
                            )}
                        </>
                    ) : (
                        <p className="message-empty-schedule">
                            <i>-- Bạn chưa có lịch chờ nào --</i>
                        </p>
                    )}
                </>
            )}

            {scheduleDetailsStatusTrue?.length >= 5 && visible < scheduleDetailsStatusTrue?.length ? (
                <ButtonLoadMore onClick={handleShowMoreCards}>Xem thêm</ButtonLoadMore>
            ) : visible > 5 && visible >= scheduleDetailsStatusTrue?.length ? (
                <ButtonLoadMore onClick={handleLessCards}>Thu gọn</ButtonLoadMore>
            ) : null}

            {scheduleDetailsStatusFalse?.length >= 5 && visible < scheduleDetailsStatusFalse?.length ? (
                <ButtonLoadMore onClick={handleShowMoreCards}>Xem thêm</ButtonLoadMore>
            ) : visible > 5 && visible >= scheduleDetailsStatusFalse?.length ? (
                <ButtonLoadMore onClick={handleLessCards}>Thu gọn</ButtonLoadMore>
            ) : null}
        </>
    );
}

export default CardListRegisterSchedule;
