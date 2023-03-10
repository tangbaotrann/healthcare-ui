// lib
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

// me
import './StatisticsChart.css';

function StatisticsChart() {
    // option
    const option = {
        color: ['#FE4C00'],
        toolbox: {
            feature: {
                saveAsImage: {},
            },
            color: 'red',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
            backgroundColor: '#fff',
            borderWidth: 0,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: false,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            {
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgb(255, 191, 0)' },
                        { offset: 1, color: '#F450D3' },
                    ]),
                    width: 4,
                },
                areaStyle: {
                    opacity: 0.5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                        { offset: 0, color: '#FE4C00' },
                        { offset: 1, color: 'rgba(255, 144, 70, 0.1)' },
                    ]),
                },
                emaphasis: {
                    focus: 'series',
                },
                showSymbol: false,
                data: [28000, 19000, 320000, 180000, 410000, 300000, 260000],
            },
        ],
    };

    return (
        <div className="statistics-chart-wrapper">
            <ReactECharts option={option} />
        </div>
    );
}

export default StatisticsChart;
