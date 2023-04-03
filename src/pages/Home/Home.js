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

function Home({ checkUserLogin }) {
    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId

    const dispatch = useDispatch();

    console.log('pat', patients);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    return (
        <div className="home-wrapper">
            {/* <ChatBot /> */}
            <ChatBot patients={patients} />

            {/* {patients ? (
                patients.patient.doctor_blood_id === null || patients.patient.doctor_glycemic_id === null ? (
                    <div className="container-updated-metric">
                        <Modal
                            open={openModal}
                            onCancel={handleCancel}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                        >
                            <TitleName></TitleName>
                        </Modal>
                    </div>
                ) : null
            ) : null} */}
            <DefaultLayout checkUserLogin={checkUserLogin} patients={patients}>
                <ScrollToTop smooth className="scroll-to-top" />
                <Content>
                    <SlideImage />
                    <ExploreClinic />
                    <HealthInformation />
                </Content>
            </DefaultLayout>
        </div>
    );
}

export default Home;
