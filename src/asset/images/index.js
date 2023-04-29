// logo
export const logo = {
    logo: require('~/asset/images/logo.jpg'),
    iconHeart: require('~/asset/images/icon-heart.png'),
    imgMeeting: require('~/asset/images/image-meeting.png'),
    iconChatbotLogo: require('~/asset/images/favicon-32x32.png'),
    iconLogo192x192: require('~/asset/images/android-chrome-192x192.png'),
    noAvatar: require('~/asset/images/no-avatar.png'),
    bannerX1: require('~/asset/images/bannerX1.jpg'),
    bannerX2: require('~/asset/images/bannerX2.jpg'),
    bannerX3: require('~/asset/images/bannerX3.jpg'),
    bannerX4: require('~/asset/images/bannerX4.jpg'),
    roomExamX1: require('~/asset/images/roomExamX1.jpg'),
    roomExamX2: require('~/asset/images/roomExamX2.jpg'),
    roomExamX3: require('~/asset/images/roomExamX3.jpg'),
    remoteHealthX1: require('~/asset/images/remoteHealthX1.jpg'),
};

// Images of slide show
const images = [
    {
        id: 1,
        url: logo.bannerX1,
    },
    {
        id: 2,
        url: logo.bannerX2,
    },
    {
        id: 3,
        url: logo.bannerX3,
    },
    {
        id: 4,
        url: logo.bannerX4,
    },
];

// fake avatar chat-bot ai
export const avatarGPT = {
    avatarGPT: 'https://res.cloudinary.com/dgzgkty9d/image/upload/v1679056628/bnjz6tasvaom26vrp2ba.jpg',
};

// icons meeting
export const icons = {
    iconTime: 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/smart-clinic/clock.svg',
    iconHealth:
        'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/general_care.svg',
    iconPrice:
        'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/annual_health_check_up.svg',
    iconUser:
        'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/icons/header_sub_menu/pediatrics.svg',
};

export default images;
