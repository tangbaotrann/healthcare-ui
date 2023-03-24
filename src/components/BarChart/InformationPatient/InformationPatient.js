function InformationPatient({ infoPatient }) {
    return (
        <div className="info-patient">
            <div className="info-detail">
                <strong>Họ và tên: </strong>
                <p className="info-text"> {infoPatient.username}</p>
            </div>
            <div className="info-detail">
                <strong>Năm sinh: </strong>
                <p className="info-text"> {infoPatient.dob}</p>
            </div>
            <div className="info-detail">
                <strong>Địa chỉ: </strong>
                <p className="info-text"> {infoPatient.address}</p>
            </div>
            <div className="info-detail">
                <strong>Giới tính: </strong>
                <p className="info-text"> {infoPatient.gender}</p>
            </div>
            <div className="info-detail">
                <strong>Nhóm máu: </strong>
                <p className="info-text"> {infoPatient.blood}</p>
            </div>
        </div>
    );
}

export default InformationPatient;
