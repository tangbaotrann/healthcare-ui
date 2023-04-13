// lib
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Button } from 'antd';

// me
import './SlideImage.css';
import images from '~/asset/images';
import { SlideShowBannerClinicIcon, SlideShowHeartIcon } from '~/components/Icons';
import { endPoints } from '~/routers';

function SlideImage({ patients }) {
    // console.log('patients slide image ->', patients);

    return (
        <div className="wrapper-slide-image">
            <Slide duration={1500} indicators={true} pauseOnHover={false} arrows={false}>
                {images.map((image) => {
                    return <img key={image.id} className="slide-image-item" src={image.url} alt="slide-show-img" />;
                })}
            </Slide>

            {/* Đặt hẹn khám */}
            <div className="appointments">
                <div className="appointment-header">
                    <div className="heart-icon">
                        <SlideShowHeartIcon />
                    </div>
                    <div className="banner-clinic-icon">
                        <SlideShowBannerClinicIcon />
                    </div>
                    <h3 className="appointment-desc">Hơn 300,000 khách hàng tin tưởng sử dụng dịch vụ</h3>
                </div>

                {/* Click vào hiện lên modal */}
                {patients?.length === 0 || patients === undefined ? (
                    <Link to={endPoints.login}>
                        <Button className="appointment-btn">Đặt hẹn khám</Button>
                    </Link>
                ) : (
                    <Link to={endPoints.registerScheduleAppointment}>
                        <Button className="appointment-btn">Đặt hẹn khám</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default SlideImage;
