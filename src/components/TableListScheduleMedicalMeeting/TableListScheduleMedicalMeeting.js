// lib
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// me
import './TableListScheduleMedicalMeeting.css';
import CartMeeting from './CartMeeting';
import { Select } from 'antd';
import patientSlice from '~/redux/features/patient/patientSlice';

function TableListScheduleMedicalMeeting({ infoUser }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(patientSlice.actions.arrivalFilterMeeting('all'));
    }, []);

    // handle filter meeting
    const handleChangeFilterMeeting = (value) => {
        dispatch(patientSlice.actions.arrivalFilterMeeting(value));
    };

    return (
        <>
            {/* Filter */}
            <div className="display-filter-meeting">
                <Select
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'date', label: 'Theo ngày (hôm nay)' },
                        { value: 'week', label: 'Theo tuần' },
                        { value: 'month', label: 'Theo tháng' },
                    ]}
                    defaultValue="all"
                    style={{ width: 175, zIndex: 99 }}
                    onSelect={handleChangeFilterMeeting}
                />
            </div>
            <div className="wrapper-schedule-medical-meeting">
                <CartMeeting infoUser={infoUser} />
            </div>
        </>
    );
}

export default TableListScheduleMedicalMeeting;
