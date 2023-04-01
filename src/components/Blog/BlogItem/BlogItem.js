// lib
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Image } from 'antd';
import { ArrowLeftOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';

// me
import { fetchApiGetPostById } from '~/redux/features/blog/blogSlice';
import Comment from '../Coment';

function BlogItem({ posts }) {
    const [blogPost, setBlogPost] = useState({});
    const [postDetail, setPostDetail] = useState(false);
    const [openComments, setOpenComments] = useState(false);

    const dispatch = useDispatch();

    // const getPost = useSelector(fetchApiGetPostByIdSelector);
    // const isLoading = useSelector(isLoadingGetAllPostSelector);

    // console.log('getPost', getPost);
    // console.log('isLoading', isLoading);

    // handle show modal blog detail
    const handleOpenModalBlogDetail = (post) => {
        console.log('post ->', post);
        dispatch(fetchApiGetPostById(post._id));
        setBlogPost(post);
        setPostDetail(true);
    };

    // back to blog
    const handleBackToBlog = () => {
        setPostDetail(false);
    };

    // handle open comments
    const handleOpenComments = () => {
        setOpenComments(true);
    };

    // handle hide comments
    const handleHideComments = () => {
        setOpenComments(false);
    };

    return (
        <>
            {postDetail ? (
                <div className="post-detail-wrapper">
                    <div className="post-detail-container">
                        {/* Left */}
                        <div className="post-detail-content-left">
                            <div className="post-detail-content-left-fix-to-top">
                                <div className="post-detail-back-icon" onClick={handleBackToBlog}>
                                    <ArrowLeftOutlined className="icon-arrow-back" />
                                    <p>Quay lại</p>
                                </div>
                                <p className="post-detail-content-left-username">
                                    Bs: {blogPost.author.doctor.person.username}
                                </p>
                                <Divider className="separator-username" />

                                <div className="post-detail-interacts">
                                    <div className="interacts-inner">
                                        <HeartOutlined className="post-detail-icon-heart" />
                                        <p className="post-detail-icon-heart-number">{blogPost.likes.length}</p>
                                    </div>

                                    <div className="interacts-inner">
                                        <MessageOutlined
                                            className="post-detail-icon-mess"
                                            onClick={handleOpenComments}
                                        />
                                        <p className="post-detail-icon-mess-number">{blogPost.comments.length}</p>
                                    </div>
                                </div>

                                {/* Show comments */}
                                {openComments ? (
                                    <Comment blogPost={blogPost} onHideComment={handleHideComments} />
                                ) : null}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="post-detail-content-right">
                            <h2 className="post-detail-content-right-title">{blogPost.title || ''}</h2>

                            {/* Header */}
                            <div className="post-detail-content-right-header">
                                <img
                                    src={blogPost.author.doctor.person.avatar}
                                    className="post-detail-content-right-avatar"
                                    alt="avatar"
                                />

                                <div className="post-detail-content-righ-info">
                                    <h4 className="post-detail-content-right-username">
                                        BS: {blogPost.author.doctor.person.username}
                                    </h4>
                                    <p className="post-detail-content-right-time">
                                        <span>·</span> {moment(blogPost.createdAt).format('HH:mm a')}
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
            ) : (
                <>
                    <div className="blog-middle-content-header-fix-to-top">
                        <h2 className="blog-title">Bài viết nổi bậc</h2>
                        <p className="blog-sub-title">Tổng hợp các bài viết chia sẻ về bệnh đáy tháo đường.</p>
                    </div>
                    <>
                        {posts.map((post) => {
                            return (
                                <div
                                    className="blog-item"
                                    key={post._id}
                                    onClick={() => handleOpenModalBlogDetail(post)}
                                >
                                    <div className="blog-item-container">
                                        <div className="content-left-container">
                                            {/* Header */}
                                            <div className="blog-header">
                                                <img
                                                    src={post.author.doctor.person.avatar}
                                                    className="blog-header-avatar"
                                                    alt="avatar"
                                                />
                                                <p className="blog-header-username">
                                                    BS. {post.author.doctor.person.username}
                                                </p>
                                            </div>
                                            {/* Content */}
                                            <div className="blog-content">
                                                {/* Description */}
                                                <div className="blog-content-desc">
                                                    <h3 className="blog-content-desc-title">{post.title || null}</h3>
                                                    <div
                                                        className="blog-content-desc-detail"
                                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="blog-content-image">
                                            {post.images.length === 0
                                                ? null
                                                : post.images.length >= 1
                                                ? post.images.map((_postImage, index) => {
                                                      return (
                                                          <Image
                                                              key={index}
                                                              className="blog-content-image-detail"
                                                              src={_postImage}
                                                              alt="image-content"
                                                          />
                                                      );
                                                  })
                                                : null}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="blog-footer">
                                        <p className="blog-footer-time">
                                            <span className="blog-footer-icon-time">·</span>{' '}
                                            {moment(post.createdAt).format('HH:mm a')}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                </>
            )}
        </>
    );
}

export default BlogItem;
