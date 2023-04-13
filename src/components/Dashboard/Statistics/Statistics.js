// me
import { ArrowUpOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { groupNumber } from '~/utils/cardsData';
import StatisticsChart from '../StatisticsChart';
import './Statistics.css';

function Statistics() {
    return (
        <div className="statistics-wrapper">
            <h2 className="statistics-title">Thống Kê Tổng Quan</h2>

            <Divider />

            <div className="overview-statistics">
                <div className="overview-statistics-item-side">
                    <ArrowUpOutlined className="item-side-icon" />
                    <div className="item-side-text">
                        <p className="item-side-top">Top item this month</p>
                        <p className="item-side-bottom">Office Comps</p>
                    </div>
                </div>

                <div className="overview-statistics-item">
                    <p className="item-side-top">Items</p>
                    <p className="item-side-bottom">400</p>
                </div>

                <div className="overview-statistics-item">
                    <p className="item-side-top">Profit</p>
                    <p className="item-side-bottom">$ {groupNumber(30000)}</p>
                </div>
            </div>

            <Divider />

            {/* Chart statistics */}
            <StatisticsChart />
        </div>
    );
}

export default Statistics;
