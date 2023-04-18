import { Button, Form, Input, Table, message } from 'antd';
import { useDispatch } from 'react-redux';

import TitleName from '../TitleName';
import { fetchApiCreateBMIForPatient } from '~/redux/features/metric/bmisSlice';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

function MetricsBMI({ patients, bmiPatient }) {
    const dispatch = useDispatch();

    // const checkBMI = useSelector(fetchApiCreateBMIForPatientSelector);

    // console.log('checkBMI', checkBMI);
    console.log('bmiPatient', bmiPatient);

    const handleSubmitForm = (values) => {
        if (values) {
            // if (checkBMI.length > 1) {
            //     message.error(`${checkBMI}`);
            //     return;
            // }
            dispatch(fetchApiCreateBMIForPatient(values));
            message.success('Bạn đã tạo thành công chỉ số BMI.');
        }
    };

    const cols = [
        {
            key: 'index',
            title: '#',
            dataIndex: 'index',
        },
        {
            key: 'weight',
            title: 'Cân nặng',
            dataIndex: 'weight',
        },
        {
            key: 'height',
            title: 'Chiều cao',
            dataIndex: 'height',
        },
        {
            key: 'cal_bmi',
            title: 'BMI trung bình',
            dataIndex: 'cal_bmi',
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
                text: 'Biểu đồ thống kê chỉ số BMI của bạn',
            },
        },
    };

    const labels = bmiPatient?.bmis?.map((bmi) => moment(bmi.createdAt).format('DD-MM-YYYY'));

    // Data BMI
    const data = {
        labels,
        datasets: [
            {
                label: `BMI (BMI trung bình: )`,
                data: bmiPatient ? bmiPatient?.bmis?.map((bmi) => bmi.cal_bmi) : 0,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="metrics-bmi-wrapper">
            <TitleName>Chỉ Số BMI</TitleName>

            <Form
                onFinish={handleSubmitForm}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
                fields={[
                    { name: ['patient'], value: patients?.patient?._id },
                    { name: ['gender'], value: patients?.patient?.person?.gender },
                ]}
                className="form-submit-metrics"
            >
                <Form.Item name="patient" hasFeedback style={{ display: 'none' }}>
                    <Input name="patient" disabled />
                </Form.Item>

                <Form.Item name="gender" style={{ display: 'none' }}>
                    <Input name="gender" disabled />
                </Form.Item>

                <Form.Item
                    name="weight"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập cân nặng.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input name="weight" placeholder="Cân nặng..." />
                </Form.Item>

                <Form.Item
                    name="height"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần phải nhập chiều cao.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input name="height" placeholder="Chiều cao..." />
                </Form.Item>

                <div className="display-btn-metrics-submit">
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </div>
            </Form>

            {/* List bmi */}
            <Table
                columns={cols}
                dataSource={bmiPatient?.bmis?.map((_bmi, index) => ({
                    index: index + 1,
                    weight: _bmi.weight,
                    height: _bmi.height,
                    cal_bmi: _bmi.cal_bmi,
                    createdAt: `${moment(_bmi.createdAt).format('DD/MM/YYYY')} - lúc ${moment(_bmi.createdAt).format(
                        'HH:mm a',
                    )}`,
                }))}
                rowKey="index"
            ></Table>

            {/* Chart */}
            <Line options={options} data={data} height={120} />
        </div>
    );
}

export default MetricsBMI;
