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
    "\n  query Tokens($networkDomain: String!) {\n    tokens(networkDomain: $networkDomain) {\n      accessToken\n      network {\n        name\n      }\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        __typename\n      }\n    }\n  }\n": types.TokensDocument,
    "\n  mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {\n    loginNetwork(\n      input: { usernameOrEmail: $usernameOrEmail, password: $password }\n    ) {\n      accessToken\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        email\n        profilePicture {\n          __typename\n          ... on Image {\n            urls {\n              full\n              large\n              medium\n              small\n              thumb\n            }\n            url\n          }\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n": types.LoginNetworkDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tokens($networkDomain: String!) {\n    tokens(networkDomain: $networkDomain) {\n      accessToken\n      network {\n        name\n      }\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  query Tokens($networkDomain: String!) {\n    tokens(networkDomain: $networkDomain) {\n      accessToken\n      network {\n        name\n      }\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        __typename\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {\n    loginNetwork(\n      input: { usernameOrEmail: $usernameOrEmail, password: $password }\n    ) {\n      accessToken\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        email\n        profilePicture {\n          __typename\n          ... on Image {\n            urls {\n              full\n              large\n              medium\n              small\n              thumb\n            }\n            url\n          }\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {\n    loginNetwork(\n      input: { usernameOrEmail: $usernameOrEmail, password: $password }\n    ) {\n      accessToken\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        email\n        profilePicture {\n          __typename\n          ... on Image {\n            urls {\n              full\n              large\n              medium\n              small\n              thumb\n            }\n            url\n          }\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;