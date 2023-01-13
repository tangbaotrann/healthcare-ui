// lib
import { UserOutlined } from '@ant-design/icons';

// me
import './InformationOfDoctor.css';

function InformationOfDoctor() {
    return (
        <div className="wrapper-information-of-doctor">
            {/* Có thể click vào hiện modal */}
            <div className="information-of-doctor-item">
                <UserOutlined />
                <h4 className="information-of-doctor-item-name">Thông tin cá nhân</h4>
            </div>
        </div>
    );
}

export default InformationOfDoctor;
