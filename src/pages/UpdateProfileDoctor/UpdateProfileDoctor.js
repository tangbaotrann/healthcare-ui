// lib
import {
    AuditOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    PercentageOutlined,
    ReadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// me
import './UpdateProfileDoctor.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { endPoints } from '~/routers';
import { fetchApiCreateProfileForDoctor } from '~/redux/features/user/userSlice';
import { fetchApiRegisterSelector, fetchApiUpdateInfoUserSelector } from '~/redux/selector';

function UpdateProfileDoctor() {
    const dispatch = useDispatch();

    const tokenCurrent = useSelector(fetchApiRegisterSelector);
    const getIdInfoDoctor = useSelector(fetchApiUpdateInfoUserSelector);

    console.log('getIdInfoDoctor', getIdInfoDoctor);

    const navigate = useNavigate();

    return (
        <BackgroundOutSite>
            <Form
                onFinish={(values) => {
                    if (values && tokenCurrent.accessToken) {
                        dispatch(
                            fetchApiCreateProfileForDoctor({
                                values: values,
                                tokenCurrent: tokenCurrent.accessToken,
                            }),
                        );
                        navigate(`${endPoints.doctorManager}`);
                    }
                }}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
                fields={[
                    {
                        name: ['doctor_id'],
                        value: getIdInfoDoctor?.data?._id,
                    },
                ]}
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
                    name="training_place"
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
                    name="languages"
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
                {/* <Form.Item
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
                </Form.Item> */}

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
                    name="experiences"
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

                {/* doctor_id */}
                <Form.Item
                    name="doctor_id"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập id của bác sĩ.',
                        },
                    ]}
                    hasFeedback
                    style={{ display: 'none' }}
                >
                    <Input placeholder="Id của bác sĩ..." disabled />
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
