import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// fetch api create comment
export const fetchApiCreateComment = createAsyncThunk('comment/fetchApiCreateComment', async (values) => {
    try {
        const { content, image, doctor_id, post_id } = values;

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}comments/${post_id}`, {
            content: content,
            doctor_id: doctor_id,
            // image: image,
        });
        console.log('res create comment ->', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log({ err });
    }
});

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiCreateComment.fulfilled, (state, action) => {
            state.data.push(action.payload);
        });
    },
});

export default commentSlice;
