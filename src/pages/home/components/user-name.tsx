import { gql } from "@/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { FC } from "react";

export interface UserNameProps {}

export const UserName: FC<UserNameProps> = () => {
  const { data } = useSuspenseQuery(
    gql(
      "\n  query userById($id: Int!) {\n    userById(id: $id) {\n      name\n    }\n  }\n"
    ),
    { variables: { id: 1 } }
  );

  return data.userById?.name;
};
