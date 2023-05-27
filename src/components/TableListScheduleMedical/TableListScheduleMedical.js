// lib
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Image, Input, message, Modal, Table, Tooltip } from 'antd';

// me
import './TableListScheduleMedical.css';
import TitleName from '../TitleName';
import patientSlice, {
    fetchApiConfirmScheduleMedical,
    fetchApiDeleteScheduleMedical,
    fetchApiHistoryExamOfPatient,
} from '~/redux/features/patient/patientSlice';
import { fetchApiHistoryExamOfPatientSelector, getDayAndTimeScheduleMedicalFilterOfDoctor } from '~/redux/selector';
import socket from '~/utils/socket';
import HistoryExamOfPatient from '../HistoryExamOfPatient/HistoryExamOfPatient';

import 'moment/locale/vi'; // without this line it didn't work
moment.locale('vi');

function TableListScheduleMedical({ infoUser }) {
    const [record, setRecord] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openModalInfoDetailPatient, setOpenModalInfoDetailPatient] = useState(false);
    const [infoDetailPatient, setInfoDetailPatient] = useState({});

    const dispatch = useDispatch();

    const scheduleMedicalsFilter = useSelector(getDayAndTimeScheduleMedicalFilterOfDoctor);
    const historyExams = useSelector(fetchApiHistoryExamOfPatientSelector);

    // console.log('historyExams', historyExams);
    // console.log('scheduleMedicalsFilter render', scheduleMedicalsFilter);
    // console.log('infoMember render', infoMember);

    useEffect(() => {
        socket.on('notification_register_schedule_from_patient_success', ({ schedule_detail }) => {
            // console.log('notification_register_schedule_from_patient_success', schedule_detail);
            dispatch(patientSlice.actions.arrivalConfirmScheduleMedicalAppointment(schedule_detail));
        });
    }, []);

    useEffect(() => {
        socket.on('notification_confirm_register_schedule_success', ({ schedule_detail_id }) => {
            // console.log('notification_confirm_register_schedule_success', schedule_detail_id);
            dispatch(patientSlice.actions.arrivalDeleteScheduleMedicalAppointment(schedule_detail_id));
        });
    }, []);

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
            key: 'day_exam',
            title: 'Ngày khám',
            dataIndex: 'day_exam',
            width: '10%',
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
                        <>
                            <Button
                                className="btn-detail-info-patient"
                                type="primary"
                                onClick={() => handleSelectDetailInfoPatient(record)}
                            >
                                Xem
                            </Button>
                            <Button className="btn-show-history-exam" onClick={() => handleShowHistory(record)}>
                                Lịch sử khám
                            </Button>
                            <Button type="primary" onClick={() => handleStatusScheduleMedical(record)}>
                                Xác nhận
                            </Button>
                            {moment(record.re_day_exam).diff(moment(), 'hours') >= 24 ? (
                                <Button className="btn-delete-schedule" onClick={() => handleShowModal(record)}>
                                    Hủy
                                </Button>
                            ) : (
                                <Tooltip
                                    title="Bạn chỉ có thể hủy được lịch trước thời gian bắt đầu 24 tiếng."
                                    color="#1DCBB6"
                                >
                                    <Button
                                        className="btn-delete-schedule btn-delete-schedule-disabled"
                                        // onClick={() => handleShowModal(record)}
                                    >
                                        Hủy
                                    </Button>
                                </Tooltip>
                            )}
                        </>
                    </div>
                );
            },
        },
    ];

    // handle select detail patient
    const handleSelectDetailInfoPatient = (record) => {
        // console.log(record);
        setOpenModalInfoDetailPatient(true);
        setInfoDetailPatient(record);
    };

    // handle status schedule
    const handleStatusScheduleMedical = (record) => {
        if (record) {
            dispatch(fetchApiConfirmScheduleMedical(record._id));
            message.success('Bạn đã xác nhận lịch khám cho bệnh nhân.');
        }
    };

    // show modal
    const handleShowModal = (record) => {
        // console.log('re', record);
        setShowModal(true);
        setRecord(record);
    };

    // hide modal
    const handleCancel = () => {
        setShowModal(false);
        setOpenHistory(false);
        setOpenModalInfoDetailPatient(false);
    };

    // handle confirm del request schedule
    const handleDeleteScheduleMedicalOnFish = (values) => {
        if (values) {
            dispatch(fetchApiDeleteScheduleMedical(values));
            setShowModal(false);
            message.success('Bạn đã hủy lịch khám của bệnh nhân.');
        }
    };

    const handleShowHistory = (record) => {
        dispatch(fetchApiHistoryExamOfPatient(record.patient._id));
        setOpenHistory(true);
    };

    return (
        <>
            {/* Modal open info detail patient */}
            <Modal
                open={openModalInfoDetailPatient}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Thông Tin Của Bệnh Nhân</TitleName>

                <ul className="container-info-details-patient">
                    <div className="display-info-details-patient-avatar">
                        <Image
                            src={infoDetailPatient?.patient?.person?.avatar}
                            className="info-details-patient-avatar"
                            alt="avatar-patient"
                        />
                    </div>
                    <li>
                        <i>Họ tên:</i> {infoDetailPatient?.patient?.person?.username}
                    </li>
                    <li>
                        <i>Giới tính: </i> {infoDetailPatient?.patient?.person?.gender === true ? 'Nam' : 'Nữ'}
                    </li>
                    <li>
                        <i>Năm sinh: </i> {moment(infoDetailPatient?.patient?.person?.dob).format('DD/MM/YYYY')}
                    </li>
                    <li>
                        <i>Địa chỉ: </i> {infoDetailPatient?.patient?.person?.address}
                    </li>
                    <li>
                        <i>Nhóm máu: </i> {infoDetailPatient?.patient?.blood}
                    </li>
                    <li>
                        <i>Tiền sử bệnh: </i>{' '}
                        {infoDetailPatient?.patient?.anamnesis === 0
                            ? 'Tiền sử đường huyết - Bình thường'
                            : infoDetailPatient?.patient?.anamnesis === 1
                            ? 'Tiền sử đường huyết- Típ 1'
                            : 'Tiền sử đường huyết - Típ 2'}
                    </li>
                    <li>
                        <i>Nội dung khám: </i> {infoDetailPatient?.content_exam}
                    </li>
                </ul>
            </Modal>

            {/* Modal confirm delete request schedule */}
            <Modal
                open={showModal}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <TitleName>Hủy Lịch Khám Của Bệnh Nhân</TitleName>

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

            {/* Modal history */}
            <Modal
                open={openHistory}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={2000}
                centered={true}
            >
                <TitleName>Lịch sử khám của bệnh nhân</TitleName>
                <div className="modal-container-history">
                    <HistoryExamOfPatient historyExams={historyExams} className="custom-load-more-btn" />
                </div>
            </Modal>

            <TitleName>Danh Sách Lịch Khám Của Bác Sĩ</TitleName>

            {/* return: { info patient } -> get info */}
            <Table
                columns={cols}
                dataSource={scheduleMedicalsFilter.map((scheduleMedical, index) => ({
                    index: index + 1,
                    day: moment(scheduleMedical?.days?.day).format('dddd'),
                    createdAt: moment(scheduleMedical?.createdAt).format('HH:mm - DD/MM/YYYY'),
                    day_exam: moment(scheduleMedical?.day_exam).format('HH:mm - DD/MM/YYYY'),
                    time_per_conversation: `${scheduleMedical?.schedule?.time_per_conversation} phút`,
                    fee: `${scheduleMedical?.schedule?.fee} VNĐ`,
                    content_exam: scheduleMedical?.content_exam,
                    status:
                        scheduleMedical?.status === false ? (
                            <p style={{ color: 'blue' }}>Chờ xác nhận</p>
                        ) : (
                            <p style={{ color: 'green' }}>Đã xác nhận</p>
                        ),
                    _id: scheduleMedical?._id,
                    idDoctor: scheduleMedical?.doctor?._id,
                    conversation: scheduleMedical?.conversations,
                    patient: scheduleMedical.patient,
                    re_day_exam: scheduleMedical?.day_exam,
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
