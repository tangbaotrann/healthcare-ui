// me
import './RemoteHealthConsultation.css';
import { RemoteHealthConsultationChatIcon, RemoteHealthConsultationVideoIcon } from '../Icons';
import FeelUnwell from '../FeelUnwell';
import { logo } from '~/asset/images';

function RemoteHealthConsultation() {
    return (
        <div className="wrapper-remote-health-consultation">
            {/* Section left */}
            <div className="remote-health-consultation-section-left">
                <img
                    className="remote-health-consultation-img"
                    src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/premium/doctor-bg.svg"
                    alt="remote-health-consultation-img"
                />
                <img src={logo.remoteHealthX1} className="remote-health-consultation-img-x1" alt="" />
            </div>

            {/* Section right */}
            <div className="remote-health-consultation-section-right">
                <div className="remote-health-consultation-section-right-inner">
                    <h2 className="remote-health-consultation-section-right-name">
                        Tư vấn sức khỏe từ xa 24/7 qua video & chat
                    </h2>

                    <span className="separator"></span>

                    <p className="remote-health-consultation-section-right-desc">
                        Bạn cần sự tư vấn chuyên môn khi gặp các vấn đề sức khỏe? Dù bạn ở đâu hay vào bất cứ lúc nào,
                        các bác sĩ chuyên khoa của T&T Healthcare luôn sẵn sàng tư vấn, giải đáp đáp mọi thắc mắc của
                        bạn.
                    </p>

                    <div className="remote-health-consultation-section-right-icon">
                        <RemoteHealthConsultationVideoIcon />
                        <h3 className="remote-health-consultation-section-right-icon-text">Video call với bác sĩ</h3>

                        <RemoteHealthConsultationChatIcon />
                        <h3 className="remote-health-consultation-section-right-icon-text">Chat với bác sĩ</h3>
                    </div>
                </div>
            </div>

            {/* Fell unwell */}
            <FeelUnwell />
        </div>
    );
}

export default RemoteHealthConsultation;
