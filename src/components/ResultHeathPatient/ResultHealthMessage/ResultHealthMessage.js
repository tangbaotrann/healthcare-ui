// lib
import moment from 'moment';
import { Table } from 'antd';

// me
import './ResultHealthMessage.css';

function ResultHealthMessage({ resultHeath, information }) {
    console.log('information ->', information);

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
            {resultHeath ? (
                <div className="result-health-message-list">
                    <Table
                        columns={cols}
                        dataSource={resultHeath.map((result, index) => ({
                            index: index + 1,
                            content_exam: result.content_exam,
                            result_exam: result.result_exam,
                            day_exam:
                                moment(result.day_exam).format('DD/MM/YYYY') +
                                ` (${moment(result.day_exam).format('HH:mm a')})`,
                        }))}
                        rowKey="index"
                    ></Table>
                </div>
            ) : (
                <p className="result-health-message-none">
                    <i>-- Bệnh nhân này chưa được khám. --</i>
                </p>
            )}
        </div>
    );
}

export default ResultHealthMessage;
