// me
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Header from '../components/Header';

function DefaultLayout({ children, checkUserLogin, patients }) {
    // useEffect(() => {
    //     socket.on('message_notification', (message) => {
    //         console.log('message_notification', message);
    //         toast.success(`${message}`);
    //     });
    // }, []);

    return (
        <>
            {/* Header */}
            <Header checkUserLogin={checkUserLogin} patients={patients} />

            {/* Content */}
            <div style={{ marginTop: '90px' }}>{children}</div>

            {/* <ToastContainer position="top-right" autoClose={4000} closeOnClick={false} /> */}
        </>
    );
}

export default DefaultLayout;
