// lib
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Image, Modal, Rate } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import TitleName from '~/components/TitleName';
import { endPoints } from '~/routers';
import userSlice from '~/redux/features/user/userSlice';
import socket from '~/utils/socket';

function InformationPatient({ patients }) {
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token_user_login');
        dispatch(userSlice.actions.clickedLogoutPatient([]));
        navigate(`${endPoints.homeIntro}`);
        socket.emit('user_disconnect', { __user: patients.patient._id });
    };

    return (
        <div className="info-patient-wrapper">
            <div className="info-patient-sub-menu">
                <Button style={{ border: 'none', display: 'flex', alignItems: 'center' }} onClick={handleOpenModal}>
                    <UserOutlined />
                    <h4 className="information-of-doctor-item-name">Thông tin cá nhân</h4>
                </Button>
                <Button style={{ border: 'none', display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
                    <LogoutOutlined />
                    <h4 className="information-of-doctor-item-name logout">Đăng xuất</h4>
                </Button>
            </div>

            {/* Show modal info doctor */}
            <Modal
                open={openModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Thông Tin Chi Tiết</TitleName>

                <div className="info-patient-item">
                    <p className="info-patient-item-label">
                        <i>* Thông tin:</i>
                    </p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Họ tên: </p>
                    <p className="info-patient-item-desc">{patients?.patient?.person?.username}</p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Giới tính: </p>
                    <p className="info-patient-item-desc">
                        {patients?.patient?.person?.gender === true ? 'Nam' : 'Nữ'}
                    </p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Năm sinh: </p>
                    <p className="info-patient-item-desc">
                        {moment(patients?.patient?.person?.dob).format('DD/MM/YYYY')}
                    </p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Nhóm máu: </p>
                    <p className="info-patient-item-desc">{patients?.patient?.blood}</p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Địa chỉ: </p>
                    <p className="info-patient-item-desc">{patients?.patient?.person?.address}</p>
                </div>

                <Divider />

                <div className="info-patient-item">
                    <p className="info-patient-item-label">
                        <i>
                            * Chỉ số: (Các chỉ số được cập nhật gần đây nhất{' '}
                            {moment(patients?.metrics?.last_bmi?.createdAt).format('DD/MM/YYYY')})
                        </i>
                    </p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">BMI trung bình: </p>
                    <p className="info-patient-item-desc">
                        {patients?.metrics?.last_bmi?.cal_bmi} (Cân nặng: {patients?.metrics?.last_bmi?.weight} - Chiều
                        cao: {patients?.metrics?.last_bmi?.height})
                    </p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Đường huyết: </p>
                    <p className="info-patient-item-desc">Trước lúc ngủ là {patients?.metrics?.glycemic?.metric}</p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Huyết áp: </p>
                    <p className="info-patient-item-desc">
                        Tâm thu là {patients?.metrics?.last_blood_pressures?.systolic} - Tâm trương là{' '}
                        {patients?.metrics?.last_blood_pressures?.diastole}
                    </p>
                </div>

                <Divider />

                <div className="info-patient-item">
                    <p className="info-patient-item-label">
                        <i>* Được phụ trách khám bởi Bác sĩ:</i>
                    </p>
                </div>
                {patients?.patient?.doctor_glycemic_id || patients?.patient?.doctor_blood_id ? (
                    <>
                        <div className="info-patient-item">
                            <div className="info-patient-display-footer">
                                <Image
                                    src={patients?.patient?.doctor_glycemic_id?.person?.avatar}
                                    className="info-patient-avatar-doctor"
                                    alt="avatar-doctor"
                                />
                                <p className="info-patient-item-desc" style={{ textAlign: 'center' }}>
                                    {patients?.patient?.doctor_glycemic_id?.person?.username}
                                </p>
                                <div style={{ textAlign: 'center' }}>
                                    <Rate
                                        defaultValue={patients?.patient?.doctor_glycemic_id?.rating}
                                        style={{ fontSize: '1.3rem' }}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="info-patient-item">
                            <p className="info-patient-item-label">Năm sinh: </p>
                            <p className="info-patient-item-desc">
                                {moment(patients?.patient?.doctor_glycemic_id?.person?.dob).format('DD/MM/YYYY')}
                            </p>
                        </div>
                        <div className="info-patient-item">
                            <p className="info-patient-item-label">Giới tính: </p>
                            <p className="info-patient-item-desc">
                                {patients?.patient?.doctor_glycemic_id?.person?.gender === true ? 'Nam' : 'Nữ'}
                            </p>
                        </div>
                        <div className="info-patient-item">
                            <p className="info-patient-item-label">Đảm nhiệm loại bệnh: </p>
                            <p className="info-patient-item-desc">
                                {patients?.patient?.doctor_glycemic_id?.work_type === 'glycemic'
                                    ? 'Đường huyết'
                                    : 'Huyết áp'}
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="info-patient-display-footer-message">
                        <i>-- Hiện tại bạn chưa có bác sĩ phụ trách khám bệnh (do chưa đăng ký bác sĩ khám) --</i>
                    </p>
                )}
            </Modal>
        </div>
    );
}

export default InformationPatient;
