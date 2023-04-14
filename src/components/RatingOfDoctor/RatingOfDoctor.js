import { Rate, Table } from 'antd';

import './RatingOfDoctor.css';
import TitleName from '../TitleName';

function RatingOfDoctor() {
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
            key: 'feedback',
            title: 'Lượt đánh giá',
            dataIndex: 'feedback',
        },
    ];

    return (
        <div className="wrapper-ratings">
            <TitleName>Đánh Giá Của Bệnh Nhân</TitleName>

            {/* <Rate defaultValue={4} /> */}
            <Table columns={cols}></Table>
        </div>
    );
}

export default RatingOfDoctor;
