// lib
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// me
import './UpdateInfoUser.css';
import BackgroundOutSite from '~/components/BackgroundOutSite';
import { endPoints } from '~/routers';
import { fetchApiUpdateInfoUser } from '~/redux/features/user/userSlice';
import { fetchApiRegisterSelector } from '~/redux/selector';

function UpdateInfoUser() {
    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch();

    const tokenCurrent = useSelector(fetchApiRegisterSelector);

    const navigate = useNavigate();

    // preview avatar
    const handleChangeAvatar = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <BackgroundOutSite>
            <Form
                onFinish={(values) => {
                    console.log(values);
                    if (values && tokenCurrent.accessToken) {
                        dispatch(
                            fetchApiUpdateInfoUser({
                                values: values,
                                fileList: fileList,
                                tokenCurrent: tokenCurrent.accessToken,
                            }),
                        );
                        navigate(`${endPoints.createProfileDoctor}`);
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
                                action="http://localhost:3000/create/info"
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

                {/* Button update */}
                <div className="footer-update-info">
                    <Link to="/login">Quay lại</Link>
                    <Button type="primary" htmlType="submit">
                        Cập nhật thông tin
                    </Button>
                </div>
            </Form>
        </BackgroundOutSite>
    );
}

export default UpdateInfoUser;
