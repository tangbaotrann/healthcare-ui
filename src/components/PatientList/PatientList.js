// lib
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import './PatientList.css';
import TitleName from '../TitleName';
import {
    fetchApiScheduleDetailByIdDoctorSelector,
    userBMIListSelectorFilter,
    userBloodPressureListSelectorFilter,
    userGlycemicListSelectorFilter,
} from '~/redux/selector';
import { fetchApiBMIByIdPatient } from '~/redux/features/metric/bmisSlice';
import { fetchApiGlycemicByIdPatient } from '~/redux/features/metric/glycemicSlice';
import { fetchApiBloodPressureByIdPatient } from '~/redux/features/metric/bloodPressure';
import BarChart from '../BarChart';
import StatusHeathLoader from '../StatusHeathLoader';
import MetricPieChart from './MetricPieChart';
import TablePatient from './TablePatient';

function PatientList() {
    const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);
    const [infoPatient, setInfoPatient] = useState({});

    const dispatch = useDispatch();

    const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector); //   scheduleDetailByIdDoctorFilters
    const bmis = useSelector(userBMIListSelectorFilter);
    const glycemics = useSelector(userGlycemicListSelectorFilter);
    const bloodPressures = useSelector(userBloodPressureListSelectorFilter);

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
            width: '11%',
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
                return (
                    <>
                        {record?.props?.status?.message ? (
                            <StatusHeathLoader status={record.props.status} />
                        ) : (
                            'Bạn chưa cập nhật chỉ số sức khỏe'
                        )}
                    </>
                );
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

            {/* List patient */}
            <TablePatient cols={cols} patients={patients} />

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
