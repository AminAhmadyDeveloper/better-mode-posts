import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      name
    }
  }
`;