import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Select, Skeleton } from 'antd';
import ScrollToTop from 'react-scroll-to-top';

import './BlogPage.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import {
    blogPatientOptionSelectedFilter,
    fetchApiAllPatientsSelector,
    fetchApiCommentByIdPostSelector,
    fetchApiGetPostByIdSelector,
    isLoadingGetAllPostSelector,
} from '~/redux/selector';
import blogSlice, {
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
import moment from 'moment';
import MapsPatient from '~/components/MapsPatient/MapsPatient';

function BlogPage() {
    const [openBlogDetail, setOpenBlogDetail] = useState(false);
    const [likes, setLikes] = useState(false);
    const [size, setSize] = useState();
    const [openComments, setOpenComments] = useState(false);

    const patients = useSelector(fetchApiAllPatientsSelector); // filterGetInfoPatientByAccountId
    const posts = useSelector(blogPatientOptionSelectedFilter); // fetchApiGetAllPostSelector
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
        // console.log('post ->', post);
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

    useEffect(() => {
        dispatch(blogSlice.actions.arrivalFilterBlog('week'));
    }, []);

    // handle filter blog
    const handleChangeFilterBlog = (value) => {
        dispatch(blogSlice.actions.arrivalFilterBlog(value));
    };

    return (
        <DefaultLayout patients={patients}>
            <ChatBot />
            <MapsPatient patients={patients} />
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

                            {/* Filter blog */}
                            <div className="custom-filter-blog">
                                <Select
                                    options={[
                                        { value: 'all', label: 'Tất cả' },
                                        { value: 'week', label: 'Theo tuần' },
                                    ]}
                                    defaultValue="Theo tuần"
                                    style={{ width: 140, zIndex: '2' }}
                                    onSelect={handleChangeFilterBlog}
                                />
                            </div>
                        </div>

                        {/* Mid  */}
                        {isLoading ? (
                            <Skeleton active />
                        ) : (
                            <div className="blog-patient-middle-content">
                                {posts?.length > 0 ? (
                                    posts.map((post) => {
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

                                                            <p className="blog-footer-time">
                                                                {moment(post.createdAt).format('DD/MM/YYYY')}{' '}
                                                                <span className="blog-footer-icon-time">·</span>{' '}
                                                                {moment(post.createdAt).format('HH:mm')}
                                                            </p>
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
                                    })
                                ) : (
                                    <p className="message-blog-no-post">
                                        <i>-- Hiện tại chưa có bài viết nào của các bác sĩ --</i>
                                    </p>
                                )}
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
