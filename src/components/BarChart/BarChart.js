// lib
import moment from 'moment';
import React, { useEffect } from 'react';
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
import { Button, Divider, Select } from 'antd';

// me
import './BarChart.css';
import TitleName from '../TitleName';
import { endPoints } from '~/routers';
import { getDoctorLoginFilter } from '~/redux/selector';
import glycemicSlice from '~/redux/features/metric/glycemicSlice';
import bmisSlice from '~/redux/features/metric/bmisSlice';
import bloodPressureSlice from '~/redux/features/metric/bloodPressure';
import InformationPatient from './InformationPatient';
import ModalRemind from './ModalRemind/ModalRemind';
import ModalStopExaminated from './ModalStopExaminated/ModalStopExaminated';
import ModalMovePatient from './ModalMovePatient/ModalMovePatient';

// get chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BarChart({ bmis, glycemics, bloodPressures, infoPatient, handleCancel }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getIdDoctor = useSelector(getDoctorLoginFilter);

    // console.log('bmis', bmis);
    // console.log('glycemics', glycemics);
    // console.log('filterChartGlycemic', filterChartGlycemic);
    // console.log('infoPatient', infoPatient);
    // console.log('getIdDoctor', getIdDoctor);

    // Option bmi
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

    // Option glycemic
    const optionsGlycemic = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê chỉ số Đường huyết của bệnh nhân',
            },
        },
    };

    // Option bloob pressure
    const optionBloodPressure = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê chỉ số Huyết áp của bệnh nhân',
            },
        },
    };

    // labels bmi
    const labels = bmis?.map((bmi) => moment(bmi.createdAt).format('DD-MM-YYYY'));

    // labels glycemic
    const labelsGlycemic = glycemics?.map((glycemic) => moment(glycemic.createdAt).format('DD-MM-YYYY'));

    const lablelArrs = new Set([...labelsGlycemic]);
    const resultsLabelsGlycemic = Array.from(lablelArrs);

    // labels blood pressure
    const labelsBloodPressure = bloodPressures?.map((_blood) => moment(_blood.createdAt).format('DD-MM-YYYY'));

    // Data BMI
    const data = {
        labels,
        datasets: [
            {
                label: `BMI (BMI trung bình: )`,
                data: bmis ? bmis.map((bmi) => bmi.cal_bmi) : 0,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    // data glycemic
    const dataGlycemic = {
        labels: resultsLabelsGlycemic,
        datasets: [
            {
                label: 'Đường huyết trước bữa ăn (TH 1)',
                data: glycemics
                    .filter((filter_glycemic) => filter_glycemic.case === 1)
                    .map((glycemic) => glycemic.metric),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Đường huyết sau bữa ăn (TH 2)',
                data: glycemics
                    .filter((filter_glycemic) => filter_glycemic.case === 2)
                    .map((glycemic) => glycemic.metric),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Đường huyết trước lúc ngủ (TH 3)',
                data: glycemics
                    .filter((filter_glycemic) => filter_glycemic.case === 3)
                    .map((glycemic) => glycemic.metric),
                borderColor: 'rgb(93, 235, 53)',
                backgroundColor: 'rgba(93, 235, 53, 0.5)',
            },
        ],
    };

    // Data blood pressure
    const dataBloodPressure = {
        labels: labelsBloodPressure,
        datasets: [
            {
                label: `Diastole (Tâm trương)`,
                data: bloodPressures ? bloodPressures.map((_blood) => _blood.diastole) : 0,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: `Systolic (Tâm thu)`,
                data: bloodPressures ? bloodPressures.map((_blood) => _blood.systolic) : 0,
                borderColor: 'rgb(93, 235, 53)',
                backgroundColor: 'rgba(93, 235, 53, 0.5)',
            },
        ],
    };

    // handle maps navigate
    const handleMapsNavigate = () => {
        navigate(`${endPoints.maps}/${infoPatient.address}`);
    };

    useEffect(() => {
        dispatch(glycemicSlice.actions.arrivalFilterGlycemic('all'));
    }, []);

    useEffect(() => {
        dispatch(bmisSlice.actions.arrivalFilterBMI('all'));
    }, []);

    useEffect(() => {
        dispatch(bloodPressureSlice.actions.arrivalFilterBloodPressure('all'));
    }, []);

    // filter chart glycemic
    const handleChangeFilterGlycemic = (value) => {
        dispatch(glycemicSlice.actions.arrivalFilterGlycemic(value));
        dispatch(bmisSlice.actions.arrivalFilterBMI(value));
        dispatch(bloodPressureSlice.actions.arrivalFilterBloodPressure(value));
    };

    return (
        <>
            <TitleName>Thông Tin Cá Nhân</TitleName>

            <div className="container-bar-chart">
                {/* Info patient */}
                <InformationPatient infoPatient={infoPatient} />

                <Button className="position-on-map-btn" onClick={handleMapsNavigate}>
                    Xem vị trí trên maps
                </Button>
            </div>

            <Divider />

            <div className="container-chart">
                {/* Status text message notification */}
                <p className="message-status-desc">
                    <span className="message-status-lbl">Thông báo:</span>
                    {infoPatient.status.props.status.message ? infoPatient.status.props.status.message.status : ''}
                </p>
                <div className="inner-chart">
                    <div className="filter-glycemic">
                        <Select
                            options={[
                                { value: 'all', label: 'Tất cả' },
                                { value: 'week', label: 'Theo tuần' },
                                { value: 'month', label: 'Theo tháng' },
                            ]}
                            defaultValue="all"
                            style={{ width: 140 }}
                            onSelect={handleChangeFilterGlycemic}
                        />
                    </div>
                    <Line options={optionsGlycemic} data={dataGlycemic} height={260} width={400} />
                </div>

                <div className="bmi-glycemic-container">
                    {/* BMI */}
                    <div className="inner-chart">
                        <Line options={options} data={data} height={260} width={400} />
                    </div>
                    {/* Huyết áp */}
                    <div className="blood-pressures-container">
                        <div className="inner-chart">
                            <Line options={optionBloodPressure} data={dataBloodPressure} height={260} width={400} />
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="display-btn-modal-footer">
                {/* Modal remind */}
                <ModalRemind getIdDoctor={getIdDoctor} infoPatient={infoPatient} />

                {/* Modal stop examinated */}
                <ModalStopExaminated getIdDoctor={getIdDoctor} infoPatient={infoPatient} handleCancel={handleCancel} />

                {/* Modal move patient */}
                <ModalMovePatient getIdDoctor={getIdDoctor} infoPatient={infoPatient} handleCancel={handleCancel} />
            </div>
        </>
    );
}

export default BarChart;
