// lib
import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import TitleName from '../TitleName';
import { fetchApiBMIByIdPatientSelector, fetchApiScheduleDetailByIdDoctorSelector } from '~/redux/selector';
import { fetchApiBMIByIdPatient } from '~/redux/features/layout/metric/bmisSlice';

function PatientList() {
    // const dispatch = useDispatch();

    // const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector); //   scheduleDetailByIdDoctorFilters
    // const bmis = useSelector(fetchApiBMIByIdPatientSelector);

    // console.log('patients', patients[0]);
    // console.log('bmis', bmis);

    // useEffect(() => {
    //     dispatch(fetchApiBMIByIdPatient(patients));
    // }, [patients]);

    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
        },
        {
            key: 'name',
            title: 'Họ & tên',
            dataIndex: 'name',
        },
    ];

    return (
        <>
            <TitleName>Danh sách bệnh nhân đăng ký khám</TitleName>

            <Table columns={cols} rowKey="index"></Table>
        </>
    );
}

export default PatientList;
