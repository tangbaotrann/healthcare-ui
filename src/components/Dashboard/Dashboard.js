// lib
import moment from 'moment';
import CardItem from './CardItem';

// me
import './Dashboard.css';
import Statistics from './Statistics';

function Dashboard({ schedules, totalFee, feeOfPatientResultedExam, totalFeeOfWeek, totalFeeOfMonth }) {
    // console.log('dashboard schedules', schedules);
    return (
        <div className="dashboard-wrapper">
            <span className="dashboard-date-now">{moment().format('dddd, Do MMM YYYY')}</span>

            <div className="dashboard-container">
                {/* Left */}
                <div className="dashboard-container-left">
                    <CardItem schedules={schedules} />
                    <Statistics
                        totalFee={totalFee}
                        feeOfPatientResultedExam={feeOfPatientResultedExam}
                        totalFeeOfWeek={totalFeeOfWeek}
                        totalFeeOfMonth={totalFeeOfMonth}
                    />
                </div>

                {/* Right */}
                {/* <div className="dashboard-container-right">
                    <h1>Right</h1>
                </div> */}
            </div>
        </div>
    );
}

export default Dashboard;
