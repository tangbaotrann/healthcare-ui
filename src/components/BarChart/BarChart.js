import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function BarChart() {
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
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // Data
    const data = {
        labels,
        datasets: [
            {
                label: 'Glycemic',
                data: [12, 3, 5, 6, 4, 8, 5],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'BMI',
                data: [9, 12, 19, 3, 5, 2, 4],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} height={180} width={400} />;
}
