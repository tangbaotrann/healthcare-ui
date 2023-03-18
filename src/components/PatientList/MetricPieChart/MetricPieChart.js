// lib
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';
import {
    filterStatusHealthAlarmOfPatientForChart,
    filterStatusHealthNormalOfPatientForChart,
    filterStatusHealthWarningOfPatientForChart,
} from '~/redux/selector';

function MetricPieChart() {
    const patientStatusNormalChart = useSelector(filterStatusHealthNormalOfPatientForChart);
    const patientStatusAlarmChart = useSelector(filterStatusHealthAlarmOfPatientForChart);
    const patientStatusWarningChart = useSelector(filterStatusHealthWarningOfPatientForChart);

    // console.log('patientStatusAlarmChart ->', patientStatusAlarmChart.length);
    // console.log('patientStatusWarningChart ->', patientStatusWarningChart.length);
    // console.log('patientStatusNormalChart ->', patientStatusNormalChart.length);

    const option = {
        color: [
            // status: normal
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: '#37D137',
                },
                {
                    offset: 1,
                    color: '#84CD84',
                },
            ]),
            // status: alarm
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: '#FF0000',
                },
                {
                    offset: 1,
                    color: '#F26969',
                },
            ]),
            // status: Warning
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: '#FFA500',
                },
                {
                    offset: 1,
                    color: '#F4CD86',
                },
            ]),
        ],
        series: [
            {
                name: 'Item',
                type: 'pie',
                radius: ['60%', '80%'],
                // avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 50,
                    bordeColor: 'black',
                    borderWidth: 5,
                },
                // label: {
                //     show: false,
                //     position: 'center',
                // },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                },
                data: [
                    {
                        value: patientStatusNormalChart.length,
                        name: `Bình thường (${patientStatusNormalChart.length} bệnh nhân)`,
                    },
                    {
                        value: patientStatusAlarmChart.length,
                        name: `Báo động (${patientStatusAlarmChart.length} bệnh nhân)`,
                    },
                    {
                        value: patientStatusWarningChart.length,
                        name: `Cảnh báo (${patientStatusWarningChart.length} bệnh nhân)`,
                    },
                ],
            },
        ],
    };

    return <ReactECharts style={{ height: 200, marginTop: '0px', marginBottom: '10px' }} option={option} />;
}

export default MetricPieChart;
