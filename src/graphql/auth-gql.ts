import { gql } from "@apollo/client";

export const GET_NETWORK_ACCESS_TOKEN = gql`
  query Tokens($networkDomain: String!) {
    tokens(networkDomain: $networkDomain) {
      accessToken
      network {
        name
      }
      role {
        name
        scopes
        __typename
      }
      member {
        id
        name
        __typename
      }
    }
  }
`;

export const NETWORK_LOGIN = gql`
  mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {
    loginNetwork(
      input: { usernameOrEmail: $usernameOrEmail, password: $password }
    ) {
      accessToken
      role {
        name
        scopes
        __typename
      }
      member {
        id
        name
        email
        profilePicture {
          __typename
          ... on Image {
            urls {
              full
              large
              medium
              small
              thumb
            }
            url
          }
        }
        __typename
      }
      __typename
    }
  }
`;
