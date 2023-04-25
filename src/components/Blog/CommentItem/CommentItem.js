// lib
import { Image } from 'antd';
import moment from 'moment';

function CommentItem({ comments }) {
    console.log('comments ->', comments);
    return (
        <>
            {comments.length > 0 ? (
                <>
                    {comments.map((comment) => {
                        return (
                            <div className="content-comments-container" key={comment._id}>
                                <div className="content-comments-item">
                                    <img
                                        src={
                                            comment.patient_id
                                                ? comment.patient_id.person.avatar
                                                : comment.doctor_id
                                                ? comment.doctor_id.person.avatar
                                                : null
                                        }
                                        className="content-comments-item-avatar"
                                        alt=""
                                    />

                                    <div className="content-comments-item-info">
                                        <p className="content-comments-item-info-username">
                                            {comment.patient_id
                                                ? comment.patient_id.person.username
                                                : comment.doctor_id
                                                ? comment.doctor_id.person.username
                                                : null}
                                        </p>

                                        {comment.content && comment.images.length > 0 ? (
                                            <>
                                                <p
                                                    style={{ marginBottom: '10px', marginLeft: '2px' }}
                                                    className="content-comments-item-info-content"
                                                >
                                                    {comment.content}
                                                </p>
                                                <div className="display-message-item-image">
                                                    {comment.images.length === 1 ? (
                                                        <Image src={comment.images[0]} className="message-item-image" />
                                                    ) : comment.images.length > 1 ? (
                                                        comment.images.map((_image, index) => {
                                                            return (
                                                                <div className="display-images" key={index}>
                                                                    <Image
                                                                        className="message-item-image"
                                                                        src={_image}
                                                                    />
                                                                </div>
                                                            );
                                                        })
                                                    ) : null}
                                                </div>
                                            </>
                                        ) : comment.images.length === 1 ? (
                                            <Image src={comment.images[0]} className="message-item-image" />
                                        ) : comment.images.length > 1 ? (
                                            // Image
                                            <div className="display-message-item-image">
                                                {comment.images.map((_image, index) => {
                                                    return (
                                                        <div className="display-images" key={index}>
                                                            <Image className="message-item-image" src={_image} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="content-comments-item-info-content">{comment.content}</p>
                                        )}
                                    </div>
                                </div>
                                <span className="content-comments-item-time">
                                    {moment(comment.createdAt).format('HH:mm a')}
                                    <span className="content-comments-item-time-separator">·</span>
                                    {moment(comment.createdAt).format('DD/MM/YYYY')}
                                </span>
                            </div>
                        );
                    })}
                </>
            ) : null}
        </>
    );
}

export default CommentItem;
