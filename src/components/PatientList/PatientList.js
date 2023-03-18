// lib
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import './PatientList.css';
import TitleName from '../TitleName';
import {
    fetchApiBMIByIdPatientSelector,
    fetchApiBloodPressuresByIdPatientSelector,
    fetchApiGlycemicByIdPatientSelector,
    fetchApiScheduleDetailByIdDoctorSelector,
} from '~/redux/selector';
import { fetchApiBMIByIdPatient } from '~/redux/features/metric/bmisSlice';
import { fetchApiGlycemicByIdPatient } from '~/redux/features/metric/glycemicSlice';
import { fetchApiBloodPressureByIdPatient } from '~/redux/features/metric/bloodPressure';
import BarChart from '../BarChart';
import StatusHeathLoader from '../StatusHeathLoader';
import MetricPieChart from './MetricPieChart';

function PatientList() {
    const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);
    const [infoPatient, setInfoPatient] = useState({});

    const dispatch = useDispatch();

    const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector); //   scheduleDetailByIdDoctorFilters
    const bmis = useSelector(fetchApiBMIByIdPatientSelector);
    const glycemics = useSelector(fetchApiGlycemicByIdPatientSelector);
    const bloodPressures = useSelector(fetchApiBloodPressuresByIdPatientSelector);

    // console.log('patients', patients);
    // console.log('bmis', bmis);
    // console.log('glycemics', glycemics);
    // console.log('bloodPressures', bloodPressures);

    // view detail patient
    const handleViewDetailPatient = (record) => {
        dispatch(fetchApiBMIByIdPatient(record._id));
        dispatch(fetchApiGlycemicByIdPatient(record._id));
        dispatch(fetchApiBloodPressureByIdPatient(record._id));
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
            key: 'blood',
            title: 'Nhóm máu',
            dataIndex: 'blood',
            width: '10%',
        },
        {
            key: 'cal_bmi',
            title: 'BMI trung bình',
            dataIndex: 'cal_bmi',
            width: '12%',
        },
        {
            key: 'glycemic',
            title: 'Đường huyết',
            dataIndex: 'glycemic',
            width: '10%',
        },
        {
            key: 'blood_pressures',
            title: 'Huyết áp',
            dataIndex: 'blood_pressures',
            width: '19%',
        },
        {
            key: 'status',
            title: 'Sức khỏe',
            dataIndex: 'status',
            width: '20%',
            render: (record) => {
                return <>{record.props.status.message ? <StatusHeathLoader status={record.props.status} /> : null}</>;
            },
            filters: [
                { text: 'Bình thường', value: 0 },
                { text: 'Cảnh báo', value: 1 },
                { text: 'Báo động', value: 2 },
            ],
            onFilter: (value, record) => {
                return record.status.props.status.message.code === value;
            },
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
                dataSource={patients.map(({ patient, bmis, glycemics, blood_pressures, status }, index) => ({
                    index: index + 1,
                    username: patient?.person?.username,
                    gender: patient?.person?.gender === true ? 'Nam' : 'Nữ',
                    dob: patient?.person?.dob,
                    blood: patient?.blood,
                    cal_bmi: bmis
                        ? bmis.map((_bmi) => {
                              return _bmi.cal_bmi;
                          })[bmis.length - 1]
                        : 0,
                    glycemic: glycemics
                        ? glycemics.map((_glycemic) => {
                              return _glycemic.metric;
                          })[glycemics.length - 1]
                        : 0,
                    blood_pressures: blood_pressures
                        ? blood_pressures.map((_blood) => {
                              return `Tâm trương: ${_blood.diastole} - Tâm thu: ${_blood.systolic}`;
                          })[blood_pressures.length - 1]
                        : 0,
                    address: patient?.person?.address,
                    status: status.message ? <StatusHeathLoader status={status} /> : null,
                    _id: patient?._id,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 4,
                }}
            ></Table>

            {/* Chart (MBI & GLYCEMIC) */}
            <div className="patient-list-chart">
                <h2 className="patient-list-chart-title">Thống Kê Trạng Thái Sức Khỏe:</h2>
                <MetricPieChart />
            </div>

            {/* View profile doctor */}
            <Modal
                open={showModalProfileDoctor}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >
                <BarChart bmis={bmis} glycemics={glycemics} bloodPressures={bloodPressures} infoPatient={infoPatient} />
            </Modal>
        </>
    );
}

export default PatientList;
