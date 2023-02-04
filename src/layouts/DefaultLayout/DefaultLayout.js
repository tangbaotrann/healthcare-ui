// lib
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiUserDoctorByToken } from '~/redux/features/user/userSlice';
import { fetchApiUserDoctorByTokenSelector } from '~/redux/selector';

// me
import Header from '../components/Header';

function DefaultLayout({ children }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(fetchApiUserDoctorByTokenSelector);

    console.log('user login', typeof userLogin);

    useEffect(() => {
        dispatch(fetchApiUserDoctorByToken());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Header */}
            <Header userLogin={userLogin} />

            {/* Content */}
            {children}
        </>
    );
}

export default DefaultLayout;
