import moment from 'moment';
import './HistoryExamOfPatient.css';

function HistoryExamOfPatient({ historyExams }) {
    return (
        <div className="history-wrapper">
            {historyExams?.length > 0 ? (
                historyExams.map((history) => {
                    return (
                        <div className="content-cart-item" key={history._id}>
                            <div className="history-banner-right">
                                <i>
                                    Ngày: {moment(history.created_at).format('DD/MM/YYYY')} - lúc:{' '}
                                    {moment(history.created_at).format('HH:mm a')}
                                </i>
                            </div>
                            <div className="content-cart-item-header">
                                <h2 className="content-cart-item-username">
                                    BS: {history.doctor.username} -
                                    {history.doctor.work_type === 'glycemic'
                                        ? ' Đảm nhận bệnh đường huyết'
                                        : ' Đảm nhận bệnh huyết áp'}
                                </h2>
                            </div>

                            <div className="history-info-content">
                                <p>- Nội dung khám: {history.content_exam}</p>
                                <p>- Kết quả khám: {history.result_exam}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="history-message">
                    <i>-- Hiện tại bạn chưa có lịch sử khám (do chưa đăng ký khám) --</i>
                </p>
            )}
        </div>
    );
}

export default HistoryExamOfPatient;
