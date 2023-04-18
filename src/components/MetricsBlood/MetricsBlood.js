import { Button, Form, Input, Table, message } from 'antd';
import { useDispatch } from 'react-redux';

import TitleName from '../TitleName';
import { fetchApiCreateBloodForPatient } from '~/redux/features/metric/bmisSlice';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

function MetricsBlood({ patients, bloodPatient }) {
    const dispatch = useDispatch();

    console.log('bloodPatient', bloodPatient);

    const handleSubmitForm = (values) => {
        if (values) {
            dispatch(fetchApiCreateBloodForPatient(values));
            message.success('Bạn đã tạo thành công chỉ số huyết áp.');
        }
    };

    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
        },
        {
            key: 'systolic',
            title: 'Tâm thu',
            dataIndex: 'systolic',
        },
        {
            key: 'diastole',
            title: 'Tâm trương',
            dataIndex: 'diastole',
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
        },
    ];

    // Option bloob pressure
    const optionBloodPressure = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', //  as const
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê chỉ số Huyết áp của bạn',
            },
        },
    };

    // labels blood pressure
    const labelsBloodPressure = bloodPatient?.map((_blood) => moment(_blood.createdAt).format('DD-MM-YYYY'));

    // Data blood pressure
    const dataBloodPressure = {
        labels: labelsBloodPressure,
        datasets: [
            {
                label: `Diastole (Tâm trương)`,
                data: bloodPatient ? bloodPatient.map((_blood) => _blood.diastole) : 0,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: `Systolic (Tâm thu)`,
                data: bloodPatient ? bloodPatient.map((_blood) => _blood.systolic) : 0,
                borderColor: 'rgb(93, 235, 53)',
                backgroundColor: 'rgba(93, 235, 53, 0.5)',
            },
        ],
    };

    return (
        <div className="metrics-blood-wrapper">
            <TitleName>Chỉ Số Huyết Áp</TitleName>

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
                    name="systolic"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập chỉ số tâm thu.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input name="systolic" placeholder="Tâm thu..." />
                </Form.Item>

                <Form.Item
                    name="diastole"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập chỉ số tâm trương.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input name="diastole" placeholder="Tâm trương..." />
                </Form.Item>

                <div className="display-btn-metrics-submit">
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </div>
            </Form>

            {/* List glycemics */}
            <Table
                columns={cols}
                dataSource={bloodPatient?.map((_blood, index) => ({
                    index: index + 1,
                    systolic: _blood.systolic,
                    diastole: _blood.diastole,
                    createdAt: `${moment(_blood.createdAt).format('DD/MM/YYYY')} - lúc ${moment(
                        _blood.createdAt,
                    ).format('HH:mm a')}`,
                }))}
                rowKey="index"
            ></Table>

            {/* Chart */}
            <Line options={optionBloodPressure} data={dataBloodPressure} height={120} />
        </div>
    );
}

export default MetricsBlood;
