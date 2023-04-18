import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';
import { Button } from 'antd';

import DefaultLayout from '~/layouts/DefaultLayout';
import './MetricsPatient.css';
import {
    fetchApiAllBMIOfPatientSelector,
    fetchApiAllBloodOfPatientSelector,
    fetchApiAllGlycemicOfPatientSelector,
    fetchApiAllPatientsSelector,
} from '~/redux/selector';
import ChatBot from '~/components/ChatBot';
import Footer from '~/layouts/components/Footer';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import {
    fetchApiAllBMIOfPatient,
    fetchApiAllBloodOfPatient,
    fetchApiAllGlycemicOfPatient,
} from '~/redux/features/metric/bmisSlice';
import socket from '~/utils/socket';
import MetricsBMI from '~/components/MetricsBMI';
import MetricsGlycemic from '~/components/MetricsGlycemic';
import MetricsBlood from '~/components/MetricsBlood';

function MetricsPatient() {
    const [statusBMI, setStatusBMI] = useState(true);
    const [statusGlycemic, setStatusGlycemic] = useState(false);
    const [statusBlood, setStatusBlood] = useState(false);

    const patients = useSelector(fetchApiAllPatientsSelector);
    const bmiPatient = useSelector(fetchApiAllBMIOfPatientSelector);
    const glycemicPatient = useSelector(fetchApiAllGlycemicOfPatientSelector);
    const bloodPatient = useSelector(fetchApiAllBloodOfPatientSelector);

    // console.log('bmiPatient', bmiPatient);
    // console.log('glycemicPatient', glycemicPatient);
    // console.log('bloodPatient', bloodPatient);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllBMIOfPatient(patients?.patient?._id));
    }, [patients?.patient?._id]);

    useEffect(() => {
        socket.emit('add_user', patients?.patient?._id);
    }, [patients?.patient?._id]);

    const handleStatusMetricsBMI = () => {
        setStatusBMI(true);
        setStatusGlycemic(false);
        setStatusBlood(false);
        dispatch(fetchApiAllBMIOfPatient(patients?.patient?._id));
    };

    const handleStatusMetricsGlycemic = () => {
        setStatusGlycemic(true);
        setStatusBMI(false);
        setStatusBlood(false);
        dispatch(fetchApiAllGlycemicOfPatient(patients?.patient?._id));
    };

    const handleStatusMetricsBlood = () => {
        setStatusBlood(true);
        setStatusGlycemic(false);
        setStatusBMI(false);
        dispatch(fetchApiAllBloodOfPatient(patients?.patient?._id));
    };

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />

            <div className="register-schedule-appointment-wrapper">
                <div className="metrics-banner">
                    <div className="register-schedule-appointment-title-name metric-title-name">
                        QUẢN LÝ CÁC CHỈ SỐ HẰNG NGÀY
                    </div>
                    <div className="metrics-left-banner">
                        <img
                            style={{ width: '100%' }}
                            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/premium/doctor-bg.svg"
                            alt="banner-metrics"
                        />
                        <div className="metrics-left-ball"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="register-schedule-appointment-container">
                    <div className="progress-bar"></div>

                    <div className="register-schedule-appointment-content-container">
                        {/* Header */}
                        <div className="content-header">
                            <h2 className="content-header-title">Các chỉ số của bạn</h2>
                        </div>

                        <div className="metrics-btn-container">
                            <Button
                                className={`${statusBMI ? 'metrics-btn-active' : 'metrics-btn'}`}
                                onClick={handleStatusMetricsBMI}
                            >
                                BMI
                            </Button>
                            <Button
                                className={`${statusGlycemic ? 'metrics-btn-active' : 'metrics-btn'}`}
                                onClick={handleStatusMetricsGlycemic}
                            >
                                Đường huyết
                            </Button>
                            <Button
                                className={`${statusBlood ? 'metrics-btn-active' : 'metrics-btn'}`}
                                onClick={handleStatusMetricsBlood}
                            >
                                Huyết áp
                            </Button>
                        </div>

                        {/* Show status metrics */}
                        <div className="metrics-status-show">
                            {statusBMI && <MetricsBMI patients={patients} bmiPatient={bmiPatient} />}
                            {statusGlycemic && (
                                <MetricsGlycemic patients={patients} glycemicPatient={glycemicPatient} />
                            )}
                            {statusBlood && <MetricsBlood patients={patients} bloodPatient={bloodPatient} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="s">
                <Footer className="test-g" />
            </div>
        </DefaultLayout>
    );
}

export default MetricsPatient;
