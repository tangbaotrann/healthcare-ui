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
import { endPoints } from '~/routers';

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
                        từ các chuyên gia sức khỏe tại T&T Healthcare. Cần xem thêm nhiều bài viết chuyên khoa thú vị
                        khác? Blog T&T Healthcare là điểm đến về tin tức và kiến thức sức khỏe lý tưởng dành cho bạn.
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
                    <Link to={endPoints.metricsPatient}>
                        <div className="health-information-section-right-box-endocrinology">
                            <HealthInformationEndocrinologyIcon />
                            <h5 className="endocrinology-name">BMI</h5>
                        </div>
                    </Link>
                </div>
                <div className="health-information-section-right-box">
                    <Link to={endPoints.metricsPatient}>
                        <div className="health-information-section-right-box-endocrinology">
                            <HealthInformationCardiologyIcon />
                            <h5 className="endocrinology-name">Đường huyết</h5>
                        </div>
                    </Link>
                </div>
                <div className="health-information-section-right-box">
                    <Link to={endPoints.metricsPatient}>
                        <div className="health-information-section-right-box-endocrinology">
                            <HealthInformationSexualHealthIcon />
                            <h5 className="endocrinology-name">Huyết áp</h5>
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
