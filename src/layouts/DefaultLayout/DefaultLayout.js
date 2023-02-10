// me
import Header from '../components/Header';

function DefaultLayout({ children, checkUserLogin }) {
    return (
        <>
            {/* Header */}
            <Header checkUserLogin={checkUserLogin} />

            {/* Content */}
            {children}
        </>
    );
}

export default DefaultLayout;
