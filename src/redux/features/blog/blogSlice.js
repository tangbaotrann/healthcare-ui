import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// Form data for blog
const createFormData = (values) => {
    const { author, content, image, title } = values;

    const formData = new FormData();

    formData.append('author', author);
    formData.append('content', content);

    // Check images
    if (image.length === 1) {
        formData.append('image', image[0].imageFile);
    } else if (image.length > 1) {
        image.forEach((_image) => {
            formData.append('image', _image.imageFile);
        });
    }

    formData.append('title', title);

    return formData;
};

// fetch api create post
export const fetchApiCreatePost = createAsyncThunk('blog/fetchApiCreatePost', async (values) => {
    try {
        // const { author, content, image, title } = values
        let formData = createFormData(values);

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}posts`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        console.log('res create post ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api get all post
export const fetchApiGetAllPost = createAsyncThunk('blog/fetchApiGetAllPost', async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}posts`);

        console.log('res all post ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch all post by id doctor
export const fetchApiAllPostByIdDoctor = createAsyncThunk('blog/fetchApiAllPostByIdDoctor', async (doctor_id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}posts/doctor/${doctor_id} `);
        console.log('res all post by id doctor ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api get post by id
export const fetchApiGetPostById = createAsyncThunk('blog/fetchApiGetPostById', async (idPost) => {
    try {
        console.log('idPost ->', idPost);
        if (idPost) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}posts/${idPost}`);
            console.log('res get post by id ->', res.data.data);

            return res.data.data;
        }
    } catch (err) {
        console.log({ err });
    }
});

// fetch api like post
export const fetchApiLikePost = createAsyncThunk('blog/fetchApiLikePost', async ({ user_id, post_id }) => {
    try {
        console.log('user_id', user_id);
        console.log('post_id', post_id);

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}posts/${post_id}/like`, {
            user_id: user_id,
        });
        console.log('res like post ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

// fetch api dislike post
export const fetchApiDisLikePost = createAsyncThunk('blog/fetchApiDisLikePost', async ({ user_id, post_id }) => {
    try {
        console.log('user_id', user_id);
        console.log('post_id', post_id);

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}posts/${post_id}/dislike`, {
            user_id: user_id,
        });
        console.log('res dislike post ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        data: [],
        getPost: [],
        btnOptionSelectedBlog: null,
        isLoading: false,
        likes: [],
        btnClickedPost: null,
    },
    reducers: {
        arrivalFilterBlog: (state, action) => {
            state.btnOptionSelectedBlog = action.payload;
        },
        arrivalBtnClickedPost: (state, action) => {
            state.btnClickedPost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiCreatePost.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(fetchApiAllPostByIdDoctor.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchApiGetPostById.fulfilled, (state, action) => {
                state.getPost = action.payload;
            })
            // like post
            .addCase(fetchApiLikePost.fulfilled, (state, action) => {
                if (state.getPost._id === action.payload._id) {
                    state.getPost = action.payload;
                }
            })
            .addCase(fetchApiDisLikePost.fulfilled, (state, action) => {
                if (state.getPost._id === action.payload._id) {
                    state.getPost = action.payload;
                }
            });
    },
});

export default blogSlice;
