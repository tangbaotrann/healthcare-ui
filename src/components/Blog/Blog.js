// lib
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select, Tooltip } from 'antd';

// me
import './Blog.css';
import TextEditor from './TextEditor';
import BlogItem from './BlogItem';
import { blogOptionSelectedFilter, fetchApiGetPostByIdSelector } from '~/redux/selector';
import blogSlice from '~/redux/features/blog/blogSlice';

function Blog({ infoUser }) {
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const posts = useSelector(blogOptionSelectedFilter);
    const blogPost = useSelector(fetchApiGetPostByIdSelector);

    // console.log('posts', posts);
    console.log('blogPost ->>>', blogPost);

    // handle open modal
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // handle hide modal
    const handleHideModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        dispatch(blogSlice.actions.arrivalFilterBlog('all'));
    }, []);

    // handle filter blog
    const handleChangeFilterBlog = (value) => {
        dispatch(blogSlice.actions.arrivalFilterBlog(value));
    };

    return (
        <>
            {/* Filter blog */}
            <div className="custom-filter-blog">
                <Select
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'week', label: 'Theo tuần' },
                    ]}
                    defaultValue="all"
                    style={{ width: 140, zIndex: '2' }}
                    onSelect={handleChangeFilterBlog}
                />
            </div>
            <div className="wrapper-blog">
                {/* Left */}
                <div className="blog-create-btn">
                    <Tooltip title="Viết blog" placement="bottom">
                        <Button className="create-btn-write" onClick={handleOpenModal}>
                            +
                        </Button>
                    </Tooltip>
                </div>

                {/* Modal  */}
                <Modal
                    open={openModal}
                    onCancel={handleHideModal}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    width={2000}
                    centered={true}
                >
                    <TextEditor infoUser={infoUser} onHideModal={handleHideModal} />
                </Modal>

                {/* Mid  */}
                <div className="blog-middle-content">
                    {/* MAP */}
                    <BlogItem posts={posts} blogPost={blogPost} infoUser={infoUser} />
                </div>
            </div>
        </>
    );
}

export default Blog;
