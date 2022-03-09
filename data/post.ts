import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authorRoles, childGenders, familyDynamics } from "../screens/Filter";
import { Post, Reply } from "../types/state";
import mock from "./mock";

export interface Filters {
  minAge: number;
  maxAge: number;
  childGender: typeof childGenders[number] | null;
  authorRole: typeof authorRoles[number] | null;
  familyDynamic: typeof familyDynamics[number] | null;
}

export interface PostState {
  posts: Post[];
  filters: Filters;
}

const initialState: PostState = {
  posts: mock.posts,
  filters: {
    minAge: 0,
    maxAge: 216,
    childGender: null,
    authorRole: null,
    familyDynamic: null,
  },
};

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{
        filters: Filters;
      }>
    ) => {
      state.filters = action.payload.filters;
    },
    addPost: (
      state,
      action: PayloadAction<{
        post: Post;
      }>
    ) => {
      state.posts.unshift(action.payload.post);
    },
    deletePost: (
      state,
      action: PayloadAction<{
        postId: string;
      }>
    ) => {
      const index = state.posts.findIndex(
        (r) => r.id === action.payload.postId
      );
      state.posts.splice(index, 1);
    },
    likePost: (
      state,
      action: PayloadAction<{
        postId: string;
        userId: string;
      }>
    ) => {
      const post = state.posts.find((r) => r.id === action.payload.postId)!;
      if (post.likers.includes(action.payload.userId)) {
        post.likeCount--;
        post.likers = [];
      } else {
        post.likeCount++;
        post.likers.push(action.payload.userId);
      }
    },
    addReply: (
      state,
      action: PayloadAction<{
        postId: string;
        reply: Reply;
      }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId)!;
      post.replies.push(action.payload.reply);
    },
    deleteReply: (
      state,
      action: PayloadAction<{
        postId: string;
        replyId: string;
      }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId)!;
      const replyIndex = post.replies.findIndex(
        (r) => r.id === action.payload.replyId
      );
      post.replies.splice(replyIndex, 1);
    },
    likeReply: (
      state,
      action: PayloadAction<{
        postId: string;
        replyId: string;
        userId: string;
      }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId)!;
      const reply = post.replies.find((r) => r.id === action.payload.replyId)!;
      if (reply.likers.includes(action.payload.userId)) {
        reply.likeCount--;
        reply.likers = [];
      } else {
        reply.likeCount++;
        reply.likers.push(action.payload.userId);
      }
    },
  },
});

export const {
  setFilters,
  addPost,
  deletePost,
  likePost,
  addReply,
  deleteReply,
  likeReply,
} = postSlice.actions;

export default postSlice.reducer;
