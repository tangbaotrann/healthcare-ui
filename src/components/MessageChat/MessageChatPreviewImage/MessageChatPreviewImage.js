import { Image } from 'antd';

function MessageChatPreviewImage({ newImageMessage, handleDeletePreviewImage }) {
    return (
        <>
            {newImageMessage.length > 0
                ? newImageMessage.map((_image, index) => {
                      return (
                          <div key={index} className="preview-images-item">
                              <span
                                  className="btn-delete-preview-image"
                                  onClick={() => handleDeletePreviewImage(_image)}
                              >
                                  X
                              </span>
                              <Image className="preview-new-image" src={_image.preview} />
                          </div>
                      );
                  })
                : null}
        </>
    );
}

export default MessageChatPreviewImage;
