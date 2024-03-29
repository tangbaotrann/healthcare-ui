// lib
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Table } from 'antd';
import moment from 'moment';

// me
import './ResultHeathPatient.css';
import TitleName from '../TitleName';
import { fetchApiResultHeathByIdPatientSelector, scheduleDetailByIdDoctorFilters } from '~/redux/selector';
import { fetchApiResultHeathByIdPatient } from '~/redux/features/patient/patientSlice';
import ResultHealthMessage from './ResultHealthMessage';

function ResultHeathPatient() {
    const [openModal, setOpenModal] = useState(false);
    const [information, setInformation] = useState({});

    const dispatch = useDispatch();

    const patients = useSelector(scheduleDetailByIdDoctorFilters); //  fetchApiScheduleDetailByIdDoctorSelector
    const resultHeath = useSelector(fetchApiResultHeathByIdPatientSelector);

    // console.log('patient result heath', patients);
    // console.log('resultHeath ->', resultHeath);

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
                    dob: moment(patient?.dob).format('DD/MM/YYYY'),
                    blood: patient?.blood,
                    address: patient?.person?.address,
                    _id: patient?._id,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 8,
                }}
            ></Table>

            {/* Modal */}
            <Modal
                open={openModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1200}
                centered={true}
            >
                <TitleName>Kết Quả Khám Gần Nhất</TitleName>

                <ResultHealthMessage resultHeath={resultHeath} information={information} />
            </Modal>
        </div>
    );
}

export default ResultHeathPatient;
