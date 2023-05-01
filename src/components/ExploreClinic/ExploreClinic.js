// lib
import { Button } from 'antd';

// me
import './ExploreClinic.css';
import ExploreClinicInformation from './ExploreClinicInformation';

function ExploreClinic({ patients }) {
    return (
        <div className="wrapper-explore-clinic">
            <div className="explore-clinic-header">
                <div className="explore-clinic-inner">
                    <h3 className="explore-clinic-title">Khám phá các phòng khám</h3>
                    <span className="separator"></span>
                </div>

                {/* Button option */}
                <Button className="explore-clinic-btn">TP. Hồ Chí Minh</Button>
                <Button className="explore-clinic-btn">Hà Nội</Button>
            </div>

            {/* Background body */}
            <div className="explore-clinic-body"></div>

            {/* Footer */}
            <div className="explore-clinic-footer">
                <ExploreClinicInformation patients={patients} />
            </div>
        </div>
    );
}

export default ExploreClinic;
