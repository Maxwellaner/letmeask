import { useContext } from "react";
import { ToogleThemeContext } from "../contexts/ToogleThemeContext";

export function useToogleTheme() {
  const value = useContext(ToogleThemeContext);

  return value;
}