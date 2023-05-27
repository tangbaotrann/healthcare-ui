// lib
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// me
import './AwaitBrowsingAccountDoctor.css';
import { endPoints } from '~/routers';
import userSlice from '~/redux/features/user/userSlice';
import { Button } from 'antd';

function AwaitBrowsingAccountDoctor({ checkAwaitAccept, awaitAccept }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token_user_login');
        dispatch(userSlice.actions.clickedLogoutPatient([]));
        navigate(`${endPoints.homeIntro}`);
        // socket.emit('user_disconnect', { __user: patients.patient._id });
    };

    return (
        <div className="container-await-rule-doctor">
            {awaitAccept?.doctor?.deleted === true || checkAwaitAccept?.deleted === true ? (
                <div className="await-rule-doctor-notification">
                    <h6>
                        <CloseOutlined className="icon-delete-await-rule-doctor" /> Tài khoản của bạn đã bị chặn. Vui
                        lòng liên hệ trực tiếp số điện thoại này (0325676569) để chúng tôi có thể hỗ trợ bạn nhé!
                    </h6>
                    <div className="await-rule-doctor-back">
                        <Button onClick={handleLogout} className="await-rule-doctor-back-btn">
                            Quay lại trang chủ
                        </Button>
                    </div>
                </div>
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
