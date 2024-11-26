import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts(
    $after: String
    $before: String
    $excludePins: Boolean
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $postTypeIds: [String!]
    $reverse: Boolean
    $spaceIds: [ID!]
  ) {
    getPosts(
      after: $after
      before: $before
      excludePins: $excludePins
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      postTypeIds: $postTypeIds
      reverse: $reverse
      spaceIds: $spaceIds
    ) {
      nodes {
        owner {
          member {
            name
            profilePicture {
              ... on Image {
                url
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        id
        updatedAt
        description
        customSeoDetail {
          thumbnail {
            ... on Image {
              url
              __typename
            }
            __typename
          }
          __typename
        }
        tags {
          title
          __typename
        }
        title
        reactions {
          reaction
          __typename
        }
        __typename
      }
      pageInfo {
        hasNextPage
        endCursor
        __typename
      }
      totalCount
      __typename
    }
  }
`;

export const GET_POST_ID = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      owner {
        member {
          name
          profilePicture {
            ... on Image {
              url
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      id
      updatedAt
      contentSummary {
        summary
        __typename
      }
      fields {
        value
        key
        __typename
      }
      description
      thumbnail {
        ... on Image {
          url
          __typename
        }
        __typename
      }
      tags {
        title
        __typename
      }
      title
      reactions {
        reaction
        __typename
      }
      __typename
    }
  }
`;
