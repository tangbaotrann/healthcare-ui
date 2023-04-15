// lib
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';
import { Skeleton } from 'antd';

// me
import './Home.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import Content from '~/layouts/components/Content';
import ExploreClinic from '~/components/ExploreClinic';
import SlideImage from '~/components/SlideImage';
import HealthInformation from '~/components/HealthInformation';
import ChatBot from '~/components/ChatBot';
import { fetchApiAllPatientsSelector, fetchApiLoginSelector, isLoadingApiAllPatientsSelector } from '~/redux/selector';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { fetchApiNotificationByPatientId } from '~/redux/features/notification/notificationSlice';

function Home({ checkUserLogin }) {
    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const isLoading = useSelector(isLoadingApiAllPatientsSelector);
    const token = useSelector(fetchApiLoginSelector);
    const dispatch = useDispatch();

    // console.log('schedules ->', schedules);
    // console.log('patients home', patients);
    // console.log('isLoading', isLoading);
    // console.log('token', token);

    useEffect(() => {
        if (token.accessToken) {
            dispatch(fetchApiAllPatients());
        }
    }, [token.accessToken]);

    useEffect(() => {
        dispatch(fetchApiNotificationByPatientId(patients?.patient?._id));
    }, [patients?.patient?._id]);

    return (
        <div className="home-wrapper">
            <ChatBot patients={patients} />

            <DefaultLayout checkUserLogin={checkUserLogin} patients={patients}>
                <ScrollToTop smooth className="scroll-to-top" />

                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <Content>
                        <SlideImage patients={patients} />
                        <ExploreClinic />
                        <HealthInformation />
                    </Content>
                )}
            </DefaultLayout>
        </div>
    );
}

export default Home;
