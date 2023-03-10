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
                        name: `B??nh th?????ng (${patientStatusNormalChart.length} b???nh nh??n)`,
                    },
                    {
                        value: patientStatusAlarmChart.length,
                        name: `B??o ?????ng (${patientStatusAlarmChart.length} b???nh nh??n)`,
                    },
                    {
                        value: patientStatusWarningChart.length,
                        name: `C???nh b??o (${patientStatusWarningChart.length} b???nh nh??n)`,
                    },
                ],
            },
        ],
    };

    return <ReactECharts style={{ height: 140, marginTop: '10px' }} option={option} />;
}

export default MetricPieChart;
