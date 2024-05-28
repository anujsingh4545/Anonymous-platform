import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  reload: false,
  error: false,
  rendered: false,
};

const SavedPostSlice = createSlice({
  name: "AllPosts",
  initialState,
  reducers: {
    updatePost: (state, action) => {
      state.posts = action.payload;
      state.error = false;
      state.reload = false;
      state.rendered = true;
    },

    deleteSaved: (state, action) => {
      const { postId } = action.payload;
      state.posts = state.posts.filter((post: any) => post.postId != postId);
    },

    callReload: (state) => {
      state.reload = true;
    },

    errorCall: (state) => {
      state.error = true;
    },
  },
});

export default SavedPostSlice.reducer;
export const { updatePost, errorCall, callReload, deleteSaved } = SavedPostSlice.actions;
