// lib
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

// me
import './Home.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import Content from '~/layouts/components/Content';
import ExploreClinic from '~/components/ExploreClinic';
import SlideImage from '~/components/SlideImage';
import HealthInformation from '~/components/HealthInformation';
import ChatBot from '~/components/ChatBot';
import { fetchApiUserDoctorByTokenSelector } from '~/redux/selector';
import { fetchApiUserDoctorByToken } from '~/redux/features/user/userSlice';

function Home() {
    const dispatch = useDispatch();

    const userLogin = useSelector(fetchApiUserDoctorByTokenSelector);

    useEffect(() => {
        dispatch(fetchApiUserDoctorByToken());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DefaultLayout userLogin={userLogin}>
            <ScrollToTop smooth className="scroll-to-top" />
            <ChatBot />
            <Content>
                <SlideImage />
                <ExploreClinic />
                <HealthInformation />
            </Content>
        </DefaultLayout>
    );
}

export default Home;
