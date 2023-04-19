import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Alert, Button, Form, Input, Select, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TitleName from '../TitleName';
import { fetchApiCreateGlycemicForPatient } from '~/redux/features/metric/bmisSlice';
import { fetchApiCreateGlycemicForPatientMessageRejectedSelector } from '~/redux/selector';

function MetricsGlycemic({ patients, glycemicPatient }) {
    const dispatch = useDispatch();

    const messageReject = useSelector(fetchApiCreateGlycemicForPatientMessageRejectedSelector);

    // console.log('glycemicPatient', glycemicPatient);
    console.log('messageReject', messageReject);

    const handleSubmitForm = (values) => {
        if (values) {
            dispatch(fetchApiCreateGlycemicForPatient(values));

            if (messageReject !== null || messageReject.status === 'fail') {
                return;
            } else {
                message.success('Bạn đã tạo thành công chỉ số đường huyết.');
            }
        }
    };

    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
        },
        {
            key: 'case',
            title: 'Trường hợp',
            dataIndex: 'case',
        },
        {
            key: 'metric',
            title: 'Đường huyết',
            dataIndex: 'metric',
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
        },
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê chỉ số Đường huyết của bạn',
            },
        },
    };

    // labels glycemic
    const labelsGlycemic = glycemicPatient?.map((glycemic) => moment(glycemic.createdAt).format('DD-MM-YYYY'));
    const lablelArrs = new Set([...labelsGlycemic]);
    const resultsLabelsGlycemic = Array.from(lablelArrs);

    // data glycemic
    const dataGlycemic = {
        labels: resultsLabelsGlycemic,
        datasets: [
            {
                label: 'Đường huyết trước bữa ăn (TH 1)',
                data: glycemicPatient
                    .filter((filter_glycemic) => filter_glycemic.case === 1)
                    .map((glycemic) => glycemic.metric),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Đường huyết sau bữa ăn (TH 2)',
                data: glycemicPatient
                    .filter((filter_glycemic) => filter_glycemic.case === 2)
                    .map((glycemic) => glycemic.metric),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Đường huyết trước lúc ngủ (TH 3)',
                data: glycemicPatient
                    .filter((filter_glycemic) => filter_glycemic.case === 3)
                    .map((glycemic) => glycemic.metric),
                borderColor: 'rgb(93, 235, 53)',
                backgroundColor: 'rgba(93, 235, 53, 0.5)',
            },
        ],
    };

    return (
        <div className="metrics-glycemic-wrapper">
            <TitleName>Chỉ Số Đường Huyết</TitleName>

            <div className="message-rejected">
                {messageReject !== null && <Alert type="error" message={messageReject.message} />}
            </div>

            <Form
                onFinish={handleSubmitForm}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
                fields={[{ name: ['patient'], value: patients?.patient?._id }]}
                className="form-submit-metrics"
            >
                <Form.Item name="patient" hasFeedback style={{ display: 'none' }}>
                    <Input name="patient" disabled />
                </Form.Item>

                <Form.Item
                    name="case"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải chọn trạng thái này.',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        options={[
                            { label: 'Trước bữa ăn', value: 1 },
                            { label: 'Sau bữa ăn', value: 2 },
                            { label: 'Trước khi ngủ', value: 3 },
                        ]}
                        placeholder="Lựa chọn"
                    />
                </Form.Item>

                <Form.Item
                    name="metric"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập chỉ số đường huyết.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input name="metric" placeholder="Đường huyết..." />
                </Form.Item>

                <div className="display-btn-metrics-submit">
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </div>
            </Form>

            {/* Chart */}
            <Line options={options} data={dataGlycemic} height={120} />

            {/* List glycemics */}
            <Table
                columns={cols}
                dataSource={glycemicPatient?.map((_glycemic, index) => ({
                    index: index + 1,
                    case:
                        _glycemic.case === 1
                            ? `Đường huyết trước bữa ăn`
                            : _glycemic.case === 2
                            ? `Đường huyết sau bữa ăn`
                            : `Đường huyết trước lúc ngủ`,
                    metric: _glycemic.metric,
                    createdAt: `${moment(_glycemic.createdAt).format('DD/MM/YYYY')} - lúc ${moment(
                        _glycemic.createdAt,
                    ).format('HH:mm a')}`,
                }))}
                rowKey="index"
                style={{ marginTop: '12px' }}
            ></Table>
        </div>
    );
}

export default MetricsGlycemic;
