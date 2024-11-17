import { Login } from "./auth/Login";
import { Otp } from "./auth/Otp";
import { Signup } from "./auth/Signup";
import { Post } from "./posts/post";
import { Vewpost } from "./posts/vewPost";

const queries = {
  vewpost:Vewpost
}
const mutation = {
  signup: Signup,
  otp: Otp,
  login: Login,
  post: Post
};


export const resolver = { mutation,queries };
