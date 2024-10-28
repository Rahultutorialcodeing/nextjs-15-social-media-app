import { graphql } from "../../../gql";

export const creteLoginMutaion = graphql(`
  #graphql

  mutation loginMutation($input: loginuser!) {
    login(input: $input) {
      success
      message
    }
  }
`);
