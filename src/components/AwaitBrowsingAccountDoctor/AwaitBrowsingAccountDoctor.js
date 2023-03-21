// lib
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';

// me
import './AwaitBrowsingAccountDoctor.css';

function AwaitBrowsingAccountDoctor({ checkAwaitAccept, awaitAccept }) {
    return (
        <div className="container-await-rule-doctor">
            {awaitAccept?.doctor?.deleted === true || checkAwaitAccept?.deleted === true ? (
                <h6>
                    <CloseOutlined className="icon-delete-await-rule-doctor" /> Tài khoản của bạn đã không được duyệt.
                    Vui lòng liên hệ trực tiếp số điện thoại này (0325676569) để chúng tôi có thể hỗ trợ bạn nhé!
                </h6>
            ) : (
                <h6>
                    <CheckOutlined className="icon-await-rule-doctor" />
                    Bạn đã đăng ký thành công tài khoản cho Bác sĩ. Vui lòng chờ ít phút để được duyệt tài khoản nhé!
                </h6>
            )}
            {/* <LoadingOutlined className="loading-await-rule-doctor" style={{ fontSize: 42 }} content="Loading..." /> */}
        </div>
    );
}

export default AwaitBrowsingAccountDoctor;
