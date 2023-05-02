// lib
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Popover, Skeleton, Space } from 'antd';

// me
import './Header.css';
import { endPoints } from '~/routers';
import { logo } from '~/asset/images';
import InformationPatient from './InformationPatient';
import { filterNotificationPatientNotHasSeen, isLoadingApiAllPatientsSelector } from '~/redux/selector';
import userSlice from '~/redux/features/user/userSlice';

function Header({ checkUserLogin, patients }) {
    const notificationNotHasSeen = useSelector(filterNotificationPatientNotHasSeen);
    const isLoading = useSelector(isLoadingApiAllPatientsSelector);

    const dispatch = useDispatch();

    // console.log('isLoading', isLoading);
    // console.log('checkUserLogin', checkUserLogin);
    // console.log('patients header', patients);
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
                    {/* {isLoading ? (
                        <Space>
                            <Skeleton.Button active className="custom-ske-loading" />
                            <Skeleton.Button active className="custom-ske-loading" />
                            <Skeleton.Button active className="custom-ske-loading" />
                            <Skeleton.Button active className="custom-ske-loading" />
                            <Skeleton.Button active className="custom-ske-loading" />
                            <Skeleton.Button active className="custom-ske-loading" />
                            <Skeleton.Button active className="custom-ske-loading" />
                        </Space>
                    ) : (
                    )} */}
                    <ul>
                        {/* Trang chủ */}
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                            to={endPoints.homeIntro}
                        >
                            Trang chủ
                        </NavLink>

                        {/* Quản lý chỉ số*/}
                        {patients?.length === 0 || patients === undefined ? (
                            <NavLink
                                className="active"
                                to={endPoints.login}
                                onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                            >
                                Quản lý chỉ số
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.metricsPatient}
                            >
                                Quản lý chỉ số
                            </NavLink>
                        )}

                        {/* Đặt lịch khám*/}
                        {patients?.length === 0 || patients === undefined ? (
                            <NavLink className="active" to={endPoints.login}>
                                Đặt lịch khám
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.registerScheduleAppointment}
                            >
                                Đặt lịch khám
                            </NavLink>
                        )}

                        {/* Danh sách đã đăng ký lịch khám */}
                        {patients?.length === 0 || patients === undefined ? (
                            <NavLink
                                className="active"
                                to={endPoints.login}
                                onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                            >
                                Danh sách lịch khám
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.registerScheduleAppointmentList}
                            >
                                Danh sách lịch khám
                            </NavLink>
                        )}

                        {/* Thông báo */}
                        {patients?.length === 0 || patients === undefined ? (
                            <NavLink
                                className="active"
                                to={endPoints.login}
                                onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                            >
                                Thông báo
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.notificationPatient}
                            >
                                {notificationNotHasSeen?.length > 0 ? (
                                    <Space size="small">
                                        <Badge
                                            count={notificationNotHasSeen?.length}
                                            overflowCount={99}
                                            size="small"
                                            offset={[4, -4]}
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
                            <NavLink
                                className="active"
                                to={endPoints.login}
                                onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                            >
                                Trò chuyện
                            </NavLink>
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
                            <NavLink
                                className="active"
                                to={endPoints.login}
                                onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                            >
                                Blogs
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                                to={endPoints.blog}
                            >
                                Blogs
                            </NavLink>
                        )}
                    </ul>
                </div>

                {/* Section right */}
                <div className="section-right">
                    {patients?.length === 0 || patients === undefined ? (
                        <>
                            {isLoading ? (
                                <Space>
                                    <Skeleton.Avatar active />
                                    <Skeleton.Button active />
                                </Space>
                            ) : (
                                <>
                                    <h4 className="section-right-login">
                                        <Link
                                            to={endPoints.login}
                                            className="login"
                                            onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                                        >
                                            Đăng nhập
                                        </Link>
                                    </h4>
                                    <h4 className="section-right-register">
                                        <Link
                                            to={endPoints.register}
                                            className="register"
                                            onClick={() => dispatch(userSlice.actions.clickedClearInfoLogin([]))}
                                        >
                                            Đăng ký
                                        </Link>
                                    </h4>
                                </>
                            )}
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
