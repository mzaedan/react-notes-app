import React from "react";
import { FaStarOfLife, FaSun, FaMoon, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAccessToken, putAccessToken } from "../utils/api";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../utils/translations";

function Navbar({ onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = useTranslation(language);
  
  const handleLogout = () => {
    // Clear the access token
    putAccessToken('');
    
    // Notify the parent component
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <FaStarOfLife className="navbar-icon" />
          <h1 className="navbar-title">{t('appName')}</h1>
        </div>
        <div className="navbar-right">
          <Link to="/archive" className="navbar-link">
            {t('notes')}
          </Link>
          <button onClick={toggleLanguage} className="language-toggle-btn" aria-label="Toggle language">
            <FaGlobe />
            <span>{language === "en" ? "Bahasa" : "English"}</span>
          </button>
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button onClick={handleLogout} className="navbar-link">
            {t('logout')}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;