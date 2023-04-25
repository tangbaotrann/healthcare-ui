import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import './NotificationsPage.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { fetchApiAllPatientsSelector, fetchApiNotificationByPatientIdSelector } from '~/redux/selector';
import TitleName from '~/components/TitleName';
import notificationSlice, {
    fetchApiNotificationByPatientId,
    fetchApiUpdateSeenNotificationPatient,
} from '~/redux/features/notification/notificationSlice';
import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import socket from '~/utils/socket';

function NotificationsPage() {
    const dispatch = useDispatch();

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const notifications = useSelector(fetchApiNotificationByPatientIdSelector);

    // console.log('notifications', notifications);
    // console.log('patients', patients);

    useEffect(() => {
        socket.on('notification_confirm_register_schedule_success', ({ notification }) => {
            console.log('notification_confirm_register_schedule_success', notification);
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromDoctorSuccess(notification));
        });
    }, []);

    useEffect(() => {
        socket.emit('add_user', patients?.patient?._id);
        socket.on('get_users', (users) => {
            console.log('user ->', users);
        });
    }, [patients?.patient?._id]);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    useEffect(() => {
        dispatch(fetchApiNotificationByPatientId(patients?.patient?._id));
    }, [patients?.patient?._id]);

    // handle update seen notification
    const handleUpdateSeenNotification = (record) => {
        dispatch(fetchApiUpdateSeenNotificationPatient(record));
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
        <DefaultLayout patients={patients}>
            <div className="wrapper-notification-patient">
                <TitleName>Danh Sách Các Thông Báo Của Bạn</TitleName>

                <Table
                    columns={cols}
                    dataSource={notifications.map((_notification, index) => ({
                        index: index + 1,
                        content: _notification.content,
                        createdAt: `${moment(_notification.createdAt).format('DD-MM-YYYY')} lúc ${moment(
                            _notification.createdAt,
                        ).format('HH:mm a')}`,
                        hasSeen: _notification.hasSeen,
                        _id: _notification._id,
                        rule: _notification.rule,
                        // conversation: _notification.conversation,
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
            </div>

            {/* Show toast notification */}
            {/* <ToastContainer position="top-right" autoClose={4000} closeOnClick={false} /> */}
        </DefaultLayout>
    );
}

export default NotificationsPage;
