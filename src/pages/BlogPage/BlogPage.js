import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Image, Drawer } from 'antd';
import { ArrowLeftOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import ScrollToTop from 'react-scroll-to-top';

import './BlogPage.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import {
    fetchApiAllPatientsSelector,
    fetchApiCommentByIdPostSelector,
    fetchApiGetAllPostSelector,
    fetchApiGetPostByIdSelector,
} from '~/redux/selector';
import { fetchApiGetAllPost, fetchApiGetPostById } from '~/redux/features/blog/blogSlice';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import CommentPatient from '~/components/BlogPatient/CommentPatient/CommentPatient';
import { fetchApiCommentByIdPost } from '~/redux/features/comment/commentSlice';
import ChatBot from '~/components/ChatBot';

function BlogPage() {
    const [openBlogDetail, setOpenBlogDetail] = useState(false);
    const [size, setSize] = useState();
    const [openComments, setOpenComments] = useState(false);

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const posts = useSelector(fetchApiGetAllPostSelector); // filterGetInfoPatientByAccountId
    const blogPost = useSelector(fetchApiGetPostByIdSelector);
    const comments = useSelector(fetchApiCommentByIdPostSelector); // filterGetCommentPost

    const dispatch = useDispatch();

    // console.log('posts', posts);
    // console.log('blogPost', blogPost);
    // console.log('patients', patients);

    useEffect(() => {
        dispatch(fetchApiGetAllPost());
    }, []);

    useEffect(() => {
        dispatch(fetchApiAllPatients());
    }, []);

    // handle blog details
    const handleOpenBlogDetails = async (post) => {
        console.log('post ->', post);
        await dispatch(fetchApiGetPostById(post._id));
        setOpenBlogDetail(true);
    };

    // back to blog
    const handleBackToBlog = () => {
        setOpenBlogDetail(false);
        setOpenComments(false);
        // setLikes(false);
        // dispatch(fetchApiCommentByIdPost(null));
    };

    // handle open comments
    const handleOpenComments = () => {
        dispatch(fetchApiCommentByIdPost(blogPost._id));
        setSize('large');
        setOpenComments(true);
    };

    const handleHideComments = () => {
        setOpenComments(false);
    };

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />
            <div className="wrapper-blog-patient">
                {/* Left */}
                {openBlogDetail ? (
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
                                        <HeartOutlined className="post-detail-icon-heart" />
                                        <p className="post-detail-icon-heart-number">
                                            {blogPost.likes ? blogPost.likes.length : 0}
                                        </p>
                                    </div>

                                    <div className="patient-interacts-inner-comment">
                                        <MessageOutlined
                                            className="post-detail-icon-mess"
                                            onClick={handleOpenComments}
                                        />
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
                                            <CommentPatient
                                                comments={comments}
                                                blogPost={blogPost}
                                                patients={patients}
                                            />
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
                                                  <div
                                                      className="post-detail-content-right-content-image-item"
                                                      key={index}
                                                  >
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
                        <div className="blog-patient-middle-content-header-fix-to-top">
                            <h2 className="blog-patient-title">Bài viết nổi bật</h2>
                            <p className="blog-patient-sub-title">
                                Tổng hợp các bài viết chia sẻ về bệnh đái tháo đường.
                            </p>
                        </div>

                        {/* Mid  */}
                        <div className="blog-patient-middle-content">
                            {posts.map((post) => {
                                return (
                                    <div
                                        className="blog-patient-item-container"
                                        key={post._id}
                                        onClick={() => handleOpenBlogDetails(post)}
                                    >
                                        <div className="content-left-container">
                                            {/* Header */}
                                            <div className="blog-header">
                                                <img
                                                    src={post?.author?.person?.avatar}
                                                    className="blog-header-avatar"
                                                    alt="avatar"
                                                />
                                                <p className="blog-header-username">
                                                    BS. {post?.author?.person?.username}
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
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </DefaultLayout>
    );
}

export default BlogPage;
