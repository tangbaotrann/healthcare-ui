// lib
import ScrollToTop from 'react-scroll-to-top';

// me
import './Home.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import Content from '~/layouts/components/Content';
import ExploreClinic from '~/components/ExploreClinic';
import SlideImage from '~/components/SlideImage';
import HealthInformation from '~/components/HealthInformation';

function Home() {
    return (
        <DefaultLayout>
            <ScrollToTop smooth className="scroll-to-top" />
            <Content>
                <SlideImage />
                <ExploreClinic />
                <HealthInformation />
            </Content>
        </DefaultLayout>
    );
}

export default Home;
