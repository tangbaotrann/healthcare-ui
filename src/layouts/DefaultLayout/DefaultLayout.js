// me
import Header from '../components/Header';

function DefaultLayout({ children, userLogin }) {
    return (
        <>
            {/* Header */}
            <Header userLogin={userLogin} />

            {/* Content */}
            {children}
        </>
    );
}

export default DefaultLayout;
