// lib
import Particles from 'react-tsparticles';

// me
import './ParticlesBackground.css';
import particlesConfig from '~/utils/particlesConfig';

function ParticlesBackground() {
    return <Particles params={particlesConfig}></Particles>;
}

export default ParticlesBackground;
