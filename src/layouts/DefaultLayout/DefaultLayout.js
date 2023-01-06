// me
import './DefaultLayout.css';
import Header from '../components/Header';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper-default-layout">
            {/* Header */}
            <Header />

            {/* Content */}
            {children}

            {/* Footer */}
        </div>
    );
}

export default DefaultLayout;
