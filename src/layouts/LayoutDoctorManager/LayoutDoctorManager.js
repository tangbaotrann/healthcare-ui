// lib
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClockCircleOutlined } from '@ant-design/icons';
import { LeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib/icons';
import { Layout, Menu, Popover, theme } from 'antd';

// me
import './LayoutDoctorManager.css';
import { endPoints } from '~/routers';
import InformationOfDoctor from '~/components/InformationOfDoctor';
import layoutSlice from '~/redux/features/layout/layoutSlice';

const { Header, Sider, Content } = Layout;

function LayoutDoctorManager({ children, infoUser }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useDispatch();

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
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <ClockCircleOutlined />,
                            label: 'Đăng ký ca lịch của Bác sĩ',
                        },
                        {
                            key: '2',
                            icon: <ClockCircleOutlined />,
                            label: 'Option 2',
                        },
                        // {
                        //     key: '3',
                        //     icon: <FormOutlined />,
                        //     label: 'Quản lý ngày làm cho Bác sĩ',
                        // },
                    ]}
                    // Change layout
                    onSelect={(item) => {
                        if (item.key === '1') {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        } else if (item.key === '2') {
                            dispatch(layoutSlice.actions.btnSelectMenuChangeLayout(item.key));
                        }
                        // else if (item.key === '3') {
                        //     dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
                        // }
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
