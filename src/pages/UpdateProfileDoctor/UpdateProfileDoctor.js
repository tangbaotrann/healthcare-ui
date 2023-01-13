// lib
import {
    AuditOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    PercentageOutlined,
    ReadOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

// me
import './UpdateProfileDoctor.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';

function UpdateProfileDoctor() {
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
                {/* specialist */}
                <Form.Item
                    name="specialist"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập chuyên gia.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<UserOutlined />} placeholder="Chuyên gia..." />
                </Form.Item>

                {/* training place */}
                <Form.Item
                    name="trainingPlace"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập nơi đào tạo.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Nơi đào tạo..." />
                </Form.Item>

                {/* degree */}
                <Form.Item
                    name="degree"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập bằng cấp.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<ReadOutlined />} placeholder="Bằng cấp..." />
                </Form.Item>

                {/* language */}
                <Form.Item
                    name="language"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập ngôn ngữ.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<GlobalOutlined />} placeholder="Ngôn ngữ..." />
                </Form.Item>

                {/* certificate */}
                <Form.Item
                    name="certificate"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập chứng chỉ.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<SafetyCertificateOutlined />} placeholder="Chứng chỉ..." />
                </Form.Item>

                {/* education */}
                <Form.Item
                    name="education"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập giáo dục.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<AuditOutlined />} placeholder="Giáo dục..." />
                </Form.Item>

                {/* experience */}
                <Form.Item
                    name="experience"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập kinh nghiệm.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<PercentageOutlined />} placeholder="Kinh nghiệm..." />
                </Form.Item>

                {/* Button update */}
                <div className="footer-update-profile-doctor">
                    <Link to="/update/info/me">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Cập nhật thông tin
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default UpdateProfileDoctor;
