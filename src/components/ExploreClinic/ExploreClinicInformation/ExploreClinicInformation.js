// lib
import { Button, Image } from 'antd';

// me
import './ExploreClinicInformation.css';
import { ExploreClinicInformationClockIcon, ExploreClinicInformationLocationIcon } from '~/components/Icons';

function ExploreClinicInformation() {
    return (
        <>
            <div className="wrapper-explore-clinic-information">
                <Image
                    className="explore-clinic-information-img"
                    src="https://cdn.jiohealth.com/apps/clinic/1/feature-image/web/0_20221128_1.jpg"
                    alt="img-explore-clinic-information"
                />

                {/* Information */}
                <div className="explore-clinic-information">
                    <h2 className="explore-clinic-information-name">M Plaza</h2>
                    <p className="explore-clinic-information-address">
                        <ExploreClinicInformationLocationIcon /> Tầng 1, M Plaza - 39 Lê Duẩn, Bến Nghé, Quận 1, TP. HCM
                    </p>
                    <p className="explore-clinic-information-time">
                        <ExploreClinicInformationClockIcon /> 07:00 - 20:00 hằng ngày
                    </p>

                    {/* 2 button: Gọi ngay & Đặt khám */}
                    <div className="explore-clinic-information-footer">
                        <Button className="explore-clinic-information-call-now-btn">Gọi ngay</Button>
                        <Button className="explore-clinic-information-appointment-btn">Đặt khám</Button>
                    </div>
                </div>
            </div>
            <div className="wrapper-explore-clinic-information">
                <Image
                    className="explore-clinic-information-img"
                    src="https://cdn.jiohealth.com/apps/clinic/3/feature-image/web/0_20221007.jpg"
                    alt="img-explore-clinic-information"
                />

                {/* Information */}
                <div className="explore-clinic-information">
                    <h2 className="explore-clinic-information-name">Republic Plaza</h2>
                    <p className="explore-clinic-information-address">
                        <ExploreClinicInformationLocationIcon /> Tầng trệt, 18E Cộng Hòa, Phường 4, Tân Bình, TP. HCM
                    </p>
                    <p className="explore-clinic-information-time">
                        <ExploreClinicInformationClockIcon /> 07:00 - 20:00 hằng ngày
                    </p>

                    {/* 2 button: Gọi ngay & Đặt khám */}
                    <div className="explore-clinic-information-footer">
                        <Button className="explore-clinic-information-call-now-btn">Gọi ngay</Button>
                        <Button className="explore-clinic-information-appointment-btn">Đặt khám</Button>
                    </div>
                </div>
            </div>
            <div className="wrapper-explore-clinic-information">
                <Image
                    className="explore-clinic-information-img"
                    src="https://cdnqa.jiohealth.com/apps/clinic/4/feature-image/web/1_20221121_0.jpg"
                    alt="img-explore-clinic-information"
                />

                {/* Information */}
                <div className="explore-clinic-information">
                    <h2 className="explore-clinic-information-name">Q2 Thao Dien</h2>
                    <p className="explore-clinic-information-address">
                        <ExploreClinicInformationLocationIcon /> 21 Võ Trường Toản, Thảo Điền, Quận 2, TP. HCM
                    </p>
                    <p className="explore-clinic-information-time">
                        <ExploreClinicInformationClockIcon /> 07:00 - 20:00 hằng ngày
                    </p>

                    {/* 2 button: Gọi ngay & Đặt khám */}
                    <div className="explore-clinic-information-footer">
                        <Button className="explore-clinic-information-call-now-btn">Gọi ngay</Button>
                        <Button className="explore-clinic-information-appointment-btn">Đặt khám</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExploreClinicInformation;
