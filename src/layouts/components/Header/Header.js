// lib
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Popover, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';

// me
import './Header.css';
import { endPoints } from '~/routers';
import { logo } from '~/asset/images';
import InformationPatient from './InformationPatient';
import { filterNotificationPatientNotHasSeen } from '~/redux/selector';

function Header({ checkUserLogin, patients }) {
    // console.log('checkUserLogin', checkUserLogin);

    const notificationNotHasSeen = useSelector(filterNotificationPatientNotHasSeen);

    console.log('notificationNotHasSeen', notificationNotHasSeen);

    return (
        <div className="wrapper-header">
            <div className="container-header">
                {/* Logo */}
                <Link to={endPoints.homeIntro}>
                    <img className="logo-image" src={logo.logo} alt="logo" />
                </Link>

                {/* Menu */}
                <div className="menu-list">
                    <ul>
                        {/* Trang chủ */}
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                            to={endPoints.homeIntro}
                        >
                            Trang chủ
                        </NavLink>

                        {/* Đặt lịch khám*/}
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                            to={endPoints.registerScheduleAppointment}
                        >
                            Đặt lịch khám
                        </NavLink>

                        {/* Thông báo */}
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                            to={endPoints.notificationPatient}
                        >
                            {notificationNotHasSeen.length > 0 ? (
                                <Space size="small">
                                    <Badge
                                        count={notificationNotHasSeen.length}
                                        overflowCount={99}
                                        size="small"
                                        offset={[4, -1]}
                                    >
                                        Thông báo
                                    </Badge>
                                </Space>
                            ) : (
                                'Thông báo'
                            )}
                        </NavLink>

                        {/* Chat message */}
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                            to={endPoints.chatMessage}
                        >
                            Trò chuyện
                        </NavLink>

                        {/* Dịch vụ tại nhà */}
                        {/* <Popover content={<MenuPeriodicHealthExaminationIcon />}>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/service-all">
                                Dịch vụ tại nhà
                                <DownOutlined className="menu-item-icon" />
                            </NavLink>
                        </Popover> */}

                        {/* Đội ngũ bác sĩ */}
                        {/* <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/team-of-doctors">
                            Đội ngũ bác sĩ
                        </NavLink> */}

                        {/* Thống kê (chart) */}
                        {/* <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/statistics">
                            Chỉ số thống kê
                        </NavLink> */}

                        {/* Blogger */}
                        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/blog">
                            Blog
                        </NavLink>
                    </ul>
                </div>

                {/* Section right */}
                <div className="section-right">
                    {patients ? (
                        <div className="home-intro-header">
                            <Popover content={<InformationPatient patients={patients} />}>
                                <img
                                    className="home-intro-header-avatar"
                                    src={patients?.patient?.person?.avatar}
                                    alt="avatar-patient"
                                />
                            </Popover>
                            <p className="home-intro-header-username">{patients?.patient?.person?.username}</p>
                        </div>
                    ) : checkUserLogin === null || checkUserLogin === undefined || checkUserLogin.length < 0 ? (
                        <>
                            <h4 className="section-right-login">
                                <Link to={endPoints.login} className="login">
                                    Đăng nhập
                                </Link>
                            </h4>
                            <h4 className="section-right-register">
                                <Link to={endPoints.register} className="register">
                                    Đăng ký
                                </Link>
                            </h4>
                        </>
                    ) : (
                        <Link className="section-right-back" to={endPoints.doctorManager}>
                            Quay lại <RightOutlined />
                        </Link>
                    )}

                    {/* Khi click vào nút thì hiện lên Modal */}
                    {/* <Button className="book-now">Đặt hẹn khám ngay</Button> */}
                    {/* <Button className="download-app-now">Tải ứng dụng ngay</Button> */}
                </div>
            </div>
        </div>
    );
}

export default Header;
