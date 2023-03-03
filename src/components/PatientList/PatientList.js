// lib
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import TitleName from '../TitleName';
import {
    fetchApiBMIByIdPatientSelector,
    fetchApiGlycemicByIdPatientSelector,
    fetchApiScheduleDetailByIdDoctorSelector,
} from '~/redux/selector';
import { fetchApiBMIByIdPatient } from '~/redux/features/metric/bmisSlice';
import BarChart from '../BarChart';
import { fetchApiGlycemicByIdPatient } from '~/redux/features/metric/glycemicSlice';
import StatusHeathLoader from '../StatusHeathLoader';

function PatientList() {
    const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);
    const [infoPatient, setInfoPatient] = useState({});

    const dispatch = useDispatch();

    const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector); //   scheduleDetailByIdDoctorFilters
    const bmis = useSelector(fetchApiBMIByIdPatientSelector);
    const glycemics = useSelector(fetchApiGlycemicByIdPatientSelector);

    console.log('patients', patients);
    // console.log('bmis', bmis);
    // console.log('glycemics', glycemics);

    // view detail patient
    const handleViewDetailPatient = (record) => {
        dispatch(fetchApiBMIByIdPatient(record._id));
        dispatch(fetchApiGlycemicByIdPatient(record._id));
        setInfoPatient(record);
        setShowModalProfileDoctor(true);
    };

    // close modal view profile doctor
    const handleCancel = () => {
        setShowModalProfileDoctor(false);
    };

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
            width: '8%',
        },
        {
            key: 'dob',
            title: 'Năm sinh',
            dataIndex: 'dob',
            width: '10%',
        },
        {
            key: 'blood',
            title: 'Nhóm máu',
            dataIndex: 'blood',
            width: '10%',
        },
        {
            key: 'bmi_avg',
            title: 'BMI trung bình',
            dataIndex: 'bmi_avg',
            width: '12%',
        },
        {
            key: 'glycemic',
            title: 'Đường huyết',
            dataIndex: 'glycemic',
            width: '10%',
        },
        {
            key: 'status',
            title: 'Sức khỏe',
            dataIndex: 'status',
            width: '10%',
        },
        {
            key: '5',
            render: (record) => {
                return (
                    <>
                        <Button
                            type="primary"
                            style={{ marginRight: '10px' }}
                            onClick={() => handleViewDetailPatient(record)}
                        >
                            Xem chi tiết
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <TitleName>Danh Sách Bệnh Nhân Đăng Ký Khám Bệnh</TitleName>

            <Table
                columns={cols}
                dataSource={patients.map(({ patient, bmi_avg, glycemic, status }, index) => ({
                    index: index + 1,
                    username: patient?.person?.username,
                    gender: patient?.person?.gender === true ? 'Nam' : 'Nữ',
                    dob: patient?.person?.dob,
                    blood: patient?.blood,
                    bmi_avg: bmi_avg ? bmi_avg : 0,
                    glycemic: glycemic ? glycemic.metric : 0,
                    address: patient?.person?.address,
                    status: status.message ? <StatusHeathLoader status={status} /> : null,
                    // status?.message?.code === -1 ? (
                    //     <p>Màu cam</p>
                    // ) : status?.message?.code === 2 ? (
                    //     <p>Màu đỏ</p>
                    // ) : (
                    //     <p>Màu xanh</p>
                    // ),
                    _id: patient?._id,
                }))}
                rowKey="index"
            ></Table>

            {/* View profile doctor */}
            <Modal
                open={showModalProfileDoctor}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >
                <BarChart bmis={bmis} glycemics={glycemics} infoPatient={infoPatient} />
            </Modal>
        </>
    );
}

export default PatientList;
