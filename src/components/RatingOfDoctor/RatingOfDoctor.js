import { Rate, Table } from 'antd';

import './RatingOfDoctor.css';
import TitleName from '../TitleName';

function RatingOfDoctor({ infoUser }) {
    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
        },
        {
            key: 'username',
            title: 'Họ tên',
            dataIndex: 'username',
        },
        {
            key: 'content',
            title: 'Nội dung đánh giá',
            dataIndex: 'content',
        },
        {
            key: 'rating',
            title: 'Lượt đánh giá',
            dataIndex: 'rating',
            render: (record) => {
                return <Rate defaultValue={record} disabled />;
            },
            filters: [
                { text: '1 Sao', value: 1 },
                { text: '2 Sao', value: 2 },
                { text: '3 Sao', value: 3 },
                { text: '4 Sao', value: 4 },
                { text: '5 Sao', value: 5 },
            ],
            onFilter: (value, record) => {
                return record.rating === value;
            },
        },
    ];

    return (
        <div className="wrapper-ratings">
            <TitleName>Đánh Giá Của Bệnh Nhân</TitleName>

            <Table
                columns={cols}
                dataSource={infoUser.doctor.ratings.map((_patient, index) => ({
                    index: index + 1,
                    username: _patient.patient_id.person.username,
                    content: _patient.content,
                    rating: _patient.rating,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 5,
                }}
                style={{ width: 650 }}
            ></Table>
        </div>
    );
}

export default RatingOfDoctor;
