// me
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';

function DefaultLayout({ children, checkUserLogin, patients }) {
    // useEffect(() => {
    //     socket.on('notification_confirm_register_schedule_success', ({ notification }) => {
    //         console.log('notification_confirm_register_schedule_success', notification);
    //         toast.success(`${notification.content}`);
    //     });
    // }, []);

    return (
        <>
            {/* Header */}
            <Header checkUserLogin={checkUserLogin} patients={patients} />

            {/* Content */}
            <div style={{ marginTop: '90px' }}>{children}</div>

            <ToastContainer position="top-right" autoClose={3000} closeOnClick={false} />
        </>
    );
}

export default DefaultLayout;
