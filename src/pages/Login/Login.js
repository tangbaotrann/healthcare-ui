// lib
import { KeyOutlined } from '@ant-design/icons/lib/icons';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// me
import './Login.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { fetchApiLogin } from '~/redux/features/user/userSlice';

function Login() {
    const [number, setNumber] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handle submit login
    const handleOnFishSubmitLogin = (values) => {
        try {
            if (values) {
                dispatch(fetchApiLogin(values));
                navigate('/home');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <BackgroundOutSite>
            <Form
                onFinish={handleOnFishSubmitLogin}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
            >
                {/* Number phone */}
                <Form.Item
                    name="phone_number"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập số điện thoại.',
                        },
                    ]}
                    hasFeedback
                >
                    <PhoneInput
                        className="register-phone-number"
                        value={number}
                        onChange={setNumber}
                        defaultCountry="VN"
                        placeholder="Số điện thoại..."
                    />
                    {/* <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại..." /> */}
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
