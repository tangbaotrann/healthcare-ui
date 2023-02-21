// lib
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

// me
import {
    fetchApiBMIByIdPatientSelector,
    fetchApiGlycemicByIdPatientSelector,
    fetchApiScheduleDetailByIdDoctorSelector,
} from '~/redux/selector';
import { fetchApiBMIByIdPatient } from '~/redux/features/metric/bmisSlice';
import { fetchApiGlycemicByIdPatient } from '~/redux/features/metric/glycemicSlice';

// get chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BarChart() {
    const dispatch = useDispatch();

    const patients = useSelector(fetchApiScheduleDetailByIdDoctorSelector); //   scheduleDetailByIdDoctorFilters
    const bmis = useSelector(fetchApiBMIByIdPatientSelector);
    const glycemics = useSelector(fetchApiGlycemicByIdPatientSelector);

    // console.log('patients', patients);
    // console.log('bmis', bmis);
    // console.log('glycemics', glycemics);

    // BMI
    useEffect(() => {
        dispatch(fetchApiBMIByIdPatient(patients));
    }, [patients]);

    // Glycemic
    useEffect(() => {
        dispatch(fetchApiGlycemicByIdPatient(patients));
    }, [patients]);

    // Opts
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê sức khỏe hằng ngày của bệnh nhân',
            },
        },
    };

    // labels
    const labels = bmis?.bmis?.map((bmi) => moment(bmi.createdAt).format('DD-MM-YYYY'));

    // Data
    const data = {
        labels,
        datasets: [
            {
                label: 'Glycemic',
                data: glycemics?.map((glycemic) => glycemic.metric),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `BMI (BMI trung bình: ${bmis?.avgBMI})`,
                data: bmis?.bmis?.map((bmi) => bmi.calBMI),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} height={180} width={400} />;
}

export default BarChart;
