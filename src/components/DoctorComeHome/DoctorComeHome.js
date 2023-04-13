// lib
import { Button } from 'antd';

// me
import './DoctorComeHome.css';

function DoctorComeHome() {
    return (
        <div className="wrapper-doctor-come-home">
            {/* Section left */}
            <div className="doctor-come-home-section-left">
                <div className="doctor-come-home-section-left-inner">
                    <h2 className="doctor-come-home-section-left-inner-title">Bác sĩ đến khám</h2>

                    <span className="separator"></span>

                    <p className="doctor-come-home-section-left-desc">
                        Thăm khám tận nơi chỉ từ <b>400.000 ₫</b>
                    </p>

                    {/* Clicked -> show modal */}
                    <Button className="doctor-come-home-section-left-btn">Đặt khám ngay</Button>
                </div>
            </div>

            {/* Section right */}
            <div className="doctor-come-home-section-right">
                <img
                    className="doctor-come-home-section-right-img"
                    src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/doctors-come-to-you-video-cover.svg"
                    alt="doctors-come-to-you-video-cover-img"
                />

                <div className="doctor-come-home-section-right-video-out-site">
                    <video
                        className="doctor-come-home-section-right-video"
                        loop="loop"
                        muted="true"
                        preload="none"
                        autoPlay
                    >
                        <source
                            src="https://cdn.jiohealth.com/video/doctor/Our_Doctors_Come_to_You_Short_Ver_LQ.mp4"
                            type="video/mp4"
                        />
                        <source
                            src="https://cdn.jiohealth.com/video/doctor/Our_Doctors_Come_to_You_Short_Ver_LQ.webm"
                            type="video/webm"
                        />
                    </video>
                </div>
            </div>
        </div>
    );
}

export default DoctorComeHome;
