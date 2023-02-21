// lib
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// me
import TitleName from '../TitleName';
import { fetchApiScheduleDetailByIdDoctorSelector } from '~/redux/selector';

function PatientList() {
    const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);

    const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector); //   scheduleDetailByIdDoctorFilters

    // console.log('patients', patients);

    // view detail patient
    const handleViewDetailPatient = (record) => {
        console.log('rec', record);
        // dispatch(fetchApiScheduleDetailByIdDoctor(record._id));
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
        },
        {
            key: 'bmi_avg',
            title: 'BMI trung bình',
            dataIndex: 'bmi_avg',
        },
        {
            key: 'glycemic',
            title: 'Chỉ số đường huyết',
            dataIndex: 'glycemic',
        },
        {
            key: '5',
            render: (record) => {
                return (
                    <>
                        <Button
                            type="dashed"
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
            <TitleName>Danh sách bệnh nhân đăng ký khám</TitleName>

            <Table
                columns={cols}
                dataSource={patients.map(({ patient, bmi_avg, glycemic }, index) => ({
                    index: index + 1,
                    username: patient?.person.username,
                    gender: patient?.person?.gender === true ? 'Nam' : 'Nữ',
                    dob: patient?.person?.dob,
                    blood: patient?.blood,
                    bmi_avg: bmi_avg ? bmi_avg : 0,
                    glycemic: glycemic ? glycemic.metric : 0,
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
            >
                {/* <BarChart /> */}
            </Modal>
        </>
    );
}

export default PatientList;
