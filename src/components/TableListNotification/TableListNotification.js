// lib
import moment from 'moment';
import { Button, Table } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

// me
import './TableListNotification.css';
import TitleName from '../TitleName';
import { fetchApiUpdateSeenNotification } from '~/redux/features/notification/notificationSlice';

function TableListNotification({ notifications }) {
    const dispatch = useDispatch();

    // console.log('seenNotification', seenNotification);
    // console.log('updateHasSeen ->', updateHasSeen);

    // handle update seen notification
    const handleUpdateSeenNotification = (record) => {
        dispatch(fetchApiUpdateSeenNotification(record));
    };

    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
            width: '4%',
        },
        {
            key: 'content',
            title: 'Nội dung thông báo',
            dataIndex: 'content',
            width: '60%',
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo thông báo',
            dataIndex: 'createdAt',
        },
        {
            key: 'seen',
            title: 'Trạng thái',
            width: '12%',
            render: (record) => {
                return (
                    <>
                        {record.hasSeen === true ? (
                            <CheckOutlined className="check-is-seen" />
                        ) : (
                            <Button type="link" onClick={() => handleUpdateSeenNotification(record)}>
                                Xem tin nhắn
                            </Button>
                        )}
                    </>
                );
            },
            filters: [
                { text: 'Đã xem', value: true },
                { text: 'Chưa xem', value: false },
            ],
            onFilter: (value, record) => {
                return record.hasSeen === value;
            },
        },
    ];

    return (
        <>
            <TitleName>Danh Sách Các Thông Báo Hiện Có Của Bác Sĩ</TitleName>

            {/* Table list */}
            <Table
                columns={cols}
                dataSource={notifications.map((notification, index) => ({
                    index: index + 1,
                    content: notification.content,
                    createdAt: `${moment(notification.createdAt).format('DD-MM-YYYY')} lúc ${moment(
                        notification.createdAt,
                    ).format('HH:mm')}`,
                    hasSeen: notification.hasSeen,
                    _id: notification._id,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 8,
                }}
                style={{ height: '300px' }}
                scroll={{ y: 440 }}
            ></Table>
        </>
    );
}

export default TableListNotification;
