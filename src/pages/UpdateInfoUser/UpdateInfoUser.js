// lib
import { PlusSquareOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

// me
import './UpdateInfoUser.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';

function UpdateInfoUser() {
    return (
        <BackgroundOutSite>
            <Form
                onFinish={(values) => {
                    console.log(values);
                }}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
            >
                {/* Full name */}
                <Form.Item
                    name="fullName"
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
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>

                {/* Date of birth */}
                <Form.Item
                    name="dateOfBirth"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn năm sinh.',
                        },
                    ]}
                    hasFeedback
                >
                    <DatePicker style={{ width: '100%' }} picker="date" placeholder="Năm sinh..." />
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

                {/* Insurance code */}
                <Form.Item
                    name="insurance"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập mã bảo hiểm.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<PlusSquareOutlined />} placeholder="Mã bảo hiểm..." />
                </Form.Item>

                {/* Button update */}
                <div className="footer-update-info">
                    <Link to="/login">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Cập nhật thông tin
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default UpdateInfoUser;
