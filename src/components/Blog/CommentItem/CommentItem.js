// lib
import moment from 'moment';

function CommentItem({ comments }) {
    // console.log('comments ->', comments);
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
                                        <p className="content-comments-item-info-content">{comment.content}</p>
                                    </div>
                                </div>
                                <span className="content-comments-item-time">
                                    {moment(comment.createdAt).format('HH:mm a')}
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