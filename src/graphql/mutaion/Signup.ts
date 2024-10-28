import { graphql } from "../../../gql";

export const creteUserMutaion = graphql(`
  #graphql

  mutation signupMutation($input: User!) {
    signup(input: $input) {
      success
      message
      username
      email
    }
  }
`);
