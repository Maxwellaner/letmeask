import { createContext, ReactNode } from "react";

type ToogleThemeContextProps = {
  toogleTheme: () => void;
}

export const ToogleThemeContext = createContext({} as ToogleThemeContextProps);

type ToogleThemeProviderProps = {
  children: ReactNode;
  toogleTheme: () => void;
}

export function ToogleThemeProvider({ toogleTheme, children }: ToogleThemeProviderProps) {
  return (
    <ToogleThemeContext.Provider value={{ toogleTheme }}>
      {children}
    </ToogleThemeContext.Provider>
  );    
}