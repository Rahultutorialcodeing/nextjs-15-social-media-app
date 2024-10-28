import { createSlice } from "@reduxjs/toolkit";

export interface OtpState {
  otpValue: string | null;
}

// Define the initial state using that type
const initialState: OtpState = {
  otpValue: null,
};

export const otpSlice = createSlice({
  name: "otp",

  initialState,
  reducers: {
    otpHandler: (state, actions) => {
      state.otpValue = actions.payload;
    },
  },
});

export const { otpHandler } = otpSlice.actions;

export default otpSlice.reducer;
