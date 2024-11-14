import * as Apollo from "@apollo/client";
import { ApolloProviderProps } from "@apollo/client/react/context";
import type { FC } from "react";

const client = new Apollo.ApolloClient({
  uri: "https://graphqlplaceholder.vercel.app/graphql",
  cache: new Apollo.InMemoryCache(),
});

export const ApolloProvider: FC<
  Omit<ApolloProviderProps<Apollo.InMemoryCache>, "client">
> = (props) => {
  return <Apollo.ApolloProvider client={client} {...props} />;
};
