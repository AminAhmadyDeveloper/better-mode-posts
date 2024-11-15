import * as Apollo from "@apollo/client";
import { ApolloProviderProps } from "@apollo/client/react/context";
import { setContext } from "@apollo/client/link/context";
import type { FC } from "react";
import { useCookie } from "@/providers/cookie-provider";

const httpLink = Apollo.createHttpLink({ uri: "https://api.bettermode.com/" });

const authLink = (token?: string) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
};

const client = (token?: string) => {
  return new Apollo.ApolloClient({
    uri: "https://api.bettermode.com/",
    link: authLink(token).concat(httpLink),
    cache: new Apollo.InMemoryCache(),
  });
};

export const ApolloProvider: FC<
  Omit<ApolloProviderProps<Apollo.InMemoryCache>, "client">
> = (props) => {
  const { accessToken } = useCookie();

  return <Apollo.ApolloProvider client={client(accessToken)} {...props} />;
};
