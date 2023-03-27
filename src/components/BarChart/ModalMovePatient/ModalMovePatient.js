// lib
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, Select, message } from 'antd';

// me
import TitleName from '~/components/TitleName';
import { fetchApiMovePatient } from '~/redux/features/user/userSlice';
import { filterDoctorForMovePatient } from '~/redux/selector';

function ModalMovePatient({ infoPatient }) {
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const movePatientForDoctors = useSelector(filterDoctorForMovePatient);

    console.log('movePatientForDoctors ->', movePatientForDoctors);

    // handle open modal
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // handle hide modal
    const handleHideModal = () => {
        setOpenModal(false);
    };

    // handle move patient
    const handleMovePatientOnFish = (values) => {
        if (values) {
            dispatch(fetchApiMovePatient(values));
            setOpenModal(false);
            message.success('Chuyển thành công bệnh nhân cho Bác sĩ khác đảm nhận.');
        } else {
            message.error('Chuyển bệnh nhân không thành công!');
            return;
        }
    };

    return (
        <>
            <Button className="move-patient-btn" onClick={handleOpenModal}>
                Chuyển bệnh nhân
            </Button>

            {/* Modal */}
            <Modal
                open={openModal}
                onCancel={handleHideModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    onFinish={handleMovePatientOnFish}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                    fields={[{ name: ['patient_id'], value: infoPatient._id }]}
                >
                    <TitleName>Chuyển Bệnh Nhân Cho Bác Sĩ Khác</TitleName>

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

                    {/* to doctor_id */}
                    <Form.Item
                        name="doctor_id"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải chọn tên bác sĩ.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select style={{ width: '100%' }} placeholder="Tên bác sĩ..." allowClear>
                            {movePatientForDoctors.map((_doctor) => {
                                return (
                                    <Select.Option key={_doctor._id} value={_doctor._id}>
                                        {_doctor.person.username}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    {/* reason */}
                    <Form.Item
                        name="reason"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần phải nhập lý do.',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input name="reason" placeholder="Lý do..." />
                    </Form.Item>

                    {/* patient_id */}
                    <Form.Item name="patient_id" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                    {/* Button */}
                    <Button className="move-patient-btn" htmlType="submit" block style={{ marginLeft: '0px' }}>
                        Chuyển bệnh nhân
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default ModalMovePatient;
