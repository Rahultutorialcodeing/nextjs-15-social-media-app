import { graphql } from "../../../gql";

export const cretePostMutaion = graphql(`
  #graphql

  mutation postMutation($input: posts) {
    post(input: $input) {
      content
      createdAt
      user {
          displayname
          userAvtar
          username
        }
    }
  }
`);
