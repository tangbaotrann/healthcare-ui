import { Button, Form, Input, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import TitleName from '~/components/TitleName';
import { fetchApiRatingForDoctor } from '~/redux/features/patient/patientSlice';

function RatingAfterExaminated({ patients, scheduleDetail }) {
    const [openModal, setOpenModal] = useState(false);
    const [valueRating, setValueRating] = useState(5);

    const dispatch = useDispatch();

    console.log('scheduleDetail', scheduleDetail);

    useEffect(() => {
        setOpenModal(true);
    }, []);

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleRatingAfterExamOnFish = (values) => {
        if (values) {
            console.log('values', values);

            dispatch(fetchApiRatingForDoctor(values));
        }
    };

    return (
        <Modal
            open={openModal}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
        >
            <TitleName>Đánh Giá Bác Sĩ Sau Khi Khám</TitleName>

            <div className="container-rating-exam">
                <Rate
                    onChange={setValueRating}
                    value={valueRating}
                    style={{ marginBottom: '12px', marginTop: '-18px', fontSize: '3.2rem' }}
                />
            </div>

            <Form
                onFinish={handleRatingAfterExamOnFish}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
                fields={[
                    { name: ['rating'], value: valueRating },
                    { name: ['patient_id'], value: patients?.patient?._id },
                    { name: ['schedule_id'], value: scheduleDetail?._id },
                    { name: ['doctor_id'], value: patients?.patient?.doctor_glycemic_id?._id },
                ]}
            >
                <Form.Item
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập nội dung để đánh giá bác sĩ.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.TextArea placeholder="Nhập nội dung đánh giá..." />
                </Form.Item>

                <Form.Item
                    name="rating"
                    // style={{ display: 'none' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="patient_id"
                    // style={{ display: 'none' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="schedule_id"
                    // style={{ display: 'none' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="doctor_id"
                    // style={{ display: 'none' }}
                >
                    <Input disabled />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Gửi
                </Button>
            </Form>
        </Modal>
    );
}

export default RatingAfterExaminated;
