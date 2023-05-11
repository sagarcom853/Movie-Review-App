//for the theme to convert into ddark to light theme  and vice versa

import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const defaultTheme = "light";
  const darkTheme = "dark";

  const toggleTheme = () => {
    console.log(document.documentElement);
    const oldTheme = localStorage.getItem("theme");
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    document.documentElement.classList.remove(oldTheme);
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) document.documentElement.classList.add(defaultTheme);
    else document.documentElement.classList.add(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
