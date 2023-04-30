import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Skeleton } from 'antd';
import ScrollToTop from 'react-scroll-to-top';

import './BlogPage.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import {
    fetchApiAllPatientsSelector,
    fetchApiCommentByIdPostSelector,
    fetchApiGetAllPostSelector,
    fetchApiGetPostByIdSelector,
    isLoadingGetAllPostSelector,
} from '~/redux/selector';
import {
    fetchApiGetAllPost,
    fetchApiGetPostById,
    fetchApiLikePostOfPatient,
    fetchApiUnLikePostOfPatient,
} from '~/redux/features/blog/blogSlice';
import { fetchApiAllPatients } from '~/redux/features/user/userSlice';
import { fetchApiCommentByIdPost } from '~/redux/features/comment/commentSlice';
import ChatBot from '~/components/ChatBot';
import BlogPatient from '~/components/BlogPatient/BlogPatient';
import Footer from '~/layouts/components/Footer/Footer';
import socket from '~/utils/socket';

function BlogPage() {
    const [openBlogDetail, setOpenBlogDetail] = useState(false);
    const [likes, setLikes] = useState(false);
    const [size, setSize] = useState();
    const [openComments, setOpenComments] = useState(false);

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const posts = useSelector(fetchApiGetAllPostSelector); // filterGetInfoPatientByAccountId
    const blogPost = useSelector(fetchApiGetPostByIdSelector);
    const comments = useSelector(fetchApiCommentByIdPostSelector); // filterGetCommentPost
    const isLoading = useSelector(isLoadingGetAllPostSelector);

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

    useEffect(() => {
        socket.emit('add_user', patients?.patient?._id);
    }, [patients?.patient?._id]);

    // handle blog details
    const handleOpenBlogDetails = async (post) => {
        console.log('post ->', post);
        await dispatch(fetchApiGetPostById(post._id));
        setOpenBlogDetail(true);
        setLikes(false);
    };

    // back to blog
    const handleBackToBlog = () => {
        setOpenBlogDetail(false);
        setOpenComments(false);
        setLikes(false);
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

    // handle like post
    const handleLikePostOfPatient = () => {
        dispatch(
            fetchApiLikePostOfPatient({
                user_id: patients.patient._id,
                post_id: blogPost._id,
            }),
        );
    };

    // handle dislike post
    const handleUnLikePostOfPatient = () => {
        dispatch(
            fetchApiUnLikePostOfPatient({
                user_id: patients.patient._id,
                post_id: blogPost._id,
            }),
        );
    };

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <ScrollToTop smooth className="scroll-to-top" />
            <div className="wrapper-blog-patient">
                {/* Left */}
                {openBlogDetail ? (
                    <BlogPatient
                        blogPost={blogPost}
                        comments={comments}
                        patients={patients}
                        openComments={openComments}
                        size={size}
                        handleBackToBlog={handleBackToBlog}
                        handleOpenComments={handleOpenComments}
                        handleHideComments={handleHideComments}
                        likes={likes}
                        handleLikePostOfPatient={handleLikePostOfPatient}
                        handleUnLikePostOfPatient={handleUnLikePostOfPatient}
                    />
                ) : (
                    <>
                        <div className="blog-patient-middle-content-header-fix-to-top">
                            <h2 className="blog-patient-title">Bài viết nổi bật</h2>
                            <p className="blog-patient-sub-title">
                                Tổng hợp các bài viết chia sẻ về bệnh đái tháo đường.
                            </p>
                        </div>

                        {/* Mid  */}
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
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
                                                        <h3 className="blog-content-desc-title">
                                                            {post.title || null}
                                                        </h3>
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
                        )}
                    </>
                )}
            </div>
            <div className="patient-blog-footer-display">
                <Footer className="patient-blog-footer" />
            </div>
        </DefaultLayout>
    );
}

export default BlogPage;
