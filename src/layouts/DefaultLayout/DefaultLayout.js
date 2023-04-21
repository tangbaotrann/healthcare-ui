// me
import Header from '../components/Header';

function DefaultLayout({ children, checkUserLogin, patients }) {
    return (
        <>
            {/* Header */}
            <Header checkUserLogin={checkUserLogin} patients={patients} />

            {/* Content */}
            <div style={{ marginTop: '90px' }}>{children}</div>
        </>
    );
}

export default DefaultLayout;
