import { Button, Rate } from 'antd';
import moment from 'moment';

import { icons } from '~/asset/images';
import { groupNumber } from '~/utils/cardsData';

function ScheduleRegisterItem({ schedule, handleRegisterScheduleAppointment }) {
    return (
        <div className="content-cart-item">
            <div className="schedule-calender-empty">
                <i>Lịch trống</i>
            </div>
            <div className="content-cart-item-header">
                <img
                    className="content-cart-item-avatar"
                    src={schedule?.doctor?.person?.avatar || schedule?._schedules[0]?.doctor?.person?.avatar}
                    alt="avatar"
                />
                <h2 className="content-cart-item-username">
                    BS: {schedule?.doctor?.person?.username || schedule?._schedules[0]?.doctor?.person?.username}
                </h2>
                <Rate value={schedule?.doctor?.rating} disabled style={{ fontSize: '1.4rem', marginLeft: '10px' }} />
            </div>

            <div className="display-content-cart-item-body">
                <div className="content-cart-item-body">
                    <div className="content-cart-item-body-time">
                        <img className="content-cart-item-time-icon" src={icons.iconTime} alt="iconTime" />
                        <p className="content-cart-item-time">
                            Thứ: {moment(schedule?.day?.day).format('dddd')} - Ngày: {schedule.date_compare._i} - Thời
                            gian: {moment(new Date(schedule?.time?.time_start)).format('HH:mm')} {' - '}
                            {moment(new Date(schedule?.time?.time_end)).format('HH:mm')}
                        </p>
                    </div>
                    <div className="content-cart-item-body-price">
                        <img src={icons.iconPrice} alt="iconPrice" />
                        <p className="content-cart-item-price">Chi phí: {groupNumber(schedule?.fee)} VNĐ</p>
                    </div>
                </div>

                <div className="content-cart-item-footer">
                    {/* {console.log(
                        '-->',
                        new Date(
                            moment(
                                schedule.date_compare._i.split('/').reverse().join('/') +
                                    ' ' +
                                    moment(schedule.time.time_start).format('HH:mm'),
                            ),
                        ),
                    )} */}
                    {new Date(
                        moment(
                            schedule.date_compare._i.split('/').reverse().join('/') +
                                ' ' +
                                moment(schedule.time.time_start).format('HH:mm'),
                        ),
                    ).getMonth() < new Date().getMonth() ||
                    new Date(
                        moment(
                            schedule.date_compare._i.split('/').reverse().join('/') +
                                ' ' +
                                moment(schedule.time.time_start).format('HH:mm'),
                        ),
                    ).getFullYear() < new Date().getFullYear() ? (
                        ''
                    ) : (
                        <Button
                            className="content-cart-item-footer-btn"
                            onClick={
                                () => handleRegisterScheduleAppointment(schedule) // schedule?._schedules[0]
                            }
                        >
                            Đặt khám
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScheduleRegisterItem;
