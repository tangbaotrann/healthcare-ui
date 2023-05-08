// me
import { useSelector } from 'react-redux';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Divider, Skeleton } from 'antd';

import './Statistics.css';
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
import StatisticsChart from '../StatisticsChart';
import { groupNumber } from '~/utils/cardsData';

function Statistics({ totalFee, feeOfPatientResultedExam, totalFeeOfWeek, totalFeeOfMonth }) {
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

    return (
        <div className="statistics-wrapper">
            <h2 className="statistics-title">Thống Kê Tổng Quan</h2>

            <Divider />

            <div className="overview-statistics">
                <div className="overview-statistics-item-side">
                    <ArrowUpOutlined className="item-side-icon" />
                    <div className="item-side-text">
                        {isLoadingScheduleDoctor ||
                        isLoadingNotification ||
                        isLoadingUser ||
                        isLoadingScheduleDetail ||
                        isLoadingConversation ||
                        isLoadingAllShiftsDoctor ||
                        isLoadingAllPostByIdDoctor ||
                        isLoadingScheduleMedicalAppointmentResultExam ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Skeleton.Input active style={{ marginBottom: '6px' }} />
                                <Skeleton.Input active />
                            </div>
                        ) : (
                            <>
                                <p className="item-side-top">Tổng doanh thu</p>
                                <p className="item-side-bottom">{groupNumber(totalFee) || 0} VNĐ</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="overview-statistics-item">
                    {isLoadingScheduleDoctor ||
                    isLoadingNotification ||
                    isLoadingUser ||
                    isLoadingScheduleDetail ||
                    isLoadingConversation ||
                    isLoadingAllShiftsDoctor ||
                    isLoadingAllPostByIdDoctor ||
                    isLoadingScheduleMedicalAppointmentResultExam ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Skeleton.Input active style={{ marginBottom: '6px' }} />
                            <Skeleton.Input active />
                        </div>
                    ) : (
                        <>
                            <p className="item-side-top">Doanh thu theo tuần</p>
                            <p className="item-side-bottom">{groupNumber(totalFeeOfWeek) || 0} VNĐ</p>
                        </>
                    )}
                </div>

                <div className="overview-statistics-item">
                    {isLoadingScheduleDoctor ||
                    isLoadingNotification ||
                    isLoadingUser ||
                    isLoadingScheduleDetail ||
                    isLoadingConversation ||
                    isLoadingAllShiftsDoctor ||
                    isLoadingAllPostByIdDoctor ||
                    isLoadingScheduleMedicalAppointmentResultExam ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Skeleton.Input active style={{ marginBottom: '6px' }} />
                            <Skeleton.Input active />
                        </div>
                    ) : (
                        <>
                            <p className="item-side-top">Doanh thu theo tháng</p>
                            <p className="item-side-bottom">{groupNumber(totalFeeOfMonth || 0)} VNĐ</p>
                        </>
                    )}
                </div>
            </div>

            <Divider />

            {/* Chart statistics */}
            <StatisticsChart feeOfPatientResultedExam={feeOfPatientResultedExam} />
        </div>
    );
}

export default Statistics;
