// lib
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { KeyOutlined } from '@ant-design/icons/lib/icons';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

// me
import './Register.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';

function Register() {
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
                {/* Number phone */}
                <Form.Item
                    name="numberPhone"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập số điện thoại.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại..." />
                </Form.Item>

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

                {/* Password */}
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập mật khẩu.',
                        },
                        {
                            min: 6,
                            message: 'Mật khẩu phải ít nhất 6 kí tự.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<KeyOutlined />} placeholder="Mật khẩu..." />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập lại mật khẩu.',
                        },
                        ({ getFieldValue }) => ({
                            validator: (_, value) =>
                                !value || getFieldValue('password') === value
                                    ? Promise.resolve()
                                    : Promise.reject('Mật khẩu nhập lại không đúng.'),
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<KeyOutlined />} placeholder="Nhập lại mật khẩu..." />
                </Form.Item>

                {/* Register button */}
                <div className="register-footer">
                    <Link to="/login">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default Register;
