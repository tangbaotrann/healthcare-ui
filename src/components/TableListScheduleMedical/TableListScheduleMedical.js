// lib
import { Table } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getDayAndTimeScheduleMedicalFilterOfDoctor } from '~/redux/selector';

// me
import TitleName from '../TitleName';

function TableListScheduleMedical() {
    const scheduleMedicalsFilter = useSelector(getDayAndTimeScheduleMedicalFilterOfDoctor);
    // console.log('scheduleMedicalsFilter', scheduleMedicalsFilter);

    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
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
            key: 'content_exam',
            title: 'Nội dung khám bệnh',
            dataIndex: 'content_exam',
        },
    ];

    return (
        <>
            <TitleName>Danh Sách Lịch Khám Của Bác Sĩ</TitleName>

            {/* return: { info patient } -> get info */}
            <Table
                columns={cols}
                dataSource={scheduleMedicalsFilter.map((scheduleMedical, index) => ({
                    index: index + 1,
                    day: moment(scheduleMedical.days.day).format('dddd'),
                    time: `${scheduleMedical.shifts.name} (${moment(new Date(scheduleMedical.shifts.time_start)).format(
                        'HH:mm',
                    )} -> ${moment(new Date(scheduleMedical.shifts.time_end)).format('HH:mm')})`,
                    time_per_conversation: `${scheduleMedical.schedule.time_per_conversation} phút`,
                    fee: `${scheduleMedical.schedule.fee} VNĐ`,
                    content_exam: scheduleMedical.content_exam,
                }))}
                rowKey="index"
            ></Table>
        </>
    );
}

export default TableListScheduleMedical;
