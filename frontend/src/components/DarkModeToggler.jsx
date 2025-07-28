import { useDarkMode } from "../context/ThemeContext";
import { Moon, SunMedium } from "lucide-react";
import React from "react";

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default DarkModeToggler;
