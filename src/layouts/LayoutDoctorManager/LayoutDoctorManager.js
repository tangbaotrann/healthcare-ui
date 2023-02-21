// lib
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClockCircleOutlined } from '@ant-design/icons';
import {
    LeftOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    OrderedListOutlined,
    ScheduleOutlined,
} from '@ant-design/icons/lib/icons';
import { Layout, Menu, Popover, theme } from 'antd';

// me
import './LayoutDoctorManager.css';
import constants from '~/utils/constants';
import { endPoints } from '~/routers';
import InformationOfDoctor from '~/components/InformationOfDoctor';
import layoutSlice from '~/redux/features/layout/layoutSlice';
import { getDoctorLoginFilter } from '~/redux/selector';
import { fetchApiScheduleDetailByIdDoctor } from '~/redux/features/patient/patientSlice';

const { Header, Sider, Content } = Layout;

function LayoutDoctorManager({ children, infoUser }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useDispatch();

    const getIdDoctor = useSelector(getDoctorLoginFilter);
    console.log('getIdDoctor', getIdDoctor);

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
                    defaultSelectedKeys={[constants.layoutListRegisterSchedule]}
                    items={[
                        {
                            key: constants.layoutListRegisterSchedule,
                            icon: <ClockCircleOutlined />,
                            label: 'Đăng ký ca làm cho Bác sĩ',
                        },
                        {
                            key: '2',
                            icon: <ScheduleOutlined />,
                            label: 'Lịch hẹn tư vấn',
                        },
                        {
                            key: '3',
                            icon: <NotificationOutlined />,
                            label: 'Thông báo',
                        },
                        {
                            key: '4',
                            icon: <OrderedListOutlined />,
                            label: 'Quản lý bệnh nhân',
                            children: [
                                { label: 'Danh sách bệnh nhân', key: constants.layoutListPatient },
                                { label: 'Sức khỏe hằng ngày', key: constants.layoutSubHealth },
                            ],
                            // sub: Xem thông tin chi tiết bệnh nhân;
                            // Phác đồ điều trị;
                            // Chỉ số BMI
                        },
                    ]}
                    // Change layout
                    onSelect={(item) => {
                        if (item.key === constants.layoutListRegisterSchedule) {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === '2') {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutSubHealth) {
                            dispatch(fetchApiScheduleDetailByIdDoctor(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === constants.layoutListPatient) {
                            dispatch(fetchApiScheduleDetailByIdDoctor(getIdDoctor._id));
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        }
                    }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-header" style={{ padding: 0, background: colorBgContainer }}>
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
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutDoctorManager;
