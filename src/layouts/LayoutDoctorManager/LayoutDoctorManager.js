// lib
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClockCircleOutlined } from '@ant-design/icons';
import {
    CommentOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    OrderedListOutlined,
    ScheduleOutlined,
    SolutionOutlined,
    TableOutlined,
} from '@ant-design/icons/lib/icons';
import { Badge, Layout, Menu, Popover, Skeleton, Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// me
import './LayoutDoctorManager.css';
import constants from '~/utils/constants';
import { endPoints } from '~/routers';
import InformationOfDoctor from '~/components/InformationOfDoctor';
import layoutSlice from '~/redux/features/layout/layoutSlice';
import { fetchApiLoginSelector, filterNotificationNotHasSeen, getDoctorLoginFilter } from '~/redux/selector';
import {
    fetchApiScheduleDetailByIdDoctor,
    fetchApiScheduleMedicalAppointment,
    fetchApiScheduleMedicalAppointmentAwait,
} from '~/redux/features/patient/patientSlice';
import ParticlesBackground from '~/components/ParticlesBackground';
import notificationSlice, { fetchApiNotificationByDoctorId } from '~/redux/features/notification/notificationSlice';
import { fetchApiConversations } from '~/redux/features/conversation/conversationSlice';
import socket from '~/utils/socket';
import { logo } from '~/asset/images';
import { fetchApiAllPostByIdDoctor } from '~/redux/features/blog/blogSlice';
import { fetchApiUserDoctorByToken } from '~/redux/features/user/userSlice';
import messageSlice from '~/redux/features/message/messageSlice';

const { Header, Sider, Content } = Layout;

function LayoutDoctorManager({ children, infoUser, isLoadingUser, isLoadingNotification }) {
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    const getIdDoctor = useSelector(getDoctorLoginFilter);
    const notificationNotHasSeen = useSelector(filterNotificationNotHasSeen);
    const token = useSelector(fetchApiLoginSelector);

    // console.log('getIdDoctor', getIdDoctor);
    // console.log('totalNotifications', totalNotifications);
    // console.log('notificationNotHasSeen', notificationNotHasSeen);
    // console.log('token', token);

    useEffect(() => {
        socket.on('notification_confirm_register_schedule_success', ({ notification }) => {
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(notification));
        });
    }, []);

    useEffect(() => {
        socket.on('notification_register_schedule_from_patient_success', ({ notification }) => {
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(notification));
        });
    }, []);

    useEffect(() => {
        socket.on('like_post_from_patient', ({ author, title }) => {
            toast.success(`Bệnh nhân đã thích bài viết "${title}" này của bạn`);
        });
    }, []);

    // socket not accept call
    useEffect(() => {
        socket.on('call_now_not_accept_to_user_success', ({ small_id, roomId, schedule_details_id }) => {
            dispatch(
                messageSlice.actions.arrivalMessageNotAcceptCall({
                    small_id: small_id,
                    schedule_details_id: schedule_details_id,
                }),
            );
        });
    }, []);

    useEffect(() => {
        if (token.accessToken) {
            dispatch(fetchApiUserDoctorByToken(token.accessToken));
        } else {
            dispatch(fetchApiUserDoctorByToken(token.accessToken));
        }
    }, [token.accessToken]);

    useEffect(() => {
        socket.emit('add_user', getIdDoctor?._id);

        socket.on('get_users', (users) => {
            // console.log('user ->', users);
        });
    }, [getIdDoctor?._id]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width={230} className="sidebar">
                {!collapsed && <img className="logo-primary" src={logo.logo} alt="logo" />}
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[constants.layoutDashboard]}
                    style={{ fontSize: '1.5rem', fontWeight: '800' }}
                    items={[
                        {
                            key: constants.layoutDashboard,
                            icon: <TableOutlined />,
                            label: 'Bảng điều khiển',
                        },
                        {
                            key: constants.layoutListNotification,
                            icon: (
                                <>
                                    {!collapsed && notificationNotHasSeen?.length > 0 ? (
                                        <Space size="small">
                                            <Badge
                                                count={notificationNotHasSeen?.length}
                                                overflowCount={99}
                                                size="default"
                                                offset={[155, 6]}
                                            >
                                                <NotificationOutlined style={{ color: 'black', marginRight: '6px' }} />
                                            </Badge>
                                        </Space>
                                    ) : (
                                        <Space size="small">
                                            <Badge
                                                count={notificationNotHasSeen?.length}
                                                overflowCount={99}
                                                size="small"
                                                offset={[10, 8]}
                                            >
                                                <NotificationOutlined style={{ color: 'black', marginRight: '6px' }} />
                                            </Badge>
                                        </Space>
                                    )}
                                </>
                            ),
                            label: !collapsed ? 'Thông báo' : null,
                        },
                        {
                            key: constants.layoutListRegisterSchedule,
                            icon: <ClockCircleOutlined />,
                            label: 'Quản lý ca làm',
                        },
                        {
                            key: '3',
                            icon: <ScheduleOutlined />,
                            label: 'Quản lý lịch khám',
                            children: [
                                { label: 'Lịch hẹn khám', key: constants.layoutScheduleMedical },
                                { label: 'Cuộc hẹn khám', key: constants.layoutScheduleMedicalMeeting },
                            ],
                        },
                        {
                            key: '4',
                            icon: <OrderedListOutlined />,
                            label: 'Quản lý bệnh nhân',
                            children: [
                                { label: 'Danh sách bệnh nhân', key: constants.layoutListPatient },
                                { label: 'Kết quả khám', key: constants.layoutResultHealthPatient },
                            ],
                        },
                        {
                            key: constants.layoutListConversation,
                            icon: <CommentOutlined />,
                            label: 'Cuộc trò chuyện',
                        },
                        {
                            key: constants.layoutBlog,
                            icon: <SolutionOutlined />,
                            label: 'Blogs',
                        },
                    ]}
                    // Change layout
                    onSelect={(item) => {
                        if (item.key === constants.layoutDashboard) {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListRegisterSchedule) {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutScheduleMedical) {
                            dispatch(fetchApiConversations(getIdDoctor._id));
                            dispatch(fetchApiScheduleMedicalAppointment(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutScheduleMedicalMeeting) {
                            dispatch(fetchApiConversations(getIdDoctor._id));
                            dispatch(fetchApiScheduleMedicalAppointmentAwait(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListNotification) {
                            dispatch(fetchApiScheduleMedicalAppointment(getIdDoctor._id));
                            dispatch(fetchApiConversations(getIdDoctor._id));
                            dispatch(fetchApiNotificationByDoctorId(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListConversation) {
                            dispatch(fetchApiConversations(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListPatient) {
                            dispatch(fetchApiScheduleDetailByIdDoctor(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutResultHealthPatient) {
                            dispatch(fetchApiScheduleDetailByIdDoctor(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutMeeting) {
                            dispatch(fetchApiScheduleMedicalAppointmentAwait(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutBlog) {
                            dispatch(fetchApiAllPostByIdDoctor(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        }
                    }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-header"
                    style={{
                        padding: 0,
                        // marginBottom: '12px',
                        height: '0px',
                        position: 'sticky',
                        left: '0px',
                        top: '0px',
                        zIndex: '2',
                    }}
                >
                    <div className="site-layout-header-info-user">
                        <Link className="site-layout-header-introduce" to={endPoints.homeIntro}>
                            {/* <LeftOutlined />
                            Trang giới thiệu */}
                        </Link>

                        <div className="site-layout-header-right">
                            {isLoadingUser || isLoadingNotification ? (
                                <>
                                    <Skeleton.Avatar active style={{ marginTop: '16px' }} />
                                    <Skeleton.Input
                                        active
                                        style={{ marginTop: '16px', marginRight: '6px', marginLeft: '6px' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Popover content={<InformationOfDoctor infoUser={infoUser} />}>
                                        <img
                                            src={infoUser?.doctor?.person?.avatar}
                                            alt="avatar-img"
                                            className="avatar-user"
                                        />
                                    </Popover>
                                    <h4 className="name-user">BS. {infoUser?.doctor?.person?.username}</h4>
                                </>
                            )}
                        </div>
                    </div>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        marginTop: '80px',
                        marginLeft: '16px',
                        marginRight: '16px',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>

                {/* Toast notification */}
                <ToastContainer position="top-right" autoClose={3000} closeOnClick={false} />
                <ParticlesBackground />
            </Layout>
        </Layout>
    );
}

export default LayoutDoctorManager;
