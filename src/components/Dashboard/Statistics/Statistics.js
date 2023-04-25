// me
import { ArrowUpOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import StatisticsChart from '../StatisticsChart';
import './Statistics.css';
import { groupNumber } from '~/utils/cardsData';

function Statistics({ totalFee, feeOfPatientResultedExam, totalFeeOfWeek, totalFeeOfMonth }) {
    return (
        <div className="statistics-wrapper">
            <h2 className="statistics-title">Thống Kê Tổng Quan</h2>

            <Divider />

            <div className="overview-statistics">
                <div className="overview-statistics-item-side">
                    <ArrowUpOutlined className="item-side-icon" />
                    <div className="item-side-text">
                        <p className="item-side-top">Tổng doanh thu</p>
                        <p className="item-side-bottom">{groupNumber(totalFee) || 0} VNĐ</p>
                    </div>
                </div>

                <div className="overview-statistics-item">
                    <p className="item-side-top">Doanh thu theo tuần</p>
                    <p className="item-side-bottom">{groupNumber(totalFeeOfWeek || 0)} VNĐ</p>
                </div>

                <div className="overview-statistics-item">
                    <p className="item-side-top">Doanh thu theo tháng</p>
                    <p className="item-side-bottom">{groupNumber(totalFeeOfMonth || 0)} VNĐ</p>
                </div>
            </div>

            <Divider />

            {/* Chart statistics */}
            <StatisticsChart feeOfPatientResultedExam={feeOfPatientResultedExam} />
        </div>
    );
}

export default Statistics;
