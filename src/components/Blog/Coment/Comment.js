// lib
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

// me
import { logo } from '~/asset/images';
import { fetchApiCreateComment } from '~/redux/features/comment/commentSlice';

function Comment({ blogPost, onHideComment }) {
    const [value, setValue] = useState('');

    const dispatch = useDispatch();

    // handle input comment
    const handleChangeInputComment = (e) => {
        setValue(e.target.value);
    };

    // handle send comment
    const handleSendComment = () => {
        console.log('content', value);
        console.log('doctor_id', blogPost.author.doctor._id);
        console.log('post_id', blogPost._id);

        dispatch(
            fetchApiCreateComment({
                content: value,
                image: [],
                doctor_id: blogPost.author.doctor._id,
                post_id: blogPost._id,
            }),
        );
    };

    return (
        <div className="comments-container">
            <div className="comments-header">
                <p className="comments-total">{blogPost.comments.length} bình luận</p>
                <span className="hide-comments" onClick={onHideComment}>
                    X
                </span>
            </div>

            {/* Input */}
            <input
                className="input-comments"
                value={value}
                onChange={handleChangeInputComment}
                type="text"
                placeholder="Nhập bình luận..."
            />

            {/* Button */}
            <div className="btn-comments-display">
                <Button className="btn-comments" onClick={handleSendComment}>
                    Bình luận
                </Button>
            </div>

            {/* Content comment */}
            <div className="content-comments-container">
                <div className="content-comments-item">
                    <img src={logo.iconHeart} className="content-comments-item-avatar" alt="" />

                    <div className="content-comments-item-info">
                        <p className="content-comments-item-info-username">tr</p>
                        <p className="content-comments-item-info-content">nội dung</p>
                    </div>
                </div>
                <span className="content-comments-item-time">12:00 pm</span>
            </div>
        </div>
    );
}

export default Comment;
