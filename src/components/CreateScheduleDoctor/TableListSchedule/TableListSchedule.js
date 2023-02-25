// lib
import { Table } from 'antd';
import moment from 'moment';

// me
import './TableListSchedule.css';
import TitleName from '~/components/TitleName';

function TableListSchedule({ schedules }) {
    // console.log('schedules =', schedules);

    // cols
    const cols = [
        {
            key: '_id',
            title: '#',
            dataIndex: '_id',
        },
        {
            key: 'time_per_conversation',
            title: 'Thời gian khám',
            dataIndex: 'time_per_conversation',
        },
        {
            key: 'fee',
            title: 'Chi phí',
            dataIndex: 'fee',
        },
        {
            key: 'day',
            title: 'Thứ',
            dataIndex: 'day',
        },
        {
            key: 'time',
            title: 'Ca làm',
            dataIndex: 'time',
        },
        {
            key: 'doctor',
            title: 'Bác sĩ',
            dataIndex: 'doctor',
        },
    ];

    return (
        <>
            <TitleName>Danh Sách Đăng Ký Ca Làm Của Bác Sĩ</TitleName>

            <Table
                columns={cols}
                dataSource={schedules.map((schedule, index) => ({
                    _id: index + 1,
                    time_per_conversation: `${schedule.time_per_conversation} phút`,
                    fee: `${schedule.fee} VNĐ`,
                    day: moment(schedule.day.day).format('dddd'),
                    time: `${schedule.time.name} (${moment(new Date(schedule.time.time_start)).format(
                        'HH:mm',
                    )} -> ${moment(new Date(schedule.time.time_end)).format('HH:mm')})`,
                    doctor: schedule.doctor.person.username,
                }))}
                rowKey="_id"
                pagination={{
                    pageSize: 8,
                }}
                style={{ height: '300px' }}
                scroll={{ y: 400 }}
            ></Table>
        </>
    );
}

export default TableListSchedule;
