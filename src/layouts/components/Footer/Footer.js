// me
import { logo } from '~/asset/images';
import './Footer.css';

function Footer({ className }) {
    return (
        <div className={`wrapper-footer ${className}`}>
            <div className="footer-inner">
                <img
                    className="footer-logo"
                    // src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/footer-logo-white.svg"
                    src={logo.iconLogo192x192}
                    alt="logo-footer"
                />
            </div>

            <div className="footer-info">
                <ul>
                    <li>
                        <span className="footer-info-item">Liên hệ: </span>
                        19001789
                    </li>
                    <li>
                        <span className="footer-info-item">Hỗ trợ: </span>
                        adminsupport@health.com
                    </li>
                    <li>
                        <span className="footer-info-item">Copyright </span>© 2017-2023 Rai and Rohl Technologies, Inc.
                        All rights reserved.
                    </li>
                </ul>

                {/*  */}
                <ul>
                    <li>
                        <span className="footer-info-item">Dịch vụ </span>
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Đặt lịch khám
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Nhà thuốc trực tuyến
                    </li>
                </ul>

                {/*  */}
                <ul>
                    <li>
                        <span className="footer-info-item">Tìm hiểu thêm </span>
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Đội ngũ bác sĩ
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Các bài báo
                    </li>
                </ul>

                {/*  */}
                <ul>
                    <li>
                        <span className="footer-info-item">Hỗ trợ khách hàng </span>
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Câu hỏi thường gặp
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Chính sách bảo mật
                    </li>
                    <li>
                        <span className="footer-info-item"></span>
                        Liên hệ
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
