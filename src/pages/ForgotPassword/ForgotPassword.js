// lib
import { KeyOutlined, PhoneOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// me
import './ForgotPassword.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { endPoints } from '~/routers';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { parsePhoneNumber } from 'react-phone-number-input';
import axios from 'axios';
import { fetchApiForgotPassword } from '~/redux/features/user/userSlice';
import { isLoadingFetchApiForgotPasswordSelector } from '~/redux/selector';

function ForgotPassword() {
    const [number, setNumber] = useState('');
    const [messageError, setMessageError] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isLoadingSuccess = useSelector(isLoadingFetchApiForgotPasswordSelector);

    useEffect(() => {
        isLoadingSuccess && navigate(`${endPoints.login}`);
    }, [isLoadingSuccess]);

    const handleSubmitForm = async (values) => {
        try {
            const validatorPhone = isValidPhoneNumber(values.phone_number);
            const parsePhone = parsePhoneNumber(values.phone_number);

            const formatPhone = parsePhone.number.replace('+84', '0');

            console.log('formatPhone', formatPhone);
            console.log('validator', validatorPhone);

            if (validatorPhone === false) {
                setCheckPhone(true);
                setMessageError(false);
                return;
            }

            if (values) {
                await axios
                    .get(`${process.env.REACT_APP_BASE_URL}accounts/phone/${formatPhone}`)
                    .then((res) => {
                        console.log('res', res.data.data);
                        dispatch(
                            fetchApiForgotPassword({
                                values: values,
                                formatPhone: formatPhone,
                            }),
                        );
                        setCheckPhone(false);
                        setMessageError(false);
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
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <BackgroundOutSite>
            {messageError ? (
                <Alert
                    message={`Tài khoản với số điện thoại: ${number.replace(
                        '+84',
                        '0',
                    )} này không tồn tại!. Vui lòng thử lại!`}
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
                onFinish={handleSubmitForm}
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

                {/* Button check */}
                <div className="footer-forgot-password">
                    <Link to={`${endPoints.login}`}>Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Lấy lại mật khẩu
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default ForgotPassword;
