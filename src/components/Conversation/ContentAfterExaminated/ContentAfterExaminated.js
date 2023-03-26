// lib
import { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Select, message } from 'antd';

// me
import './ContentAfterExaminated.css';
import TitleName from '~/components/TitleName';
import { fetchApiResponseContentAfterExamiation } from '~/redux/features/patient/patientSlice';
import callSlice from '~/redux/features/call/callSlice';

function ContentAfterExaminated({ recordConversation }) {
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    console.log('recordConversation ->', recordConversation); // get id schedule-detail

    useEffect(() => {
        setOpenModal(true);
    }, []);

    const handleCancel = () => {
        setOpenModal(false);
    };

    // handle submit
    const handleContentAfterExamOnFish = (values) => {
        if (values) {
            dispatch(
                fetchApiResponseContentAfterExamiation({
                    values: values,
                    scheduleDetailId: recordConversation._id, // get id schedule-detail
                }),
            );
            dispatch(callSlice.actions.arrivalUsername(null)); // clear modal
            setOpenModal(false);
            message.success('Đã gửi phản hồi cho bệnh nhân.');
        } else {
            message.error('Gửi phản hồi không thành công!');
            return;
        }
    };

    return (
        <Modal
            open={openModal}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
        >
            <TitleName>Phản Hồi Sau Khi Khám Cho Bệnh Nhân</TitleName>
            <Form
                onFinish={handleContentAfterExamOnFish}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
            >
                {/* result_exam */}
                <Form.Item
                    name="result_exam"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập kết quả về sức khỏe cho bệnh nhân.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Nhập kết quả về sức khỏe..." />
                </Form.Item>

                {/* anamnesis */}
                <Form.Item
                    name="anamnesis"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn trạng thái bệnh.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        options={[
                            { value: '0', label: 'Bình thường' },
                            { value: '1', label: 'Típ 1' },
                            { value: '2', label: 'Típ 2' },
                        ]}
                    />
                </Form.Item>

                {/* Button */}
                <Button htmlType="submit" className="btn-content-after-exam-response" block>
                    Gửi
                </Button>
            </Form>
        </Modal>
    );
}

export default memo(ContentAfterExaminated);
