import { EnvironmentOutlined } from '@ant-design/icons';

import './MapsPatient.css';
import { Link } from 'react-router-dom';
import { endPoints } from '~/routers';

function MapsPatient() {
    // console.log('patients ->', patients);

    return (
        <div className="wrapper-maps-patient">
            <Link to={endPoints.maps} target="_blank">
                <EnvironmentOutlined className="home-sp-chatbot-icon" />
            </Link>
        </div>
    );
}

export default MapsPatient;
