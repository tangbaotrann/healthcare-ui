// me
import Header from '../components/Header';

function DefaultLayout({ children }) {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Content */}
            {children}

            {/* Footer */}
        </>
    );
}

export default DefaultLayout;
