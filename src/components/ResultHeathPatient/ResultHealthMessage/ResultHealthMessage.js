// lib
import moment from 'moment';
import { Table } from 'antd';

// me
import './ResultHealthMessage.css';

import 'moment/locale/vi'; // without this line it didn't work
moment.locale('vi');

function ResultHealthMessage({ resultHeath, information }) {
    // console.log('information ->', information);

    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
            width: '4%',
        },
        {
            key: 'content_exam',
            title: 'Nội dung khám',
            dataIndex: 'content_exam',
        },
        {
            key: 'result_exam',
            title: 'Kết quả khám',
            dataIndex: 'result_exam',
        },
        {
            key: 'day_exam',
            title: 'Ngày khám',
            dataIndex: 'day_exam',
            sorter: {
                compare: (a, b) => moment(a.day_exam, 'DD-MM-YYYY') - moment(b.day_exam, 'DD-MM-YYYY'),
            },
        },
        {
            key: 'time_exam',
            title: 'Thời gian',
            dataIndex: 'time_exam',
        },
    ];

    return (
        <div className="wrapper-result">
            <div className="result-health-message-item">
                <strong>Họ tên:</strong>
                <p>{information.username}</p>
            </div>
            <div className="result-health-message-item">
                <strong>Giới tính:</strong>
                <p>{information.gender}</p>
            </div>
            <div className="result-health-message-item">
                <strong>Năm sinh:</strong>
                <p>{information.dob}</p>
            </div>
            <div className="result-health-message-item">
                <strong>Nhóm máu:</strong>
                <p>{information.blood}</p>
            </div>
            <div className="result-health-message-item">
                <strong>Địa chỉ:</strong>
                <p>{information.address}</p>
            </div>

            {/* List table  */}
            {resultHeath.length > 0 ? (
                <div className="result-health-message-list">
                    <Table
                        columns={cols}
                        dataSource={resultHeath.map((result, index) => ({
                            index: index + 1,
                            content_exam: result.content_exam,
                            result_exam: result.result_exam,
                            day_exam: moment(result.day_exam).format('DD/MM/YYYY'),
                            time_exam: moment(result.day_exam).format('HH:mm'),
                        }))}
                        rowKey="index"
                        pagination={{
                            pageSize: 5,
                        }}
                    ></Table>
                </div>
            ) : (
                <p className="result-health-message-none">
                    <i>-- Chưa có thông tin khám của bệnh nhân này. --</i>
                </p>
            )}
        </div>
    );
}

export default ResultHealthMessage;
