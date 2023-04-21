// lib
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

// me
import './CreateInfoPatient.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { endPoints } from '~/routers';
import { fetchApiRegisterSelector } from '~/redux/selector';
import { fetchApiCreateInfoPatient } from '~/redux/features/user/userSlice';

function CreateInfoPatient() {
    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // const tokenCurrent = useSelector(fetchApiRegisterSelector);

    // preview avatar
    const handleChangeAvatar = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <BackgroundOutSite>
            <Form
                onFinish={(values) => {
                    console.log('create info patient ->', values);
                    const getToken = JSON.parse(localStorage.getItem('token_user_login'));

                    if (values && getToken) {
                        dispatch(
                            fetchApiCreateInfoPatient({
                                values: values,
                                fileList: fileList,
                                tokenCurrent: getToken,
                            }),
                        );

                        navigate(`${endPoints.homeIntro}`);
                    }
                }}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
            >
                {/* avatar */}
                <Form.Item
                    name="avatar"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn ảnh đại diện.',
                        },
                    ]}
                    hasFeedback
                >
                    <label htmlFor="avatar">
                        <Input type="file" name="avatar" id="avatar" style={{ display: 'none' }} />
                        <ImgCrop rotate>
                            <Upload
                                id="avatar"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleChangeAvatar}
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                action="http://localhost:3000/create/info-patient"
                            >
                                {fileList.length === 0 && '+ Ảnh đại diện'}
                            </Upload>
                        </ImgCrop>
                    </label>
                </Form.Item>

                {/* Full name */}
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập họ và tên.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<UserOutlined />} placeholder="Họ và tên..." />
                </Form.Item>

                {/* Gender */}
                <Form.Item
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn giới tính.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select style={{ width: '100%' }} placeholder="Giới tính..." allowClear>
                        <Select.Option value={true}>Nam</Select.Option>
                        <Select.Option value={false}>Nữ</Select.Option>
                    </Select>
                </Form.Item>

                {/* Date of birth */}
                <Form.Item
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn năm sinh.',
                        },
                    ]}
                    hasFeedback
                >
                    <DatePicker style={{ width: '100%' }} picker="date" placeholder="Năm sinh..." />
                </Form.Item>

                {/* Address */}
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập địa chỉ.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<SendOutlined />} placeholder="Địa chỉ..." />
                </Form.Item>

                {/* blood */}
                <Form.Item
                    name="blood"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn nhóm máu.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select style={{ width: '100%' }} placeholder="Nhóm máu..." allowClear>
                        <Select.Option value="0">O</Select.Option>
                        <Select.Option value="1">A</Select.Option>
                        <Select.Option value="2">B</Select.Option>
                    </Select>
                </Form.Item>

                {/* anamnesis */}
                <Form.Item
                    name="anamnesis"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn tiền sử bệnh.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select style={{ width: '100%' }} placeholder="Tiền sử bệnh..." allowClear>
                        <Select.Option value="0">Tiền sử đường huyết: Bình thường</Select.Option>
                        <Select.Option value="1">Tiền sử đường huyết: Típ 1</Select.Option>
                        <Select.Option value="2">Tiền sử đường huyết: Típ 2</Select.Option>
                    </Select>
                </Form.Item>

                {/* Button update */}
                <div className="footer-update-info">
                    <Link to="/login">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Tạo thông tin
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default CreateInfoPatient;
