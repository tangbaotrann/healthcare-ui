// me
import Header from '../components/Header';

function DefaultLayout({ children, checkUserLogin, patients }) {
    return (
        <>
            {/* Header */}
            <Header checkUserLogin={checkUserLogin} patients={patients} />

            {/* Content */}
            {children}
        </>
    );
}

export default DefaultLayout;
