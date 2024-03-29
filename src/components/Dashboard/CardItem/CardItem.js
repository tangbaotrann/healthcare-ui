// me
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import './CardItem.css';
import {
    isLoadingAllPostByIdDoctorSelector,
    isLoadingAllShiftsDoctorSelector,
    isLoadingConversationsSelector,
    isLoadingNotificationSelector,
    isLoadingScheduleDetailByIdDoctorSelector,
    isLoadingScheduleDoctorSelector,
    isLoadingScheduleMedicalAppointmentResultExamSelector,
    isLoadingUserDoctorByTokenSelector,
    totalAppointmentScheduleOfDoctor,
    totalPatients,
    totalScheduleOfDoctor,
} from '~/redux/selector';

function CardItem({ schedules }) {
    const getTotalScheduleOfDoctor = useSelector(totalScheduleOfDoctor);
    const getTotalAppointmentScheduleOfDoctor = useSelector(totalAppointmentScheduleOfDoctor);
    const getTotalPatients = useSelector(totalPatients);

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
        <div className="card-item-wrapper">
            {/* Tổng lịch khám */}
            <div className="card-item">
                {isLoadingScheduleDoctor ||
                isLoadingNotification ||
                isLoadingUser ||
                isLoadingScheduleDetail ||
                isLoadingConversation ||
                isLoadingAllShiftsDoctor ||
                isLoadingAllPostByIdDoctor ||
                isLoadingScheduleMedicalAppointmentResultExam ? (
                    <>
                        <Skeleton.Input active style={{ marginBottom: '8px' }} />
                        <Skeleton.Input active />
                    </>
                ) : (
                    <>
                        <div className="card-item-header">
                            <span className="card-item-header-title">Tổng Lịch Khám </span>
                            <span className="card-item-header-change"></span>
                        </div>

                        <div className="card-item-footer">
                            {/* <span className="card-item-footer-type">Hiện có là: </span> */}
                            <span className="card-item-footer-amount">{getTotalScheduleOfDoctor}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Lịch hẹn khám */}
            <div className="card-item">
                {isLoadingScheduleDoctor ||
                isLoadingNotification ||
                isLoadingUser ||
                isLoadingScheduleDetail ||
                isLoadingConversation ||
                isLoadingAllShiftsDoctor ||
                isLoadingAllPostByIdDoctor ||
                isLoadingScheduleMedicalAppointmentResultExam ? (
                    <>
                        <Skeleton.Input active style={{ marginBottom: '8px' }} />
                        <Skeleton.Input active />
                    </>
                ) : (
                    <>
                        <div className="card-item-header">
                            <span className="card-item-header-title">Lịch Chờ Xác Nhận Khám </span>
                            <span className="card-item-header-change"></span>
                        </div>

                        <div className="card-item-footer">
                            {/* <span className="card-item-footer-type">Hiện có là: </span> */}
                            <span className="card-item-footer-amount">{getTotalAppointmentScheduleOfDoctor}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Ca làm  */}
            <div className="card-item">
                {isLoadingScheduleDoctor ||
                isLoadingNotification ||
                isLoadingUser ||
                isLoadingScheduleDetail ||
                isLoadingConversation ||
                isLoadingAllShiftsDoctor ||
                isLoadingAllPostByIdDoctor ||
                isLoadingScheduleMedicalAppointmentResultExam ? (
                    <>
                        <Skeleton.Input active style={{ marginBottom: '8px' }} />
                        <Skeleton.Input active />
                    </>
                ) : (
                    <>
                        <div className="card-item-header">
                            <span className="card-item-header-title">Ca Làm </span>
                            <span className="card-item-header-change"></span>
                        </div>

                        <div className="card-item-footer">
                            {/* <span className="card-item-footer-type">Hiện có là: </span> */}
                            <span className="card-item-footer-amount">{schedules?.length}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Tổng số bệnh nhân */}
            <div className="card-item">
                {isLoadingScheduleDoctor ||
                isLoadingNotification ||
                isLoadingUser ||
                isLoadingScheduleDetail ||
                isLoadingConversation ||
                isLoadingAllShiftsDoctor ||
                isLoadingAllPostByIdDoctor ||
                isLoadingScheduleMedicalAppointmentResultExam ? (
                    <>
                        <Skeleton.Input active style={{ marginBottom: '8px' }} />
                        <Skeleton.Input active />
                    </>
                ) : (
                    <>
                        <div className="card-item-header">
                            <span className="card-item-header-title">Tổng Số Bệnh Nhân </span>
                            <span className="card-item-header-change"></span>
                        </div>

                        <div className="card-item-footer">
                            {/* <span className="card-item-footer-type">Hiện có là: </span> */}
                            <span className="card-item-footer-amount">{getTotalPatients}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CardItem;
