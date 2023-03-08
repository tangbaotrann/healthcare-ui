// lib
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button, Divider, Form, Input, message, Modal } from 'antd';

// me
import './BarChart.css';
import TitleName from '../TitleName';
import { endPoints } from '~/routers';
import { getDoctorLoginFilter } from '~/redux/selector';
import { fetchApiRemindPatient } from '~/redux/features/patient/patientSlice';

// get chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BarChart({ bmis, glycemics, infoPatient }) {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getIdDoctor = useSelector(getDoctorLoginFilter);

    // console.log('patients', patients);
    // console.log('bmis', bmis);
    // console.log('glycemics', glycemics);
    // console.log('infoPatient', infoPatient);
    // console.log('getIdDoctor', getIdDoctor);

    // Opts
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê chỉ số BMI của bệnh nhân',
            },
        },
    };

    //
    const optionsGlycemic = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê chỉ số Glycemic của bệnh nhân',
            },
        },
    };

    // labels
    const labels = bmis?.bmis?.map((bmi) => moment(bmi.createdAt).format('DD-MM-YYYY'));
    const labelsGlycemic = glycemics?.map((glycemic) => moment(glycemic.createdAt).format('DD-MM-YYYY'));

    // Data BMI
    const data = {
        labels,
        datasets: [
            {
                label: `BMI (BMI trung bình: ${bmis?.avgBMI})`,
                data: bmis?.bmis?.map((bmi) => bmi.calBMI),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    // data glycemic
    const dataGlycemic = {
        labels: labelsGlycemic,
        datasets: [
            {
                label: 'Glycemic',
                data: glycemics?.map((glycemic) => glycemic.metric),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    // show modal remind
    const handleShowModalRemind = () => {
        setShowModal(true);
    };

    // hinde modal remind
    const handleCancel = () => {
        setShowModal(false);
    };

    // handle maps navigate
    const handleMapsNavigate = () => {
        navigate(`${endPoints.maps}/${infoPatient.address}`);
    };

    // handle submit button remind
    const handleRemindOnFish = (values) => {
        if (values) {
            dispatch(fetchApiRemindPatient(values));
            setShowModal(false);
            message.success('Tạo nhắc nhở thành công.');
        } else {
            message.error('Tạo nhắc nhở không thành công!');
            return;
        }
    };

    return (
        <>
            <TitleName>Thông Tin Cá Nhân</TitleName>

            <div className="container-bar-chart">
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

                <Button className="position-on-map-btn" onClick={handleMapsNavigate}>
                    Xem vị trí trên maps
                </Button>
            </div>

            <Divider />

            <div className="container-chart">
                <div className="inner-chart">
                    <Line options={options} data={data} height={260} width={400} />
                </div>
                <div className="inner-chart">
                    <Line options={optionsGlycemic} data={dataGlycemic} height={260} width={400} />
                </div>
            </div>

            <Divider />

            {/* Button remind */}
            <div className="remind-patient">
                <Button className="remind-patient-btn" onClick={handleShowModalRemind}>
                    Nhắc nhở bệnh nhân
                </Button>
            </div>

            {/* Modal remind */}
            <Modal
                open={showModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Nhắc Nhở Bệnh Nhân Cần Chú Ý Đến Sức Khỏe</TitleName>

                <Form
                    onFinish={handleRemindOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                    fields={[
                        { name: ['from'], value: getIdDoctor._id },
                        { name: ['idPatient'], value: infoPatient._id },
                    ]}
                >
                    {/* content */}
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập nội dung để nhắc nhở bệnh nhân.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Nhập nội dung..." />
                    </Form.Item>

                    {/* Id doctor */}
                    <Form.Item name="from" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Id patient */}
                    <Form.Item name="idPatient" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Button confirm remind */}
                    <Button type="primary" htmlType="submit" block>
                        Tạo nhắc nhở
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default BarChart;
