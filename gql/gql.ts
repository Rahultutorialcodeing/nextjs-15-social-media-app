/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  #graphql\n\n  mutation loginMutation($input: loginuser!) {\n    login(input: $input) {\n      success\n      message\n    }\n  }\n": types.LoginMutationDocument,
    "\n  #graphql\n\n  mutation otpMutation($input: Otp!) {\n    otp(input: $input) {\n      success\n      message\n    }\n  }\n": types.OtpMutationDocument,
    "\n  #graphql\n\n  mutation postMutation($input: posts) {\n    post(input: $input) {\n      content\n      createdAt\n      user {\n          displayname\n          userAvtar\n          username\n        }\n    }\n  }\n": types.PostMutationDocument,
    "\n  #graphql\n\n  mutation signupMutation($input: User!) {\n    signup(input: $input) {\n      success\n      message\n      username\n      email\n    }\n  }\n": types.SignupMutationDocument,
    "\nquery vewdata($cursor: String) {\n    vewpost(cursor: $cursor) {\n      posts {\n        id\n        content\n        createdAt\n        user {\n          displayname\n          userAvtar\n          username\n        }\n      }\n      nextCursor\n    }\n  }\n": types.VewdataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n\n  mutation loginMutation($input: loginuser!) {\n    login(input: $input) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  #graphql\n\n  mutation loginMutation($input: loginuser!) {\n    login(input: $input) {\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n\n  mutation otpMutation($input: Otp!) {\n    otp(input: $input) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  #graphql\n\n  mutation otpMutation($input: Otp!) {\n    otp(input: $input) {\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n\n  mutation postMutation($input: posts) {\n    post(input: $input) {\n      content\n      createdAt\n      user {\n          displayname\n          userAvtar\n          username\n        }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n\n  mutation postMutation($input: posts) {\n    post(input: $input) {\n      content\n      createdAt\n      user {\n          displayname\n          userAvtar\n          username\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n\n  mutation signupMutation($input: User!) {\n    signup(input: $input) {\n      success\n      message\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  #graphql\n\n  mutation signupMutation($input: User!) {\n    signup(input: $input) {\n      success\n      message\n      username\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery vewdata($cursor: String) {\n    vewpost(cursor: $cursor) {\n      posts {\n        id\n        content\n        createdAt\n        user {\n          displayname\n          userAvtar\n          username\n        }\n      }\n      nextCursor\n    }\n  }\n"): (typeof documents)["\nquery vewdata($cursor: String) {\n    vewpost(cursor: $cursor) {\n      posts {\n        id\n        content\n        createdAt\n        user {\n          displayname\n          userAvtar\n          username\n        }\n      }\n      nextCursor\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;