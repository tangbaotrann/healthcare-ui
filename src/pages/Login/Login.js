// lib
import { KeyOutlined, LoadingOutlined } from '@ant-design/icons/lib/icons';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { Form, Input, Button, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// me
import './Login.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { fetchApiLogin } from '~/redux/features/user/userSlice';
import { endPoints } from '~/routers';
import { fetchApiLoginSelector, isLoadingFetchApiLoginSelector } from '~/redux/selector';

function Login() {
    const [number, setNumber] = useState('');
    const [messageError, setMessageError] = useState(false);
    const [messageAccountAdmin, setMessageAccountAdmin] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [ruleAccount, setRuleAccount] = useState({});

    const messageSuccess = useSelector(fetchApiLoginSelector);
    const isLoading = useSelector(isLoadingFetchApiLoginSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // console.log('isLoading ->', isLoading);
    // console.log('decodedToken ->', decodedToken);
    // console.log('messageError ->', messageError);
    // console.log('messageSuccess ->', messageSuccess);
    console.log('ruleAccount ->', ruleAccount);
    // console.log('messageReject ->', messageReject);
    // console.log('token login ->', token);

    useEffect(() => {
        if (ruleAccount.rule === 'patient') {
            if (messageSuccess.length > 0 || messageSuccess.accessToken) {
                navigate(`${endPoints.homeIntro}`);
            }
        } else if (ruleAccount.rule === 'doctor') {
            if (messageSuccess.length > 0 || messageSuccess.accessToken) {
                navigate(`${endPoints.doctorManager}`);
            }
        } else {
            if (messageSuccess.length > 0 || messageSuccess.accessToken) {
                setMessageAccountAdmin(true);
                setCheckPhone(false);
                setMessageError(false);
            }
        }
    }, [messageSuccess.accessToken]);

    // handle submit login
    const handleOnFishSubmitLogin = async (values) => {
        try {
            if (values) {
                const validatorPhone = isValidPhoneNumber(values.phone_number);
                const parsePhone = parsePhoneNumber(values.phone_number);

                const formatPhone = parsePhone.number.replace('+84', '0');

                // console.log('formatPhone', formatPhone);
                // console.log('validator', validatorPhone);

                if (validatorPhone === false) {
                    setCheckPhone(true);
                    setMessageError(false);
                    setMessageAccountAdmin(false);
                    return;
                }

                await axios
                    .get(`${process.env.REACT_APP_BASE_URL}accounts/phone/${formatPhone}`)
                    .then((res) => {
                        dispatch(fetchApiLogin(values));
                        setCheckPhone(false);
                        setMessageError(false);
                        setMessageAccountAdmin(false);

                        if (res.data.data.rule === 'patient') {
                            if (messageSuccess.accessToken) {
                                navigate(`${endPoints.homeIntro}`);
                            }
                            if (messageSuccess.status === 'fail') {
                                return;
                            }
                        } else {
                            if (messageSuccess.accessToken) {
                                navigate(`${endPoints.doctorManager}`);
                            }
                            if (messageSuccess.status === 'fail') {
                                return;
                            }
                        }
                        setRuleAccount(res.data.data);
                    })
                    .catch((err) => {
                        if (validatorPhone === false) {
                            setCheckPhone(true);
                            setMessageError(false);
                            setMessageAccountAdmin(false);
                        } else {
                            setMessageError(true);
                            setCheckPhone(false);
                            setMessageAccountAdmin(false);
                        }
                    });
            }
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <BackgroundOutSite>
            {(messageSuccess.length > 0 || messageSuccess.status === 'fail') && !messageError && !checkPhone ? (
                <Alert message={`${messageSuccess.message}`} type="error" style={{ marginBottom: '12px' }} />
            ) : null}

            {messageError ? (
                <Alert
                    message="Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!"
                    type="error"
                    style={{ marginBottom: '12px' }}
                />
            ) : checkPhone ? (
                <Alert
                    message="Số điện thoại của bạn không hợp lệ. Vui lòng thử lại!"
                    type="error"
                    style={{ marginBottom: '12px' }}
                />
            ) : messageAccountAdmin ? (
                <Alert
                    message="Bạn không có quyền truy cập tài khoản này. Vui lòng thử lại!"
                    type="error"
                    style={{ marginBottom: '12px' }}
                />
            ) : null}

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
                <Button type="primary" htmlType="submit" disabled={isLoading} block>
                    {isLoading ? <LoadingOutlined spin /> : 'Đăng nhập'}
                </Button>

                {/* Register & Forgot-password button */}
                <div className="link-to">
                    <Link to={`${endPoints.register}`}>Đăng ký ngay</Link>
                    <Link to={`${endPoints.forgotPassword}`}>Quên mật khẩu</Link>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default Login;
