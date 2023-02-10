// lib
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { Link, NavLink } from 'react-router-dom';

// me
import './Header.css';
import { endPoints } from '~/routers';
import { MenuGeneralExaminationIcon } from '~/components/Icons';
import { logo } from '~/asset/images';

function Header({ checkUserLogin }) {
    console.log('checkUserLogin', checkUserLogin);
    return (
        <div className="wrapper-header">
            <div className="container-header">
                {/* Logo */}
                <Link to={endPoints.homeIntro}>
                    {/* <img
                        className="logo-image"
                        src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/logo.svg"
                        alt="img-logo"
                    /> */}
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

                        {/* Dịch vụ tại phòng khám */}
                        <Popover content={<MenuGeneralExaminationIcon />}>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/service-all">
                                Dịch vụ tại phòng khám
                                <DownOutlined className="menu-item-icon" />
                            </NavLink>
                        </Popover>

                        {/* Dịch vụ tại nhà */}
                        {/* <Popover content={<MenuPeriodicHealthExaminationIcon />}>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/service-all">
                                Dịch vụ tại nhà
                                <DownOutlined className="menu-item-icon" />
                            </NavLink>
                        </Popover> */}

                        {/* Đội ngũ bác sĩ */}
                        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/team-of-doctors">
                            Đội ngũ bác sĩ
                        </NavLink>

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
                    {checkUserLogin === null || checkUserLogin === undefined || checkUserLogin.length < 0 ? (
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
