// lib
import { PhoneOutlined } from '@ant-design/icons';
import { KeyOutlined } from '@ant-design/icons/lib/icons';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

// me
import './Login.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';

function Login() {
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

                {/* Button */}
                <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                </Button>

                {/* Register & Forgot-password button */}
                <div className="link-to">
                    <Link to="/register">Đăng ký ngay</Link>
                    <Link to="/forgot-password">Quên mật khẩu</Link>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default Login;
