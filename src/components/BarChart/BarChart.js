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
import {
    btnClickedOpenHistorySelector,
    fetchApiHistoryExamOfPatientSelector,
    getDoctorLoginFilter,
} from '~/redux/selector';
import glycemicSlice from '~/redux/features/metric/glycemicSlice';
import bmisSlice from '~/redux/features/metric/bmisSlice';
import bloodPressureSlice from '~/redux/features/metric/bloodPressure';
import InformationPatient from './InformationPatient';
import ModalRemind from './ModalRemind/ModalRemind';
import ModalStopExaminated from './ModalStopExaminated/ModalStopExaminated';
import ModalMovePatient from './ModalMovePatient/ModalMovePatient';
import { LeftOutlined } from '@ant-design/icons';
import patientSlice, { fetchApiHistoryExamOfPatient } from '~/redux/features/patient/patientSlice';
import HistoryExamOfPatient from '../HistoryExamOfPatient/HistoryExamOfPatient';

// get chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BarChart({ bmis, glycemics, bloodPressures, infoPatient, handleCancel }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getIdDoctor = useSelector(getDoctorLoginFilter);
    const historyExams = useSelector(fetchApiHistoryExamOfPatientSelector);
    const openHistory = useSelector(btnClickedOpenHistorySelector);

    // console.log('openHistory', openHistory);
    // console.log('historyExams', historyExams);
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
                data: resultsLabelsGlycemic.map((day, index) => {
                    const metrics = glycemics.filter((filter_glycemic) => {
                        const res = filter_glycemic.case === 1;
                        return res;
                    });

                    const metric = metrics.find((metric) => moment(metric.createdAt).format('DD-MM-YYYY') === day);
                    // console.log({ metric });
                    return metric ? metric.metric : 0;
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Đường huyết sau bữa ăn (TH 2)',
                data: resultsLabelsGlycemic.map((day, index) => {
                    const metrics = glycemics.filter((filter_glycemic) => {
                        const res = filter_glycemic.case === 2;
                        return res;
                    });

                    const metric = metrics.find((metric) => moment(metric.createdAt).format('DD-MM-YYYY') === day);
                    // console.log({ metric });
                    return metric ? metric.metric : 0;
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Đường huyết trước lúc ngủ (TH 3)',
                data: resultsLabelsGlycemic.map((day, index) => {
                    const metrics = glycemics.filter((filter_glycemic) => {
                        const res = filter_glycemic.case === 3;
                        return res;
                    });

                    const metric = metrics.find((metric) => moment(metric.createdAt).format('DD-MM-YYYY') === day);
                    // console.log({ metric });
                    return metric ? metric.metric : 0;
                }),
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

    const handleWatchHistoryPatient = () => {
        dispatch(fetchApiHistoryExamOfPatient(infoPatient._id));
        // setOpenHistory(true);
        dispatch(patientSlice.actions.clickedOpenHistory('show'));
    };

    const hideHistory = () => {
        // setOpenHistory(false);
        dispatch(patientSlice.actions.clickedOpenHistory(null));
    };

    return (
        <>
            <div style={{ marginTop: '-28px' }}>
                <TitleName>Thông Tin Cá Nhân</TitleName>
            </div>

            <div className="display-modal-patient-list">
                <div className="container-modal-patient-list">
                    <div className="container-bar-chart">
                        {/* Info patient */}
                        <InformationPatient infoPatient={infoPatient} />
                    </div>

                    {/* Status text message notification */}
                    <p className="message-status-desc">
                        <span className="message-status-lbl">
                            <i style={{ fontWeight: '900' }}>* Thông báo:</i>
                        </span>
                        {infoPatient?.status?.props?.status?.message
                            ? infoPatient?.status?.props?.status?.message?.status
                            : ''}
                    </p>

                    <div className="display-btn-modal-footer">
                        <Button className="position-on-map-btn" onClick={handleMapsNavigate} block>
                            Xem vị trí trên maps
                        </Button>

                        <Button className="history-watch-btn" block onClick={handleWatchHistoryPatient}>
                            Xem lịch sử khám
                        </Button>

                        {/* Modal remind */}
                        <ModalRemind getIdDoctor={getIdDoctor} infoPatient={infoPatient} />

                        {/* Modal stop examinated */}
                        <ModalStopExaminated
                            getIdDoctor={getIdDoctor}
                            infoPatient={infoPatient}
                            handleCancel={handleCancel}
                        />

                        {/* Modal move patient */}
                        <ModalMovePatient
                            getIdDoctor={getIdDoctor}
                            infoPatient={infoPatient}
                            handleCancel={handleCancel}
                        />
                    </div>
                </div>

                <Divider type="vertical" style={{ height: '100vh' }} />

                {openHistory ? (
                    <div className="history-watch">
                        <div className="history-header">
                            <p className="history-icon-back" onClick={hideHistory}>
                                <LeftOutlined /> Lịch sử khám cho bệnh nhân
                            </p>
                        </div>

                        {/* Show history */}
                        <div className="history-body">
                            <HistoryExamOfPatient historyExams={historyExams} className="custom-load-more-btn" />
                        </div>
                    </div>
                ) : (
                    <div className="container-chart">
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

                            <div className="display-chart-gly-blood">
                                {/* Glycemic */}
                                <Line options={optionsGlycemic} data={dataGlycemic} height={260} width={400} />

                                {/* Huyết áp */}
                                <div className="blood-pressures-container">
                                    <div className="inner-chart">
                                        <Line
                                            options={optionBloodPressure}
                                            data={dataBloodPressure}
                                            height={260}
                                            width={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bmi-glycemic-container">
                            {/* BMI */}
                            <div className="inner-chart">
                                <Line options={options} data={data} height={260} width={400} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default BarChart;
