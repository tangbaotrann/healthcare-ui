import moment from 'moment';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchApiGetAllScheduleDetailOfPatient } from '~/redux/features/scheduleDoctor/scheduleDoctorSlice';
import {
    filterRegisterScheduleAppointmentWithStatusFalse,
    filterRegisterScheduleAppointmentWithStatusTrue,
} from '~/redux/selector';

function TableListRegisterSchedule({ patients }) {
    const [status, setStatus] = useState(true);

    const dispatch = useDispatch();

    const scheduleDetailsStatusTrue = useSelector(filterRegisterScheduleAppointmentWithStatusTrue);
    const scheduleDetailsStatusFalse = useSelector(filterRegisterScheduleAppointmentWithStatusFalse);

    console.log('patients', patients);
    console.log('scheduleDetailsStatusTrue', scheduleDetailsStatusTrue);

    useEffect(() => {
        dispatch(fetchApiGetAllScheduleDetailOfPatient(patients?.patient?._id));
    }, [patients?.patient?._id]);

    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
        },
        {
            key: 'day_exam',
            title: 'Ngày khám',
            dataIndex: 'day_exam',
        },
        {
            key: 'content_exam',
            title: 'Nội dung',
            dataIndex: 'content_exam',
        },
        {
            key: 'fee',
            title: 'Chi phí',
            dataIndex: 'fee',
        },
        {
            key: 'time_per_conversation',
            title: 'Thời gian khám',
            dataIndex: 'time_per_conversation',
        },
    ];

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
                    Lịch chờ khám
                </Button>
            </div>

            {status ? (
                <Table
                    columns={cols}
                    dataSource={scheduleDetailsStatusTrue.map((schedule, index) => ({
                        index: index + 1,
                        day_exam: `${moment(schedule.day_exam).format('DD/MM/YYYY')} - ${moment(
                            schedule.day_exam,
                        ).format('HH:mm a')}`,
                        content_exam: schedule.content_exam,
                        fee: `${schedule.schedule.fee} VNĐ`,
                        time_per_conversation: `${schedule.schedule.time_per_conversation} phút`,
                    }))}
                    rowKey="index"
                ></Table>
            ) : (
                <Table
                    columns={cols}
                    dataSource={scheduleDetailsStatusFalse.map((schedule, index) => ({
                        index: index + 1,
                        day_exam: `${moment(schedule.day_exam).format('DD/MM/YYYY')} - ${moment(
                            schedule.day_exam,
                        ).format('HH:mm a')}`,
                        content_exam: schedule.content_exam,
                        fee: `${schedule.schedule.fee} VNĐ`,
                        time_per_conversation: `${schedule.schedule.time_per_conversation} phút`,
                    }))}
                    rowKey="index"
                ></Table>
            )}
        </>
    );
}

export default TableListRegisterSchedule;
