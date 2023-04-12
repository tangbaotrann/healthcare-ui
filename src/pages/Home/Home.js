// lib
import { useDispatch } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

// me
import './Home.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import Content from '~/layouts/components/Content';
import ExploreClinic from '~/components/ExploreClinic';
import SlideImage from '~/components/SlideImage';
import HealthInformation from '~/components/HealthInformation';
import { useSelector } from 'react-redux';
import { fetchApiAllPatientsSelector } from '~/redux/selector';
import ChatBot from '~/components/ChatBot';
import { useEffect } from 'react';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { fetchApiNotificationByPatientId } from '~/redux/features/notification/notificationSlice';

function Home({ checkUserLogin }) {
    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId

    const dispatch = useDispatch();

    // console.log('schedules ->', schedules);
    // console.log('pat', patients);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    useEffect(() => {
        dispatch(fetchApiNotificationByPatientId(patients?.patient?._id));
    }, [patients?.patient?._id]);

    return (
        <div className="home-wrapper">
            {/* <ChatBot /> */}
            <ChatBot patients={patients} />

            <DefaultLayout checkUserLogin={checkUserLogin} patients={patients}>
                <ScrollToTop smooth className="scroll-to-top" />
                <Content>
                    <SlideImage patients={patients} />
                    <ExploreClinic />
                    <HealthInformation />
                </Content>
            </DefaultLayout>
        </div>
    );
}

export default Home;
