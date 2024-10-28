import { Login } from "./auth/Login";
import { Otp } from "./auth/Otp";
import { Signup } from "./auth/Signup";


const mutation = {
  signup: Signup,
  otp: Otp,
  login:Login
};

export const resolver = { mutation };
