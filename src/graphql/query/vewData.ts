import { gql } from "graphql-request";

// Define GraphQL query with appropriate types
export const getvewDataQuery = gql`
query vewdata($cursor: String) {
    vewpost(cursor: $cursor) {
      posts {
        id
        content
        createdAt
        user {
          displayname
          userAvtar
          username
        }
      }
      nextCursor
    }
  }
`;
