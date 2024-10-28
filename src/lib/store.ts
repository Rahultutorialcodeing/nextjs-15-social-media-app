import  loginlice  from "@/Redux-toolkit/login";
import  otpSlice  from "@/Redux-toolkit/otp";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    otpSlice,
    loginlice
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
