// lib
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Divider, Tooltip, message } from 'antd';

// me
import editorConfig from '~/utils/editorConfig';
import { FileJpgOutlined } from '@ant-design/icons';
import { fetchApiCreatePost } from '~/redux/features/blog/blogSlice';

function TextEditor({ infoUser, onHideModal }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newImage, setNewImage] = useState([]);

    const dispatch = useDispatch();

    // console.log('newImage', newImage);
    console.log('infoUser', infoUser);

    // handle change input
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
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

    // handle submit
    const handleSubmit = () => {
        // Check
        if (title === '' || content === '') {
            message.error('Bạn cần phải nhập thông tin bài viết!');
            return;
        }

        dispatch(
            fetchApiCreatePost({
                author: infoUser.doctor._id,
                content: content,
                image: newImage, // arrays
                title: title,
            }),
        );
        message.success('Bạn đã tạo bài biết thành công.');
        setTitle('');
        setContent('');
        setNewImage([]);
        onHideModal();
    };

    return (
        <>
            {/* Input */}
            <div className="container-editor-input-header">
                <input
                    type="text"
                    className="custom-editor-input-text-title"
                    onChange={handleTitleChange}
                    placeholder="Tiêu Đề..."
                />

                {/* Button submit */}
                <Button className="editor-header-submit-btn" onClick={handleSubmit}>
                    Đăng bài
                </Button>
            </div>
            <div className="text-editor-wrapper">
                <div className="editor-input">
                    <label htmlFor="editor-input-opt-file-label" className="editor-input-option-file-image-container">
                        <div className="editor-input-option-file-image">
                            {/* <PaperClipOutlined  /> */}
                            <Tooltip title="Chọn ảnh" placement="bottom">
                                <FileJpgOutlined className="editor-input-option-file-image-icon" />
                            </Tooltip>
                            <input
                                className="editor-input-opt-file-label-hide"
                                type="file"
                                id="editor-input-opt-file-label"
                                name="editor-input-opt-file-label"
                                multiple
                                accept=".png, .jpg, .jpeg, .mov, .mp4"
                                onChange={handleOptionChangeImages}
                            />
                        </div>
                    </label>
                    <CKEditor
                        editor={Editor}
                        config={editorConfig}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                    {/* Render link image in Ckeditor */}
                    {newImage.map((_image, index) => {
                        return <p key={index}>{_image.preview}</p>;
                    })}
                </div>

                <div className="separator-vertical">
                    <Divider type="vertical" style={{ height: '85vh' }} />
                </div>

                <div className="preview-editor">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    {newImage.map((_image, index) => {
                        return <img src={_image.preview} key={index} alt="img" />;
                    })}
                </div>
            </div>
        </>
    );
}

export default TextEditor;
