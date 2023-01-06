import { Link } from 'react-router-dom';
import './Icons.css';

// icon General examination
export const MenuGeneralExaminationIcon = () => {
    return (
        <>
            <Link to="/general-examination">
                <div className="wrapper-icons">
                    <div className="bg-icons">
                        <img
                            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/general_care.svg"
                            alt="general_care"
                        />
                    </div>
                    <h4 className="title-icons">Khám tổng quát</h4>
                </div>
            </Link>
            <Link to="/periodic-health-examination">
                <div className="wrapper-icons">
                    <div className="bg-icons">
                        <img
                            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/annual_health_check_up.svg"
                            alt="annual_health_check_up"
                        />
                    </div>
                    <h4 className="title-icons">Khám sức khỏe định kỳ</h4>
                </div>
            </Link>
        </>
    );
};

// icon Periodic health examination
export const MenuPeriodicHealthExaminationIcon = () => {
    return (
        <>
            <Link to="/general-examination">
                <div className="wrapper-icons">
                    <div className="bg-icons">
                        <img
                            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/general_care.svg"
                            alt="general_care"
                        />
                    </div>
                    <h4 className="title-icons">Khám tổng quát</h4>
                </div>
            </Link>
            <Link to="/periodic-health-examination">
                <div className="wrapper-icons">
                    <div className="bg-icons">
                        <img
                            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/annual_health_check_up.svg"
                            alt="annual_health_check_up"
                        />
                    </div>
                    <h4 className="title-icons">Khám sức khỏe định kỳ</h4>
                </div>
            </Link>
        </>
    );
};

// icon Heart
export const SlideShowHeartIcon = () => {
    return (
        <img
            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/heart-icon.svg"
            alt="heart-icon"
        />
    );
};

// icon Banner clinic icon
export const SlideShowBannerClinicIcon = () => {
    return (
        <img
            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/banner-clinic-icon.svg"
            alt="banner-clinic-icon"
        />
    );
};
