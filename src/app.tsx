import { ApolloProvider } from "@/providers/apollo-provider";
import { StylesProvider } from "@/providers/styles-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/react-router";
import { Routes } from "@/routes";
import { FC } from "react";

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <StylesProvider />
      <ApolloProvider>
        <NuqsAdapter>
          <Routes />
        </NuqsAdapter>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
