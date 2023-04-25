// lib
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, message } from 'antd';

// me
import TitleName from '~/components/TitleName';
import { fetchApiRemindPatient } from '~/redux/features/patient/patientSlice';

function ModalRemind({ getIdDoctor, infoPatient }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    // show modal remind
    const handleShowModalRemind = () => {
        setShowModal(true);
    };

    // hinde modal remind
    const handleCancel = () => {
        setShowModal(false);
    };

    // handle submit button remind
    const handleRemindOnFish = (values) => {
        if (values) {
            dispatch(fetchApiRemindPatient(values));
            setShowModal(false);
            message.success('Tạo nhắc nhở thành công.');
        } else {
            message.error('Tạo nhắc nhở không thành công!');
            return;
        }
    };

    return (
        <>
            <div className="remind-patient">
                <Button className="remind-patient-btn" onClick={handleShowModalRemind} block>
                    Nhắc nhở bệnh nhân
                </Button>
            </div>

            <Modal
                open={showModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Nhắc Nhở Bệnh Nhân Cần Chú Ý Đến Sức Khỏe</TitleName>

                <Form
                    onFinish={handleRemindOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                    fields={[
                        { name: ['from'], value: getIdDoctor._id },
                        { name: ['idPatient'], value: infoPatient._id },
                    ]}
                >
                    {/* content */}
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập nội dung để nhắc nhở bệnh nhân.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Nhập nội dung..." />
                    </Form.Item>

                    {/* Id doctor */}
                    <Form.Item name="from" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Id patient */}
                    <Form.Item name="idPatient" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Button confirm remind */}
                    <Button className="remind-patient-btn" htmlType="submit" block>
                        Tạo nhắc nhở
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default ModalRemind;
