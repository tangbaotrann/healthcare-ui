// lib
import { PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

// me
import './ForgotPassword.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';

function ForgotPassword() {
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

                {/* Button check */}
                <div className="footer-forgot-password">
                    <Link to="/login">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Kiểm tra
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default ForgotPassword;
