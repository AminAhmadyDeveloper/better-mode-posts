import * as React from "react";

export const CookieContext = React.createContext({} as Cookies);

interface CookieProviderProps {
  cookies: Cookies;
  children: React.ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({
  children,
  cookies,
}) => {
  return (
    <CookieContext.Provider value={cookies}>{children}</CookieContext.Provider>
  );
};

export const useCookie = () => React.useContext(CookieContext);
