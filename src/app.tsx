import { ApolloProvider } from "@/providers/apollo-provider";
import { StylesProvider } from "@/providers/styles-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Routes } from "@/routes";
import { FC } from "react";

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <StylesProvider />
      <ApolloProvider>
        <Routes />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
