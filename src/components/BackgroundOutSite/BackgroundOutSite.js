import './BackgroundOutSite.css';

function BackgroundOutSite({ children }) {
    return (
        <div className="wrapper-bg-out-site">
            <div className="container">
                <h1 className="title">T&T HEALTHCARE</h1>

                {/* Inputs */}
                <div className="inputs">{children}</div>
            </div>
            <div className="bg-out-site-footer"></div>
        </div>
    );
}

export default BackgroundOutSite;
