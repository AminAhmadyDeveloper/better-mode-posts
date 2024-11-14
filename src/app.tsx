import { ApolloProvider } from "@/providers/apollo-provider";
import { StylesProvider } from "@/providers/styles-provider";
import { Routes } from "@/routes";
import { FC, Fragment } from "react";

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <Fragment>
      <StylesProvider />
      <ApolloProvider>
        <Routes />
      </ApolloProvider>
    </Fragment>
  );
};

export default App;
