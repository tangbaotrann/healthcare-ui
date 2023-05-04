// lib
import { Table } from 'antd';
import moment from 'moment';

// me
import './TableListSchedule.css';
import TitleName from '~/components/TitleName';
import 'moment/locale/vi'; // without this line it didn't work
moment.locale('vi');

function TableListSchedule({ schedules }) {
    // console.log('schedules =', schedules);

    // cols
    const cols = [
        {
            key: '_id',
            title: '#',
            dataIndex: '_id',
            width: '4%',
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
            filters: [
                { text: 'Monday', value: 'Monday' },
                { text: 'Tuesday', value: 'Tuesday' },
                { text: 'Wednesday', value: 'Wednesday' },
                { text: 'Thursday', value: 'Thursday' },
                { text: 'Friday', value: 'Friday' },
                { text: 'Saturday', value: 'Saturday' },
                { text: 'Sunday', value: 'Sunday' },
            ],
            onFilter: (value, record) => {
                return record.day === value;
            },
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

            <div style={{ marginBottom: '12px' }}>
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
                ></Table>
            </div>
        </>
    );
}

export default TableListSchedule;
