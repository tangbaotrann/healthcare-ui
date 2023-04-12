// lib
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Popover, Space, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';

// me
import './Header.css';
import { endPoints } from '~/routers';
import { logo } from '~/asset/images';
import InformationPatient from './InformationPatient';
import { filterNotificationPatientNotHasSeen } from '~/redux/selector';

function Header({ checkUserLogin, patients }) {
    const notificationNotHasSeen = useSelector(filterNotificationPatientNotHasSeen);

    // console.log('checkUserLogin', checkUserLogin);
    // console.log('patients', patients);
    // console.log('notificationNotHasSeen', notificationNotHasSeen);

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
                        {patients?.length === 0 || patients === undefined ? (
                            <div onClick={() => message.warning('Bạn cần phải đăng nhập.')}>
                                <NavLink>Đặt lịch khám</NavLink>
                            </div>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.registerScheduleAppointment}
                            >
                                Đặt lịch khám
                            </NavLink>
                        )}

                        {/* Thông báo */}
                        {patients?.length === 0 || patients === undefined ? (
                            <div onClick={() => message.warning('Bạn cần phải đăng nhập.')}>
                                <NavLink>Thông báo</NavLink>
                            </div>
                        ) : (
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
                        )}

                        {/* Chat message */}
                        {patients?.length === 0 || patients === undefined ? (
                            <div onClick={() => message.warning('Bạn cần phải đăng nhập.')}>
                                <NavLink>Trò chuyện</NavLink>
                            </div>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.chatMessage}
                            >
                                Trò chuyện
                            </NavLink>
                        )}

                        {/* Blogger */}
                        {patients?.length === 0 || patients === undefined ? (
                            <div onClick={() => message.warning('Bạn cần phải đăng nhập.')}>
                                <NavLink>Blog</NavLink>
                            </div>
                        ) : (
                            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/blog">
                                Blog
                            </NavLink>
                        )}
                    </ul>
                </div>

                {/* Section right */}
                <div className="section-right">
                    {patients?.length === 0 || patients === undefined ? (
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
