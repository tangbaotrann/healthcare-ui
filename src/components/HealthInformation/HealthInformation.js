// lib
import { Link } from 'react-router-dom';

// me
import './HealthInformation.css';
import {
    HealthInformationCardiologyIcon,
    HealthInformationEndocrinologyIcon,
    HealthInformationSexualHealthIcon,
} from '../Icons';
import RemoteHealthConsultation from '../RemoteHealthConsultation';

function HealthInformation() {
    return (
        <div className="wrapper-health-information">
            {/* Section left */}
            <div className="health-information-section-left">
                <div className="health-information-section-left-inner">
                    <h2 className="health-information-section-left-title">Thông tin sức khỏe dành cho bạn</h2>

                    <span className="separator"></span>

                    <p className="health-information-section-left-desc">
                        360 độ nội dung sức khỏe thuộc các chủ đề được nhiều người quan tâm hiện nay, dưới sự xây dựng
                        từ các chuyên gia sức khỏe tại Jio Health. Cần xem thêm nhiều bài viết chuyên khoa thú vị khác?
                        Blog Jio Health là điểm đến về tin tức và kiến thức sức khỏe lý tưởng dành cho bạn.
                    </p>
                </div>
            </div>

            {/* Section right */}
            <div className="health-information-section-right">
                <img
                    className="health-information-section-right-img"
                    src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/health-resource-background.svg"
                    alt="health-info-img"
                />

                <div className="health-information-section-right-box">
                    <Link to="/endocrinology">
                        <div className="health-information-section-right-box-endocrinology">
                            <HealthInformationEndocrinologyIcon />
                            <h5 className="endocrinology-name">Đái tháo đường</h5>
                        </div>
                    </Link>
                </div>
                <div className="health-information-section-right-box">
                    <Link to="/cardiology">
                        <div className="health-information-section-right-box-endocrinology">
                            <HealthInformationCardiologyIcon />
                            <h5 className="endocrinology-name">Tim mạch</h5>
                        </div>
                    </Link>
                </div>
                <div className="health-information-section-right-box">
                    <Link to="/sexual-health">
                        <div className="health-information-section-right-box-endocrinology">
                            <HealthInformationSexualHealthIcon />
                            <h5 className="endocrinology-name">Sức khỏe giới tính</h5>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Remote health consultation */}
            <RemoteHealthConsultation />
        </div>
    );
}

export default HealthInformation;
