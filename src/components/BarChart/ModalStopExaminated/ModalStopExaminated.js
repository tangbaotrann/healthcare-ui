// lib
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Select, message } from 'antd';

// me
import TitleName from '~/components/TitleName';
import { fetchApiStopExaminatedByPatientId } from '~/redux/features/patient/patientSlice';

function ModalStopExaminated({ getIdDoctor, infoPatient, handleCancel }) {
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    // console.log('infoPatient stop exam ->', infoPatient);

    // handle open modal
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // handle hide modal
    const handleHideModal = () => {
        setOpenModal(false);
    };

    // handle stop exam
    const handleStopExamOnFish = (values) => {
        // console.log('values', values);
        if (values) {
            dispatch(fetchApiStopExaminatedByPatientId(values));
            setOpenModal(false);
            handleCancel();
            message.success('Bạn đã dừng điều trị cho bệnh nhân này.');
        } else {
            message.error('Không thể dừng điều trị cho bệnh nhân này!');
            return;
        }
    };

    return (
        <>
            <Button className="stop-examinated-patient-btn" onClick={handleOpenModal} block>
                Dừng điều trị bệnh nhân
            </Button>

            {/* Modal */}
            <Modal
                open={openModal}
                onCancel={handleHideModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    onFinish={handleStopExamOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                    fields={[
                        { name: ['doctor_id'], value: getIdDoctor._id },
                        { name: ['patient_id'], value: infoPatient._id },
                    ]}
                >
                    <TitleName>Dừng Theo Dõi Và Điều Trị Cho Bệnh Nhân</TitleName>

                    {/* work_type */}
                    <Form.Item
                        name="work_type"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải chọn loại bệnh.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select style={{ width: '100%' }} placeholder="Loại bệnh..." allowClear>
                            <Select.Option value="glycemic">Đường huyết</Select.Option>
                            <Select.Option value="blood">Huyết áp</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* doctor_id */}
                    <Form.Item name="doctor_id" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* patient_id */}
                    <Form.Item name="patient_id" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Button */}
                    <Button
                        className="stop-examinated-patient-btn"
                        htmlType="submit"
                        block
                        style={{ marginLeft: '0px' }}
                    >
                        Dừng điều trị
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default ModalStopExaminated;
