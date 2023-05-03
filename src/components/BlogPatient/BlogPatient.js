import { ArrowLeftOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import './BlogPatient.css';
import { Divider, Drawer, Image } from 'antd';
import moment from 'moment';
import CommentPatient from './CommentPatient/CommentPatient';

function BlogPatient({
    blogPost,
    comments,
    patients,
    openComments,
    size,
    handleBackToBlog,
    handleOpenComments,
    handleHideComments,
    likes,
    handleLikePostOfPatient,
    handleUnLikePostOfPatient,
}) {
    return (
        <div className="patient-post-detail-container">
            <div className="patient-post-detail-container-display">
                {/* Left */}
                <div className="patient-post-detail-content-left">
                    <div className="post-detail-back-icon" onClick={handleBackToBlog}>
                        <ArrowLeftOutlined className="icon-arrow-back" />
                        <p>Quay lại</p>
                    </div>
                    <p className="patient-post-detail-content-left-username">
                        Bs: {blogPost?.author?.person?.username}
                    </p>
                    <Divider className="separator-username" />

                    <div className="patient-post-detail-interacts">
                        <div className="patient-interacts-inner-liked">
                            {likes === true || (blogPost.likes && blogPost.likes.includes(patients.patient._id)) ? (
                                <HeartFilled
                                    className="post-detail-icon-heart-liked"
                                    onClick={handleUnLikePostOfPatient}
                                />
                            ) : (
                                <HeartOutlined className="post-detail-icon-heart" onClick={handleLikePostOfPatient} />
                            )}
                            <p className="post-detail-icon-heart-number">
                                {blogPost.likes ? blogPost.likes.length : 0}
                            </p>
                        </div>

                        <div className="patient-interacts-inner-comment">
                            <MessageOutlined className="post-detail-icon-mess" onClick={handleOpenComments} />
                            <p className="post-detail-icon-mess-number">
                                {/* comments.length > 0 ? comments.length : */}
                                {blogPost.comments.length}
                            </p>

                            {/* Show comments */}
                            <Drawer
                                title={`${blogPost.comments.length} bình luận`}
                                placement="right"
                                size={size}
                                onClose={handleHideComments}
                                open={openComments}
                            >
                                <CommentPatient comments={comments} blogPost={blogPost} patients={patients} />
                            </Drawer>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="patient-post-detail-content-right">
                    <h2 className="post-detail-content-right-title">{blogPost.title || ''}</h2>

                    {/* Header */}
                    <div className="post-detail-content-right-header">
                        <img
                            src={blogPost.author.person.avatar}
                            className="post-detail-content-right-avatar"
                            alt="avatar"
                        />

                        <div className="post-detail-content-righ-info">
                            <h4 className="post-detail-content-right-username">
                                BS: {blogPost.author.person.username}
                            </h4>
                            <p className="post-detail-content-right-time">
                                <span>·</span> {moment(blogPost.createdAt).format('HH:mm')}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="post-detail-content-right-content">
                        <div
                            className="post-detail-content-right-content-desc"
                            dangerouslySetInnerHTML={{ __html: blogPost.content }}
                        />
                        {blogPost.images.length === 0
                            ? null
                            : blogPost.images.length >= 1
                            ? blogPost.images.map((_postImage, index) => {
                                  return (
                                      <div className="post-detail-content-right-content-image-item" key={index}>
                                          <Image
                                              className="post-detail-content-right-content-image"
                                              src={_postImage}
                                              alt="image-content"
                                          />
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPatient;
