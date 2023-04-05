import { FileJpgOutlined } from '@ant-design/icons';
import { Button, Divider, Image, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import './CommentPatient.css';
import CommentPatientItem from '../CommentPatientItem/CommentPatientItem';
import { fetchApiCreateCommentOfPatient } from '~/redux/features/comment/commentSlice';

function CommentPatient({ comments, blogPost, patients }) {
    const [value, setValue] = useState('');
    const [newImage, setNewImage] = useState([]);

    const dispatch = useDispatch();

    const focusInputRef = useRef();

    // handle input comment
    const handleChangeInputComment = (e) => {
        setValue(e.target.value);
    };

    // handle send comment
    const handleSendComment = () => {
        dispatch(
            fetchApiCreateCommentOfPatient({
                content: value,
                image: newImage, // arrays
                patient_id: patients.patient._id, // .doctor
                post_id: blogPost._id,
            }),
        );
        setValue('');
        // focusInputRef.current.focus();
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
        <div className="patient-comments-container">
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

                {/* Input */}
                <input
                    className="patient-input-comments"
                    ref={focusInputRef}
                    value={value}
                    onChange={handleChangeInputComment}
                    type="text"
                    placeholder="Nhập bình luận..."
                />

                {/* Button */}
                <div className="btn-comments-display">
                    <Button className="patient-btn-comments" onClick={handleSendComment}>
                        Bình luận
                    </Button>
                </div>
            </div>

            {/* Preview image */}
            <div className="patient-comments-display-preview-images">
                {newImage.map((_image, index) => {
                    return (
                        <div className="patient-comments-preview-image-container" key={index}>
                            <Image className="patient-comments-preview-image" src={_image.preview} alt="img" />
                        </div>
                    );
                })}
            </div>

            <Divider />

            {/* Comments */}
            <CommentPatientItem comments={comments} />
        </div>
    );
}

export default CommentPatient;
