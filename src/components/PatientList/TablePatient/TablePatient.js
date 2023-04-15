// lib
import { Table } from 'antd';

// me
import StatusHeathLoader from '~/components/StatusHeathLoader';

function TablePatient({ cols, patients }) {
    return (
        <Table
            columns={cols}
            dataSource={patients.map(({ patient, bmis, glycemics, blood_pressures, status }, index) => ({
                index: index + 1,
                username: patient?.person?.username,
                gender: patient?.person?.gender === true ? 'Nam' : 'Nữ',
                dob: patient?.person?.dob,
                blood: patient?.blood,
                cal_bmi: bmis
                    ? bmis.map((_bmi) => {
                          return _bmi.cal_bmi;
                      })[bmis.length - 1]
                    : 0,
                glycemic: glycemics
                    ? glycemics.map((_glycemic) => {
                          return _glycemic.metric;
                      })[glycemics.length - 1]
                    : 0,
                blood_pressures: blood_pressures
                    ? blood_pressures.map((_blood) => {
                          return `Tâm trương: ${_blood.diastole} - Tâm thu: ${_blood.systolic}`;
                      })[blood_pressures.length - 1]
                    : 0,
                address: patient?.person?.address,
                status: status.message ? <StatusHeathLoader status={status} /> : 'Bạn chưa cập nhật chỉ số',
                _id: patient?._id,
            }))}
            rowKey="index"
            pagination={{
                pageSize: 5,
            }}
        ></Table>
    );
}

export default TablePatient;
