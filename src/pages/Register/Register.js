// lib
import { KeyOutlined, PhoneOutlined } from '@ant-design/icons/lib/icons';
import { Form, Input, Button, Select } from 'antd';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// me
import './Register.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { endPoints } from '~/routers';
import { fetchApiRegister } from '~/redux/features/user/userSlice';
import { useUserAuth } from '~/context/UserAuthContext';

function Register() {
    const [number, setNumber] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmOTP, setConfirmOTP] = useState('');

    const dispatch = useDispatch();

    const { setUpRecaptcha } = useUserAuth();

    const navigate = useNavigate();

    // handle send otp
    const handleOnFinishSendOTP = async (values) => {
        const { phone_number } = values;

        console.log('phone_number', phone_number);

        if (values) {
            dispatch(fetchApiRegister(values));
        }

        try {
            const res = await setUpRecaptcha(phone_number);
            console.log(res);
            setConfirmOTP(res);
            setFlag(true);
        } catch (err) {
            console.log({ err });
        }
    };

    // handle verify OTP
    const handleOnFinishVerifyOTP = async (values) => {
        const { basic_otp } = values;

        console.log('basic_otp', basic_otp);

        try {
            await confirmOTP.confirm(basic_otp);
            navigate(`${endPoints.createInfo}`);
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <BackgroundOutSite>
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
                            message: 'B???n c???n ph???i nh???p s??? ??i???n tho???i.',
                        },
                    ]}
                    hasFeedback
                >
                    <PhoneInput
                        className="register-phone-number"
                        value={number}
                        onChange={setNumber}
                        defaultCountry="VN"
                        placeholder="S??? ??i???n tho???i..."
                    />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'B???n c???n ph???i nh???p m???t kh???u.',
                        },
                        {
                            min: 6,
                            message: 'M???t kh???u ph???i ??t nh???t 6 k?? t???.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<KeyOutlined />} placeholder="M???t kh???u..." />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'B???n c???n ph???i nh???p l???i m???t kh???u.',
                        },
                        ({ getFieldValue }) => ({
                            validator: (_, value) =>
                                !value || getFieldValue('password') === value
                                    ? Promise.resolve()
                                    : Promise.reject('M???t kh???u nh???p l???i kh??ng ????ng.'),
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<KeyOutlined />} placeholder="Nh???p l???i m???t kh???u..." />
                </Form.Item>

                {/* Rule */}
                <Form.Item
                    name="rule"
                    rules={[
                        {
                            required: true,
                            message: 'B???n c???n ph???i ch???n quy???n ??? ????y.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select placeholder="L???a ch???n">
                        <Select.Option value="doctor" />
                        <Select.Option value="patient" />
                    </Select>
                </Form.Item>

                {/* reCaptcha */}
                <div id="recaptcha-container" />

                {/* Register button */}
                <div className="register-footer">
                    <Link to="/login">Quay l???i</Link>
                    <Button type="primary" htmlType="submit">
                        ????ng k??
                    </Button>
                </div>
            </Form>

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
                            message: 'B???n c???n ph???i nh???p m?? OTP.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<PhoneOutlined />} placeholder="M?? OTP c???a b???n..." />
                </Form.Item>

                {/* Confirm otp button */}
                <div className="register-footer">
                    <Link to="/login">Quay l???i</Link>
                    <Button type="primary" htmlType="submit">
                        X??c nh???n m?? OTP
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default Register;
