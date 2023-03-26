// lib
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// me
import './TableListScheduleMedicalMeeting.css';
import CartMeeting from './CartMeeting';
import { Select } from 'antd';
import patientSlice from '~/redux/features/patient/patientSlice';

function TableListScheduleMedicalMeeting() {
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
                        { value: 'week', label: 'Theo tuần' },
                    ]}
                    defaultValue="all"
                    style={{ width: 140 }}
                    onSelect={handleChangeFilterMeeting}
                />
            </div>
            <div className="wrapper-schedule-medical-meeting">
                <CartMeeting />
            </div>
        </>
    );
}

export default TableListScheduleMedicalMeeting;
