// lib
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClockCircleOutlined } from '@ant-design/icons';
import {
    CommentOutlined,
    LeftOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    OrderedListOutlined,
    ScheduleOutlined,
    TableOutlined,
} from '@ant-design/icons/lib/icons';
import { Badge, Layout, Menu, Popover, Space, theme } from 'antd';

// me
import './LayoutDoctorManager.css';
import constants from '~/utils/constants';
import { endPoints } from '~/routers';
import InformationOfDoctor from '~/components/InformationOfDoctor';
import layoutSlice from '~/redux/features/layout/layoutSlice';
import { filterNotificationNotHasSeen, getDoctorLoginFilter } from '~/redux/selector';
import {
    fetchApiScheduleDetailByIdDoctor,
    fetchApiScheduleMedicalAppointment,
} from '~/redux/features/patient/patientSlice';
import ParticlesBackground from '~/components/ParticlesBackground';
import notificationSlice, { fetchApiNotificationByDoctorId } from '~/redux/features/notification/notificationSlice';
import { fetchApiConversations } from '~/redux/features/conversation/conversationSlice';
import socket from '~/utils/socket';

const { Header, Sider, Content } = Layout;

function LayoutDoctorManager({ children, infoUser }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useDispatch();

    const getIdDoctor = useSelector(getDoctorLoginFilter);
    const notificationNotHasSeen = useSelector(filterNotificationNotHasSeen);
    // const totalNotifications = useSelector(getTotalNotifications);

    // console.log('getIdDoctor', getIdDoctor);
    // console.log('totalNotifications', totalNotifications);
    // console.log('notificationNotHasSeen', notificationNotHasSeen);

    useEffect(() => {
        socket.on('notification_register_schedule_from_patient_success', (data) => {
            console.log('notification_register_schedule_from_patient_success', data);
            dispatch(notificationSlice.actions.notificationRegisterScheduleFromPatientSuccess(data));
        });
    }, []);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width={250} className="sidebar">
                {!collapsed && (
                    <img
                        style={{ margin: '12px' }}
                        src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/logo.svg"
                        alt="logo"
                    />
                )}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[constants.layoutDashboard]}
                    items={[
                        {
                            key: constants.layoutDashboard,
                            icon: <TableOutlined />,
                            label: 'Bảng điều khiển',
                        },
                        {
                            key: constants.layoutListRegisterSchedule,
                            icon: <ClockCircleOutlined />,
                            label: 'Đăng ký ca làm',
                        },
                        {
                            key: constants.layoutScheduleMedical,
                            icon: <ScheduleOutlined />,
                            label: 'Lịch hẹn khám bệnh',
                        },
                        {
                            key: constants.layoutListNotification,
                            icon: (
                                <>
                                    {notificationNotHasSeen.length > 0 ? (
                                        <Space size="small">
                                            <Badge
                                                count={notificationNotHasSeen.length}
                                                overflowCount={99}
                                                size="default"
                                                offset={[180, 6]}
                                            >
                                                <NotificationOutlined style={{ color: '#fff', marginRight: '6px' }} />
                                            </Badge>
                                        </Space>
                                    ) : (
                                        <NotificationOutlined style={{ color: '#fff' }} />
                                    )}
                                </>
                            ),
                            label: 'Thông báo',
                        },
                        {
                            key: constants.layoutListConversation,
                            icon: <CommentOutlined />,
                            label: 'Cuộc trò chuyện',
                        },
                        {
                            key: '4',
                            icon: <OrderedListOutlined />,
                            label: 'Quản lý bệnh nhân',
                            children: [
                                { label: 'Danh sách bệnh nhân', key: constants.layoutListPatient },
                                // { label: 'Sức khỏe hằng ngày', key: constants.layoutSubHealth },
                            ],
                        },
                    ]}
                    // Change layout
                    onSelect={(item) => {
                        if (item.key === constants.layoutDashboard) {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListRegisterSchedule) {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutScheduleMedical) {
                            // dispatch(fetchApiScheduleByIdDoctor(getIdDoctor._id));
                            dispatch(fetchApiScheduleMedicalAppointment(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListNotification) {
                            dispatch(fetchApiNotificationByDoctorId(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListConversation) {
                            dispatch(fetchApiConversations(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListPatient) {
                            dispatch(fetchApiScheduleDetailByIdDoctor(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutMeeting) {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        }
                    }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-header" style={{ padding: 0, marginBottom: '12px', height: '0px' }}>
                    <div className="site-layout-header-info-user">
                        <Link className="site-layout-header-introduce" to={endPoints.homeIntro}>
                            <LeftOutlined />
                            Trang giới thiệu
                        </Link>

                        <div className="site-layout-header-right">
                            <Popover content={<InformationOfDoctor infoUser={infoUser} />}>
                                <img src={infoUser?.doctor?.person?.avatar} alt="avatar-img" className="avatar-user" />
                            </Popover>
                            <h4 className="name-user">BS. {infoUser?.doctor?.person?.username}</h4>
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
                <ParticlesBackground />
            </Layout>
        </Layout>
    );
}

export default LayoutDoctorManager;
