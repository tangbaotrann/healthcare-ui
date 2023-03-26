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
import conversationSlice from '~/redux/features/conversation/conversationSlice';
import { fetchApiMessages } from '~/redux/features/message/messageSlice';
import Conversation from '../Conversation';
import callSlice from '~/redux/features/call/callSlice';

function TableListScheduleMedical({ infoUser }) {
    const [showModal, setShowModal] = useState(false);
    const [showModalConversation, setShowModalConversation] = useState(false);

    const dispatch = useDispatch();

    const scheduleMedicalsFilter = useSelector(getDayAndTimeScheduleMedicalFilterOfDoctor);

    console.log('scheduleMedicalsFilter render', scheduleMedicalsFilter);
    // console.log('infoMember render', infoMember);

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
            width: '10%',
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
            width: '12%',
        },
        {
            key: 'time_per_conversation',
            title: 'Thời gian khám',
            dataIndex: 'time_per_conversation',
            width: '9%',
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
            width: '20%',
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            width: '10%',
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
                        {record.status.props.children === 'Đã xác nhận' ? (
                            <>
                                <Button
                                    className="show-conversation-message"
                                    onClick={() => handleShowModalConversation(record)}
                                >
                                    Trò chuyện
                                </Button>

                                {/* Modal conversation */}
                                <Modal
                                    open={showModalConversation}
                                    onCancel={hideModalConversation}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    okButtonProps={{ style: { display: 'none' } }}
                                >
                                    {record ? <Conversation infoUser={infoUser} recordConversation={record} /> : null}
                                </Modal>
                            </>
                        ) : (
                            <>
                                <Button type="primary" onClick={() => handleStatusScheduleMedical(record)}>
                                    Xác nhận
                                </Button>
                                <Button className="btn-delete-schedule" onClick={handleShowModal}>
                                    Hủy
                                </Button>

                                {/* Button show Chat */}
                                <Button
                                    className="show-conversation-message"
                                    onClick={() => handleShowModalConversation(record)}
                                >
                                    Trò chuyện
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

                                {/* Modal conversation */}
                                <Modal
                                    open={showModalConversation}
                                    onCancel={hideModalConversation}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    okButtonProps={{ style: { display: 'none' } }}
                                >
                                    {record ? <Conversation infoUser={infoUser} recordConversation={record} /> : null}
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

    // show modal conversation
    const handleShowModalConversation = (record) => {
        console.log('record ->', record);
        setShowModalConversation(true);
        dispatch(conversationSlice.actions.arrivalIdConversation(record.conversation));
        dispatch(fetchApiMessages(record.conversation._id));
        dispatch(callSlice.actions.arrivalUsername(null)); // clear modal
    };

    // hide
    const hideModalConversation = () => {
        setShowModalConversation(false);
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
                    conversation: scheduleMedical.conversations,
                }))}
                rowKey="index"
                pagination={{
                    pageSize: 10,
                }}
                className="tbl-schedule-medical"
                scroll={{ y: 420 }}
            ></Table>
        </>
    );
}

export default TableListScheduleMedical;
