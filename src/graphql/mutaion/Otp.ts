import { graphql } from "../../../gql";

export const creteOtpMutaion = graphql(`
  #graphql

  mutation otpMutation($input: Otp!) {
    otp(input: $input) {
      success
      message
    }
  }
`);
