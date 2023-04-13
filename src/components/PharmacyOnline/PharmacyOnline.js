// me
import './PharmacyOnline.css';
import { PharmacyOnlineDeliveryIcon, PharmacyOnlineDiscountIcon } from '../Icons';
import Footer from '~/layouts/components/Footer';

function PharmacyOnline() {
    return (
        <div className="wrapper-pharmacy-online">
            {/* Section left */}
            <div className="pharmacy-online-section-left">
                <img
                    className="pharmacy-online-section-img"
                    src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/online-pharmacy-video-cover.svg"
                    alt="online-pharmacy-video-cover-img"
                />
                <div className="pharmacy-online-section-video-out-site">
                    <video className="pharmacy-online-section-video" loop="loop" muted="true" preload="none" autoPlay>
                        <source
                            src="https://cdn.jiohealth.com/video/doctor/Pharmacy_Short_Version_LQ.mp4"
                            type="video/mp4"
                        />
                        <source
                            src="https://cdn.jiohealth.com/video/doctor/Pharmacy_Short_Version_LQ.webm"
                            type="video/webm"
                        />
                    </video>
                </div>
            </div>

            {/* Section right */}
            <div className="pharmacy-online-section-right">
                <div className="pharmacy-online-section-right-inner">
                    <h2 className="pharmacy-online-section-right-title">Nhà Thuốc Trực Tuyến Jio</h2>

                    <span className="separator"></span>

                    <p className="pharmacy-online-section-right-desc">
                        Dễ dàng đặt trực tuyến thuốc và các sản phẩm chăm sóc sức khỏe chính hãng với mức giá tiết kiệm
                    </p>

                    <div className="pharmacy-online-section-right-icon">
                        <PharmacyOnlineDeliveryIcon />
                        <h3 className="pharmacy-online-section-right-icon-text">Giao hàng nhanh trong 2 giờ</h3>

                        <PharmacyOnlineDiscountIcon />
                        <h3 className="pharmacy-online-section-right-icon-text">Tiết kiệm 20% tất cả các sản phẩm</h3>
                    </div>
                </div>
            </div>

            {/* Doctor come home */}
            {/* <DoctorComeHome /> */}

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default PharmacyOnline;
