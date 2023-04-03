// lib
import { useState } from 'react';
import { Button, Divider, Modal } from 'antd';
import TitleName from '~/components/TitleName/TitleName';
import moment from 'moment';

function InformationPatient({ patients }) {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <div className="info-patient-wrapper">
            <Button style={{ border: 'none' }} onClick={handleOpenModal}>
                <h4 className="information-of-doctor-item-name">Thông tin cá nhân</h4>
            </Button>
            {/* Show modal info doctor */}
            <Modal
                open={openModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Thông Tin Chi Tiết</TitleName>

                <div className="info-patient-item">
                    <p className="info-patient-item-label">Họ tên: </p>
                    <p className="info-patient-item-desc">{patients?.patient?.person?.username}</p>
                </div>
                <div className="info-patient-item">
                    <p className="info-patient-item-label">Giới tình: </p>
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
            </Modal>
        </div>
    );
}

export default InformationPatient;
