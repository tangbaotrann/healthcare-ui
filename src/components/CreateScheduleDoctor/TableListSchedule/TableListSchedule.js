// lib
import { Table } from 'antd';

// me
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
            <TitleName>Danh sách đã đăng ký ca lịch của Bác sĩ</TitleName>

            <Table
                columns={cols}
                dataSource={schedules.map((schedule, index) => ({
                    // schedule._id
                    _id: index + 1,
                    time_per_conversation: `${schedule.time_per_conversation} phút`,
                    fee: `${schedule.fee} VNĐ`,
                    day: schedule.day.day,
                    time: `${schedule.time.name} (${schedule.time.desc})`,
                    doctor: schedule.doctor.person.username,
                }))}
                rowKey="_id"
            ></Table>
        </>
    );
}

export default TableListSchedule;
