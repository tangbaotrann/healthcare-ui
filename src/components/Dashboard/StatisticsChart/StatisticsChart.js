// lib
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import moment from 'moment';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';

// me
import './StatisticsChart.css';
import {
    isLoadingAllPostByIdDoctorSelector,
    isLoadingAllShiftsDoctorSelector,
    isLoadingConversationsSelector,
    isLoadingNotificationSelector,
    isLoadingScheduleDetailByIdDoctorSelector,
    isLoadingScheduleDoctorSelector,
    isLoadingScheduleMedicalAppointmentResultExamSelector,
    isLoadingUserDoctorByTokenSelector,
} from '~/redux/selector';

function StatisticsChart({ feeOfPatientResultedExam }) {
    // isLoading
    const isLoadingScheduleDoctor = useSelector(isLoadingScheduleDoctorSelector);
    const isLoadingNotification = useSelector(isLoadingNotificationSelector);
    const isLoadingUser = useSelector(isLoadingUserDoctorByTokenSelector);
    const isLoadingScheduleDetail = useSelector(isLoadingScheduleDetailByIdDoctorSelector);
    const isLoadingConversation = useSelector(isLoadingConversationsSelector);
    const isLoadingAllShiftsDoctor = useSelector(isLoadingAllShiftsDoctorSelector);
    const isLoadingAllPostByIdDoctor = useSelector(isLoadingAllPostByIdDoctorSelector);
    const isLoadingScheduleMedicalAppointmentResultExam = useSelector(
        isLoadingScheduleMedicalAppointmentResultExamSelector,
    );

    // console.log('feeOfPatientResultedExam', feeOfPatientResultedExam);

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
                data: feeOfPatientResultedExam?.map((_schedule) => moment(_schedule.day_exam).format('DD-MM-YYYY')),
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
                data:
                    feeOfPatientResultedExam?.length > 0
                        ? feeOfPatientResultedExam.map((_schedule) => _schedule.schedule.fee)
                        : 0,
            },
        ],
    };

    return (
        <div className="statistics-chart-wrapper">
            {isLoadingScheduleDoctor ||
            isLoadingNotification ||
            isLoadingUser ||
            isLoadingScheduleDetail ||
            isLoadingConversation ||
            isLoadingAllShiftsDoctor ||
            isLoadingAllPostByIdDoctor ||
            isLoadingScheduleMedicalAppointmentResultExam ? (
                <Skeleton active />
            ) : (
                <>
                    <ReactECharts option={option} className="statistics-chart-dashboard" />

                    <div className="statistics-chart-note-text">
                        <p className="statistics-chart-note-text-title">Biểu đồ: </p>
                        <p className="statistics-chart-note-text-desc">
                            Thống kê tổng doanh thu của tất cả các lịch đã khám cho bệnh nhân
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default StatisticsChart;
