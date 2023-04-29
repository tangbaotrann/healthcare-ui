// me
import './FeelUnwell.css';
import { FeelUnwellLabIcon, FeelUnwellStethoscopeIcon } from '../Icons';
import PharmacyOnline from '../PharmacyOnline';

function FeelUnwell() {
    return (
        <div className="wrapper-feel-unwell">
            {/* Section left */}
            <div className="feel-unwell-section-left">
                <div className="feel-unwell-section-left-inner">
                    <h2 className="feel-unwell-section-left-title">
                        Bạn thấy không khỏe? Hãy để T&T Healthcare chăm sóc cho bạn!
                    </h2>

                    <span className="separator"></span>

                    <p className="feel-unwell-section-left-desc">
                        Tìm hiểu thêm về các dịch vụ chăm sóc sức khỏe của chúng tôi, từ cảm mạo thông thường đến các
                        bệnh mạn tính - các bác sĩ Jio thân thiện sẽ tận tình chăm sóc bạn và gia đình.
                    </p>

                    <div className="feel-unwell-section-left-icon">
                        <FeelUnwellStethoscopeIcon />
                        <h3 className="feel-unwell-section-left-icon-text">Dịch vụ Bác sĩ & Điều dưỡng</h3>

                        <FeelUnwellLabIcon />
                        <h3 className="feel-unwell-section-left-icon-text">Lấy mẫu xét nghiệm</h3>
                    </div>
                </div>
            </div>

            {/* Section right */}
            <div className="feel-unwell-section-right">
                <img
                    className="feel-unwell-section-right-img"
                    src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/not-feeling-well.svg"
                    alt="not-feeling-well-img"
                />
            </div>

            {/* Pharmacy Online */}
            <PharmacyOnline />
        </div>
    );
}

export default FeelUnwell;
