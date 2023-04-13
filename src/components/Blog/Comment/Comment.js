// lib
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Image, Tooltip } from 'antd';

// me
import { fetchApiCreateComment } from '~/redux/features/comment/commentSlice';
import { FileJpgOutlined } from '@ant-design/icons';
import CommentItem from '../CommentItem';

function Comment({ blogPost, onHideComment, comments }) {
    const [value, setValue] = useState('');
    const [newImage, setNewImage] = useState([]);

    const dispatch = useDispatch();

    const focusInputRef = useRef();

    // console.log('blogPost comment->', blogPost);
    // console.log('comments comment->', comments);

    // handle input comment
    const handleChangeInputComment = (e) => {
        setValue(e.target.value);
    };

    // handle send comment
    const handleSendComment = () => {
        dispatch(
            fetchApiCreateComment({
                content: value,
                image: newImage, // arrays
                doctor_id: blogPost.author._id, // .doctor
                post_id: blogPost._id,
            }),
        );
        setValue('');
        focusInputRef.current.focus();
    };

    // handle option change images
    const handleOptionChangeImages = (e) => {
        const files = e.target.files;
        const listFiles = [];

        [...files].forEach((_file) => {
            listFiles.push({
                imageFile: _file,
                preview: URL.createObjectURL(_file),
            });
        });

        setNewImage(listFiles);
        // focusInputMessage.current.focus();
    };

    // cleanup func
    useEffect(() => {
        return () => {
            newImage &&
                URL.revokeObjectURL(
                    newImage.map((_image) => {
                        return _image.preview;
                    }),
                );
        };
    }, [newImage]);

    return (
        <div className="comments-container">
            <div className="comments-header">
                <p className="comments-total">{blogPost.comments.length} bình luận</p>
                <span className="hide-comments" onClick={onHideComment}>
                    X
                </span>
            </div>

            <div className="comments-container-option">
                {/* Option images */}
                <label htmlFor="comment-input-opt-file-label" className="comment-input-option-file-image-container">
                    <div className="comment-input-option-file-image">
                        {/* <PaperClipOutlined  /> */}
                        <Tooltip title="Chọn ảnh" placement="bottom">
                            <FileJpgOutlined className="comment-input-option-file-image-icon" />
                        </Tooltip>
                        <input
                            className="comment-input-opt-file-label-hide"
                            type="file"
                            id="comment-input-opt-file-label"
                            name="comment-input-opt-file-label"
                            multiple
                            accept=".png, .jpg, .jpeg, .mov, .mp4"
                            onChange={handleOptionChangeImages}
                        />
                    </div>
                </label>

                {/* Preview image */}
                {newImage.map((_image, index) => {
                    return (
                        <div className="comments-preview-image-container" key={index}>
                            <Image className="comments-preview-image" src={_image.preview} alt="img" />
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <input
                className="input-comments"
                ref={focusInputRef}
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
            <CommentItem comments={comments} />
        </div>
    );
}

export default Comment;
