// lib
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
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
import { Button, Divider } from 'antd';

// me
import './BarChart.css';
import TitleName from '../TitleName';
import { endPoints } from '~/routers';

// get chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BarChart({ bmis, glycemics, infoPatient }) {
    // console.log('patients', patients);
    // console.log('bmis', bmis);
    // console.log('glycemics', glycemics);
    console.log('infoPatient', infoPatient);

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

    return (
        <>
            <TitleName>Thông tin cá nhân</TitleName>

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

                <Button className="position-on-map-btn">
                    <Link
                        to={endPoints.maps}
                        // state={{ infoPatient: infoPatient }}
                        target="_blank"
                        style={{ color: '#fff' }}
                    >
                        Xem vị trí trên maps
                    </Link>
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
        </>
    );
}

export default BarChart;
