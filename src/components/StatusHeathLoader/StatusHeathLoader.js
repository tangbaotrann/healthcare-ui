// me
import './StatusHeathLoader.css';

function StatusHeathLoader({ status }) {
    // console.log('status', status);

    return (
        <>
            {status.message ? (
                status.message.code === 1 ? (
                    <div className="status-heath-loader-warning">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : status.message.code === 2 ? (
                    <div className="status-heath-loader-alarm">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : status.message.code === 0 ? (
                    <div className="status-heath-loader-normal">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : status.message.code === -1 ? (
                    <span className="status-message-remind">Chưa cập nhật (BMI và GLYCEMIC)</span>
                ) : null
            ) : null}
        </>
    );
}

export default StatusHeathLoader;
