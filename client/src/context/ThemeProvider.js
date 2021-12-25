import React, { useContext, createContext } from "react";
const ThemeContext = createContext(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

const lighttheme = {
  textcolor: "#ffff",
  backgroundcolor: "#0000",
};

const darktheme = {
  textcolor: "#0000",
  backgroundcolor: "#ffff",
};

const ThemeProvider = ({ children }) => {
  const value = {
    lighttheme,
    darktheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
