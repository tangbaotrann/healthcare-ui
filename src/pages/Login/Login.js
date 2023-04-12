// lib
import { KeyOutlined } from '@ant-design/icons/lib/icons';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Form, Input, Button, message, Alert } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// me
import './Login.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { fetchApiAllPatients, fetchApiLogin } from '~/redux/features/user/userSlice';
import { endPoints } from '~/routers';
import axios from 'axios';

function Login({ getToken }) {
    const [number, setNumber] = useState('');
    const [messageError, setMessageError] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // console.log('token login ->', getToken);
    // console.log('decodedToken ->', decodedToken);
    // console.log('messageError ->', messageError);

    // handle submit login
    const handleOnFishSubmitLogin = async (values) => {
        try {
            if (values) {
                const formatPhone = values.phone_number.replace('+84', '0');
                await axios
                    .get(`${process.env.REACT_APP_BASE_URL}accounts/phone/${formatPhone}`)
                    .then((res) => {
                        dispatch(fetchApiLogin(values));

                        if (res.data.data.rule === 'patient') {
                            navigate(`${endPoints.homeIntro}`);
                        } else {
                            navigate(`${endPoints.doctorManager}`);
                        }
                    })
                    .catch((err) => {
                        setMessageError(true);
                    });
            }
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <BackgroundOutSite>
            {messageError && (
                <Alert
                    message="Tài khoản chưa được đăng ký. Vui lòng thử lại!"
                    type="error"
                    style={{ marginBottom: '12px' }}
                />
            )}
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
