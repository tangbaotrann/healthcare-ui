// lib
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Table } from 'antd';

// me
import './ResultHeathPatient.css';
import TitleName from '../TitleName';
import { fetchApiResultHeathByIdPatientSelector, fetchApiScheduleDetailByIdDoctorSelector } from '~/redux/selector';
import { fetchApiResultHeathByIdPatient } from '~/redux/features/patient/patientSlice';
import ResultHealthMessage from './ResultHealthMessage';

function ResultHeathPatient() {
    const [openModal, setOpenModal] = useState(false);
    const [information, setInformation] = useState({});

    const dispatch = useDispatch();

    const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector);
    const resultHeath = useSelector(fetchApiResultHeathByIdPatientSelector);

    // console.log('resultHeath ->', resultHeath);
    // console.log('patient result heath', patients);

    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
            width: '4%',
        },
        {
            key: 'username',
            title: 'Họ & tên',
            dataIndex: 'username',
        },
        {
            key: 'gender',
            title: 'Giới tính',
            dataIndex: 'gender',
        },
        {
            key: 'dob',
            title: 'Năm sinh',
            dataIndex: 'dob',
        },
        {
            key: 'blood',
            title: 'Nhóm máu',
            dataIndex: 'blood',
            width: '10%',
        },
        {
            key: 'address',
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            key: '5',
            render: (record) => {
                return (
                    <>
                        <Button
                            type="primary"
                            style={{ marginRight: '10px' }}
                            onClick={() => handleViewResultHeathPatient(record)}
                        >
                            Xem chi tiết
                        </Button>
                    </>
                );
            },
        },
    ];

    // handle result health
    const handleViewResultHeathPatient = (record) => {
        dispatch(fetchApiResultHeathByIdPatient(record._id));
        setOpenModal(true);
        setInformation(record);
    };

    // hide modal
    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <div className="wrapper-result-heath">
            <TitleName>Danh Sách Kết Quả Khám Của Bệnh Nhân</TitleName>

            {/* List patients */}
            <Table
                columns={cols}
                dataSource={patients.map(({ patient }, index) => ({
                    index: index + 1,
                    username: patient?.person?.username,
                    gender: patient?.person?.gender === true ? 'Nam' : 'Nữ',
                    dob: patient?.person?.dob,
                    blood: patient?.blood,
                    address: patient?.person?.address,
                    _id: patient?._id,
                }))}
                rowKey="index"
            ></Table>

            {/* Modal */}
            <Modal
                open={openModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >
                <TitleName>Kết Quả Khám Gần Nhất</TitleName>

                <ResultHealthMessage resultHeath={resultHeath} information={information} />
            </Modal>
        </div>
    );
}

export default ResultHeathPatient;
