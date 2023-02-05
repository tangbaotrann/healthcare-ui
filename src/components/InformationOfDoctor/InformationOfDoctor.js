// lib
import { useState } from 'react';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';

// me
import './InformationOfDoctor.css';

function InformationOfDoctor({ userLogin }) {
    const [modalInfoDoctor, setModalInfoDoctor] = useState(false);

    // show modal info doctor
    const handleShowModalInfoDoctor = () => {
        setModalInfoDoctor(true);
    };
    // hide modal info doctor
    const handleCancel = () => {
        setModalInfoDoctor(false);
    };

    return (
        <div className="wrapper-information-of-doctor">
            {/* Có thể click vào hiện modal */}
            <div className="information-of-doctor-item">
                <UserOutlined />

                <Button style={{ border: 'none' }} onClick={handleShowModalInfoDoctor}>
                    <h4 className="information-of-doctor-item-name">Thông tin cá nhân</h4>
                </Button>
                {/* Show modal info doctor */}
                <Modal
                    open={modalInfoDoctor}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    onCancel={handleCancel}
                >
                    <h1 className="information-of-doctor-title">Thông tin cá nhân</h1>

                    <Form
                        onFinish={(values) => {
                            console.log(values);
                            // if (values) {
                            //     dispatch(fetchApiUpdateInfoForDoctor(values));
                            // }
                        }}
                        onFinishFailed={(error) => {
                            console.log({ error });
                        }}
                        fields={[
                            {
                                name: ['username'],
                                value: userLogin?.doctor.person.username,
                            },
                            {
                                name: ['gender'],
                                value: userLogin?.doctor.person.gender,
                            },
                            // {
                            //     name: ['dob'],
                            //     value: moment(userLogin?.doctor.person.dob).format('YYYY-MM-DD'),
                            // },
                            {
                                name: ['address'],
                                value: userLogin?.doctor.person.address,
                            },
                            {
                                name: ['doctor_id'],
                                value: userLogin?.doctor._id,
                            },
                        ]}
                    >
                        {/* username */}
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn cần phải nhập họ và tên.',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<UserOutlined />} placeholder="Họ và tên..." />
                        </Form.Item>

                        {/* Gender */}
                        <Form.Item
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn cần phải chọn giới tính.',
                                },
                            ]}
                            hasFeedback
                        >
                            <Select style={{ width: '100%' }} placeholder="Giới tính..." allowClear>
                                <Select.Option value={true}>Nam</Select.Option>
                                <Select.Option value={false}>Nữ</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Date of birth */}
                        <Form.Item
                            name="dob"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn cần phải chọn năm sinh.',
                                },
                            ]}
                            hasFeedback
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                style={{ width: '100%' }}
                                picker="date"
                                placeholder="Năm sinh..."
                            />
                        </Form.Item>

                        {/* Address */}
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn cần phải nhập địa chỉ.',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<SendOutlined />} placeholder="Địa chỉ..." />
                        </Form.Item>

                        {/* doctor_id */}
                        <Form.Item
                            name="doctor_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn cần phải nhập id của bác sĩ.',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Id của bác sĩ..." />
                        </Form.Item>

                        {/* Button */}
                        <Button type="primary" htmlType="submit" block>
                            Cập nhật thông tin
                        </Button>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default InformationOfDoctor;
