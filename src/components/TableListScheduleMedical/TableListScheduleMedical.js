// lib
import moment from 'moment';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, message, Modal, Table } from 'antd';

// me
import './TableListScheduleMedical.css';
import TitleName from '../TitleName';
import { fetchApiConfirmScheduleMedical, fetchApiDeleteScheduleMedical } from '~/redux/features/patient/patientSlice';
import { getDayAndTimeScheduleMedicalFilterOfDoctor } from '~/redux/selector';

function TableListScheduleMedical() {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const scheduleMedicalsFilter = useSelector(getDayAndTimeScheduleMedicalFilterOfDoctor);

    console.log('scheduleMedicalsFilter', scheduleMedicalsFilter);

    // cols
    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
            width: '4%',
        },
        {
            key: 'day',
            title: 'Thứ',
            dataIndex: 'day',
            width: '8%',
        },
        {
            key: 'createdAt',
            title: 'Ngày đăng ký',
            dataIndex: 'createdAt',
            width: '10%',
        },
        {
            key: 'time',
            title: 'Ca làm',
            dataIndex: 'time',
        },
        {
            key: 'time_per_conversation',
            title: 'Thời gian khám',
            dataIndex: 'time_per_conversation',
            width: '8%',
        },
        {
            key: 'fee',
            title: 'Chi phí',
            dataIndex: 'fee',
            width: '10%',
        },
        {
            key: 'content_exam',
            title: 'Nội dung khám bệnh',
            dataIndex: 'content_exam',
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            width: '9%',
            render: (status) => {
                return (
                    <>
                        {status.props ? (
                            status.props.children === 'Đã xác nhận' ? (
                                <p style={{ color: 'green' }}>Đã xác nhận</p>
                            ) : (
                                <p style={{ color: 'blue' }}>Chờ xác nhận</p>
                            )
                        ) : null}
                    </>
                );
            },
            filters: [
                { text: 'Đã xác nhận', value: 'Đã xác nhận' },
                { text: 'Chờ xác nhận', value: 'Chờ xác nhận' },
            ],
            onFilter: (value, record) => {
                return record.status.props.children === value;
            },
        },
        {
            key: 'handleStatus',
            render: (record) => {
                return (
                    <div className="status-tbl-schedule-medical">
                        {record.status.props.children === 'Đã xác nhận' ? null : (
                            <>
                                <Button type="primary" onClick={() => handleStatusScheduleMedical(record)}>
                                    Xác nhận
                                </Button>
                                <Button
                                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '4px' }}
                                    onClick={handleShowModal}
                                >
                                    Hủy
                                </Button>

                                {/* Modal confirm delete request schedule */}
                                <Modal
                                    open={showModal}
                                    onCancel={handleCancel}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    okButtonProps={{ style: { display: 'none' } }}
                                >
                                    <TitleName>Hủy lịch khám của bệnh nhân</TitleName>

                                    <Form
                                        onFinish={handleDeleteScheduleMedicalOnFish}
                                        onFinishFailed={(error) => {
                                            console.log({ error });
                                        }}
                                        fields={[{ name: ['record'], value: record }]}
                                    >
                                        {/* reason */}
                                        <Form.Item
                                            name="reason"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Bạn cần phải nhập lý do hủy lịch khám.',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input placeholder="Nhập lý do hủy lịch khám..." />
                                        </Form.Item>

                                        {/* Obj record */}
                                        <Form.Item name="record" style={{ display: 'none' }}>
                                            <Input />
                                        </Form.Item>

                                        {/* Button */}
                                        <Button
                                            style={{ backgroundColor: 'red', color: 'white', marginLeft: '4px' }}
                                            htmlType="submit"
                                            block
                                        >
                                            Xác nhận hủy lịch
                                        </Button>
                                    </Form>
                                </Modal>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    // handle status schedule
    const handleStatusScheduleMedical = (record) => {
        if (record) {
            dispatch(fetchApiConfirmScheduleMedical(record._id));
            message.success('Bạn đã xác nhận lịch khám cho bệnh nhân.');
        }
    };

    // show modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    // hide modal
    const handleCancel = () => {
        setShowModal(false);
    };

    // handle confirm del request schedule
    const handleDeleteScheduleMedicalOnFish = (values) => {
        if (values) {
            dispatch(fetchApiDeleteScheduleMedical(values));
            setShowModal(false);
            message.success('Bạn đã hủy lịch khám của bệnh nhân.');
        }
    };

    return (
        <>
            <TitleName>Danh Sách Lịch Khám Của Bác Sĩ</TitleName>

            {/* return: { info patient } -> get info */}
            <Table
                columns={cols}
                dataSource={scheduleMedicalsFilter.map((scheduleMedical, index) => ({
                    index: index + 1,
                    day: moment(scheduleMedical?.days?.day).format('dddd'),
                    createdAt: moment(scheduleMedical.createdAt).format('DD-MM-YYYY'),
                    time: `${scheduleMedical?.shifts?.name} (${moment(
                        new Date(scheduleMedical?.shifts?.time_start),
                    ).format('HH:mm')} -> ${moment(new Date(scheduleMedical?.shifts?.time_end)).format('HH:mm')})`,
                    time_per_conversation: `${scheduleMedical.schedule.time_per_conversation} phút`,
                    fee: `${scheduleMedical.schedule.fee} VNĐ`,
                    content_exam: scheduleMedical.content_exam,
                    status:
                        scheduleMedical.status === false ? (
                            <p style={{ color: 'blue' }}>Chờ xác nhận</p>
                        ) : (
                            <p style={{ color: 'green' }}>Đã xác nhận</p>
                        ),
                    _id: scheduleMedical._id,
                    idDoctor: scheduleMedical.doctor._id,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 8,
                }}
                style={{ height: '300px' }}
                scroll={{ y: 380 }}
            ></Table>
        </>
    );
}

export default TableListScheduleMedical;
