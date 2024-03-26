import React from "react";
import ls from "localstorage-slim";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const lsDarkMode = ls.get("darkMode");

    if (!darkMode && !lsDarkMode) {
      document.documentElement.classList.remove("dark");
    }

    if (lsDarkMode && lsDarkMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else if (lsDarkMode && lsDarkMode === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    if (!darkMode) {
      ls.set("darkMode", "dark");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      ls.set("darkMode", "light");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  };

  return (
    <div>
      <DarkModeSwitch checked={darkMode} onChange={toggleTheme} size={35} />
    </div>
  );
};

export default ThemeSwitcher;
