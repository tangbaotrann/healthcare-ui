import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const createFormData = (values) => {
    const { content, doctor_id, image } = values;

    const formData = new FormData();

    formData.append('content', content);
    formData.append('doctor_id', doctor_id);

    // Check images
    if (image.length === 1) {
        formData.append('image', image[0].imageFile);
    } else if (image.length > 1) {
        image.forEach((_image) => {
            formData.append('image', _image.imageFile);
        });
    }

    return formData;
};

// fetch api create comment
export const fetchApiCreateComment = createAsyncThunk('comment/fetchApiCreateComment', async (values) => {
    try {
        const { post_id } = values;
        let formData = createFormData(values);

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}comments/${post_id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        console.log('res create comment ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api comment by id post
export const fetchApiCommentByIdPost = createAsyncThunk('blog/fetchApiCommentByIdPost', async (post_id) => {
    try {
        if (post_id) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}comments/${post_id}`);
            console.log('res comment by id post ->', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        data: [],
        btnClickedComment: null,
    },
    reducers: {
        arrivalComments: (state, action) => {
            state.btnClickedComment = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiCommentByIdPost.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchApiCreateComment.fulfilled, (state, action) => {
                state.data.push(action.payload);
            });
    },
});

export default commentSlice;
