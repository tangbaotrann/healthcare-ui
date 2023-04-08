// lib
import moment from 'moment';
import { useState } from 'react';
import { Button, Modal, Table, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// me
import './TableListNotification.css';
import TitleName from '../TitleName';
import { fetchApiUpdateSeenNotification } from '~/redux/features/notification/notificationSlice';
import { filterNotificationGetConversationId } from '~/redux/selector';
import Conversation from '../Conversation/Conversation';
import conversationSlice from '~/redux/features/conversation/conversationSlice';
import { fetchApiMessages } from '~/redux/features/message/messageSlice';

function TableListNotification({ notifications, infoUser }) {
    const [record, setRecord] = useState({});
    const [showModalConversation, setShowModalConversation] = useState(false);
    const dispatch = useDispatch();

    const getConversationFromNotification = useSelector(filterNotificationGetConversationId);
    // const checkConversation = useSelector(btnClickedRecordGetIdConversationSelector);

    // console.log('notifications ->', notifications);
    // console.log('getConversationFromNotification ->', getConversationFromNotification);
    // console.log('seenNotification', seenNotification);
    // console.log('updateHasSeen ->', updateHasSeen);
    // console.log('checkConversation ->', checkConversation);

    // handle update seen notification
    const handleUpdateSeenNotification = (record) => {
        dispatch(fetchApiUpdateSeenNotification(record));
    };

    // handle show modal
    const handleShowModalConversation = (record) => {
        console.log('rec', record);

        if (record.conversation === undefined) {
            message.error('Chưa có cuộc trò chuyện!');
            return;
        }

        if (record.conversation.conversation._id) {
            dispatch(conversationSlice.actions.arrivalIdConversation(record.conversation.conversation)); //arrivalFromRecordIdConversation obj conversation filter
            dispatch(fetchApiMessages(record.conversation.conversation._id));
            setRecord(record);
            setShowModalConversation(true);
        }
    };

    // hide modal
    const hideModalConversation = () => {
        setShowModalConversation(false);
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
            width: '50%',
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
                                Xem
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
        {
            key: 'show-message',
            title: 'Lọc',
            render: (record) => {
                return (
                    <Button
                        onClick={() => handleShowModalConversation(record)}
                        className="notification-show-message-btn"
                    >
                        Nhắn tin
                    </Button>
                );
            },
            filters: [
                { text: 'Bác sĩ nhắc nhở', value: 'RULE_DOCTOR_REMIND' },
                { text: 'Đăng ký lịch', value: 'RULE_NOTIFICATION_REGISTER_SCHEDULE' },
                { text: 'Hủy lịch', value: 'RULE_NOTIFICATION_CANCEL_SCHEDULE' },
                { text: 'Hệ thống', value: 'RULE_SYSTEM' },
                { text: 'Cảnh báo', value: 'RULE_WARNING' },
                { text: 'Báo động', value: 'RULE_SOS' },
            ],
            onFilter: (value, record) => {
                return record.rule === value;
            },
        },
    ];

    return (
        <>
            {/* Modal conversation */}
            <Modal
                open={showModalConversation}
                onCancel={hideModalConversation}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1200}
            >
                {record ? (
                    <Conversation
                        infoUser={infoUser}
                        // checkConversation={checkConversation}
                        // recordConversation={record.conversation.conversation}
                    />
                ) : null}
            </Modal>

            <TitleName>Danh Sách Các Thông Báo Hiện Có Của Bác Sĩ</TitleName>

            {/* Table list */}
            <Table
                columns={cols}
                dataSource={getConversationFromNotification.map((_notification, index) => ({
                    index: index + 1,
                    content: _notification.content,
                    createdAt: `${moment(_notification.createdAt).format('DD-MM-YYYY')} lúc ${moment(
                        _notification.createdAt,
                    ).format('HH:mm a')}`,
                    hasSeen: _notification.hasSeen,
                    _id: _notification._id,
                    rule: _notification.rule,
                    conversation: _notification.conversation,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 8,
                }}
                rowClassName={(record, index) =>
                    record.rule === 'RULE_DOCTOR_REMIND'
                        ? 'custom-row-rule-doctor-remind'
                        : record.rule === 'RULE_NOTIFICATION_REGISTER_SCHEDULE'
                        ? 'custom-row-noti-reg-schedule'
                        : record.rule === 'RULE_NOTIFICATION_CANCEL_SCHEDULE'
                        ? 'custom-row-noti-cancel-schedule'
                        : record.rule === 'RULE_SYSTEM'
                        ? 'custom-row-rule-system'
                        : record.rule === 'RULE_WARNING'
                        ? 'custom-row-rule-warning'
                        : record.rule === 'RULE_SOS'
                        ? 'custom-row-rule-sos'
                        : 'custom-row-else'
                }
                style={{ height: '300px' }}
                scroll={{ y: 440 }}
            ></Table>
        </>
    );
}

export default TableListNotification;
