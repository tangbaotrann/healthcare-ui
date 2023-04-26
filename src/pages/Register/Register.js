// lib
import { KeyOutlined, PhoneOutlined } from '@ant-design/icons/lib/icons';
import { Form, Input, Button, Select, Alert } from 'antd';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// me
import './Register.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { endPoints } from '~/routers';
import { useUserAuth } from '~/context/UserAuthContext';
import axios from 'axios';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { parsePhoneNumber } from 'react-phone-number-input';

function Register() {
    const [number, setNumber] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmOTP, setConfirmOTP] = useState('');
    const [rules, setRules] = useState('');
    const [messageError, setMessageError] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkOTP, setCheckOTP] = useState(false);

    const { setUpRecaptcha } = useUserAuth();

    const navigate = useNavigate();

    // console.log('rules ->', rules);
    // console.log('registerSuccess ->', registerSuccess);

    // handle send otp
    const handleOnFinishSendOTP = async (values) => {
        const { phone_number, rule, password } = values;

        if (values) {
            const validatorPhone = isValidPhoneNumber(phone_number);
            const parsePhone = parsePhoneNumber(phone_number);

            const formatPhone = parsePhone.number.replace('+84', '0');

            // console.log('formatPhone', formatPhone);
            // console.log('validator', validatorPhone);

            if (validatorPhone === false) {
                setCheckPhone(true);
                setMessageError(false);
                return;
            }

            await axios
                .post(
                    `${process.env.REACT_APP_BASE_URL}auth/register`,
                    {
                        phone_number: formatPhone,
                        password: password,
                        rule: rule,
                    },
                    {
                        headers: { Authorization: '***' },
                    },
                )
                .then(async (res) => {
                    // dispatch(fetchApiRegister(values));
                    // console.log('res ->', res.data.data);

                    localStorage.setItem('token_user_login', JSON.stringify(res.data.data.accessToken));

                    try {
                        const __res = await setUpRecaptcha(phone_number);
                        console.log(__res);
                        setConfirmOTP(__res);
                        setRules(rule);
                        setFlag(true);
                        setCheckPhone(false);
                        setMessageError(false);
                    } catch (err) {
                        console.log({ err });
                    }
                })
                .catch((err) => {
                    if (validatorPhone === false) {
                        setCheckPhone(true);
                        setMessageError(false);
                    } else {
                        setMessageError(true);
                        setCheckPhone(false);
                    }
                });
        }
    };

    // handle verify OTP
    const handleOnFinishVerifyOTP = async (values) => {
        const { basic_otp } = values;

        console.log('basic_otp', basic_otp);

        try {
            await confirmOTP.confirm(basic_otp);

            if (rules === 'doctor') {
                navigate(`${endPoints.createInfo}`);
            } else if (rules === 'patient') {
                navigate(`${endPoints.createInfoPatient}`);
            }
        } catch (err) {
            setCheckOTP(true);
            console.log({ err });
        }
    };

    return (
        <BackgroundOutSite>
            {messageError ? (
                <Alert
                    message="Số điện thoại đã có người đăng ký. Vui lòng nhập số khác!"
                    type="error"
                    style={{ marginBottom: '12px' }}
                />
            ) : checkPhone ? (
                <Alert
                    message="Số điện thoại của bạn không hợp lệ. Vui lòng thử lại!"
                    type="error"
                    style={{ marginBottom: '12px' }}
                />
            ) : null}

            <Form
                onFinish={handleOnFinishSendOTP}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
                style={{ display: !flag ? 'block' : 'none' }}
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

                {/* Rule */}
                <Form.Item
                    name="rule"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn quyền ở đây.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        options={[
                            { label: 'Bác sĩ', value: 'doctor' },
                            { label: 'Bệnh nhân', value: 'patient' },
                        ]}
                        placeholder="Lựa chọn"
                    />
                </Form.Item>

                {/* reCaptcha */}
                <div id="recaptcha-container"></div>

                {/* Register button */}
                <div className="register-footer">
                    <Link to="/login">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </div>
            </Form>

            {/* message error OTP */}
            {checkOTP ? (
                <Alert
                    type="error"
                    message="Mã OTP không chính xác. Vui lòng kiểm tra lại!"
                    style={{ marginBottom: '12px' }}
                />
            ) : null}

            {/* Verify captcha (otp) */}
            <Form
                onFinish={handleOnFinishVerifyOTP}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
                style={{ display: flag ? 'block' : 'none' }}
            >
                <Form.Item
                    name="basic_otp"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập mã OTP.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Mã OTP của bạn..." />
                </Form.Item>

                <div className="register-footer">
                    <Link to={`${endPoints.register}`}>Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Xác nhận mã OTP
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default Register;
