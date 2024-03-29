import moment from 'moment';
import { useState } from 'react';
import { Skeleton } from 'antd';

import './HistoryExamOfPatient.css';
import ButtonLoadMore from '../ButtonLoadMore';

function HistoryExamOfPatient({ historyExams, isLoading, className }) {
    const [visible, setVisible] = useState(5);

    // console.log('historyExams', historyExams);
    // console.log('visible', visible);
    // console.log('loading', loading);

    const handleShowMoreCards = () => {
        setVisible((prev) => prev + 5);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleLessCards = () => {
        setVisible(5);
        window.scrollTo({
            top: 100,
            behavior: 'smooth',
        });
    };

    return (
        <div className="history-wrapper">
            {historyExams?.length > 0 ? (
                <>
                    {isLoading ? (
                        <Skeleton active />
                    ) : (
                        historyExams
                            .slice(0, visible)
                            // .reverse()
                            .map((history) => {
                                return (
                                    <div className="content-cart-item" key={history._id}>
                                        <div className="history-banner-right">
                                            <i>
                                                Ngày: {moment(history.created_at).format('DD/MM/YYYY')} - lúc:{' '}
                                                {moment(history.created_at).format('HH:mm')}
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
                                            <p>
                                                {history.prescription
                                                    ? `- Đơn thuốc nhận được: ${history.prescription}`
                                                    : ''}{' '}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </>
            ) : (
                <p className="history-message">
                    <i>-- Hiện tại bạn chưa có lịch sử khám (do chưa đăng ký khám) --</i>
                </p>
            )}

            {historyExams?.length >= 5 && visible < historyExams?.length ? (
                <ButtonLoadMore onClick={handleShowMoreCards} className={className} isLoading={isLoading}>
                    Xem thêm
                </ButtonLoadMore>
            ) : visible > 5 && visible >= historyExams?.length ? (
                <ButtonLoadMore onClick={handleLessCards} className={className} isLoading={isLoading}>
                    Thu gọn
                </ButtonLoadMore>
            ) : null}
        </div>
    );
}

export default HistoryExamOfPatient;
