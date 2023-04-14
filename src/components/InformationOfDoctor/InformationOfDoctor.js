// lib
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Modal, Select, message } from 'antd';

// me
import './InformationOfDoctor.css';
import moment from 'moment';
import { fetchApiUpdateInfoForDoctor } from '~/redux/features/user/userSlice';
import RatingOfDoctor from '../RatingOfDoctor/RatingOfDoctor';

function InformationOfDoctor({ infoUser }) {
    const [modalInfoDoctor, setModalInfoDoctor] = useState(false);
    const [fileList, setFileList] = useState({});

    const dispatch = useDispatch();

    console.log('infoUser', infoUser);
    // console.log('fileList', fileList);

    // show modal info doctor
    const handleShowModalInfoDoctor = () => {
        setModalInfoDoctor(true);
    };
    // hide modal info doctor
    const handleCancel = () => {
        setModalInfoDoctor(false);
    };

    // preview avatar
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];

        file.previews = URL.createObjectURL(file);
        setFileList(file);
    };

    return (
        <div className="wrapper-information-of-doctor">
            {/* Có thể click vào hiện modal */}
            <div className="information-of-doctor-item">
                <UserOutlined />

                <Button style={{ border: 'none' }} onClick={handleShowModalInfoDoctor}>
                    <h4 className="information-of-doctor-item-name">Thông tin cá nhân</h4>
                </Button>
                {/* Show modal info doctor */}
                <Modal
                    open={modalInfoDoctor}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    onCancel={handleCancel}
                >
                    <h1 className="information-of-doctor-title">Thông Tin Cá Nhân</h1>

                    <Form
                        onFinish={(values) => {
                            console.log('values ->', values);
                            if (values) {
                                dispatch(
                                    fetchApiUpdateInfoForDoctor({
                                        values: values,
                                        fileList: fileList,
                                    }),
                                );
                                message.success('Bạn đã cập nhật thành công thông tin mới.');
                            }
                        }}
                        onFinishFailed={(error) => {
                            console.log({ error });
                        }}
                        fields={[
                            {
                                name: ['avatar'],
                                value: fileList,
                            },
                            {
                                name: ['username'],
                                value: infoUser?.doctor.person.username,
                            },
                            {
                                name: ['gender'],
                                value: infoUser?.doctor.person.gender,
                            },
                            {
                                name: ['dob'],
                                value: moment(infoUser?.doctor.person.dob.split('/').reverse().join('/')),
                            },
                            {
                                name: ['address'],
                                value: infoUser?.doctor.person.address,
                            },
                            {
                                name: ['doctor_id'],
                                value: infoUser?.doctor._id,
                            },
                        ]}
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
                            <>
                                <div style={{ width: '100%', margin: '0 auto' }}>
                                    <img
                                        src={fileList.previews || infoUser?.doctor.person.avatar}
                                        className="display-img-update"
                                        alt="avatar-update"
                                    />
                                </div>
                                <Input type="file" name="avatar" onChange={handleChangeAvatar} />
                            </>
                        </Form.Item>

                        {/* username */}
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
                            <DatePicker
                                format="YYYY/MM/DD"
                                style={{ width: '100%' }}
                                picker="date"
                                placeholder="Năm sinh..."
                            />
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

                        {/* Button */}
                        <Button type="primary" htmlType="submit" block>
                            Cập nhật thông tin
                        </Button>
                    </Form>

                    <Divider />

                    {/* View Rating */}
                    <RatingOfDoctor infoUser={infoUser} />
                </Modal>
            </div>
        </div>
    );
}

export default InformationOfDoctor;
