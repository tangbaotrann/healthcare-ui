import moment from 'moment';

import { icons } from '~/asset/images';

function CardItemRegisterSchedule({ schedule }) {
    return (
        <div className="content-cart-item">
            <div className="content-cart-item-header">
                <img className="content-cart-item-avatar" src={schedule?.doctor?.person?.avatar} alt="avatar" />
                <h2 className="content-cart-item-username">BS: {schedule?.doctor?.person?.username}</h2>
            </div>

            <div className="display-content-cart-item-body">
                <div className="content-cart-item-body">
                    <div className="content-cart-item-body-time">
                        <img className="content-cart-item-time-icon" src={icons.iconTime} alt="iconTime" />
                        <p className="content-cart-item-time">
                            Thứ: {moment(schedule.day_exam).format('DD/MM/YYYY')} - lúc:{' '}
                            {moment(schedule.day_exam).format('HH:mm a')} (Thời gian khám:{' '}
                            {schedule.schedule.time_per_conversation} phút)
                        </p>
                    </div>
                    <div className="content-cart-item-body-price">
                        <img src={icons.iconPrice} alt="iconPrice" />
                        <p className="content-cart-item-price">Chi phí: {schedule.schedule.fee} VNĐ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardItemRegisterSchedule;
