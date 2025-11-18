import React from "react";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  en: {
    greeting: "Hello, World!",
    switch: "Switch to Indonesian",
    description: "This is a demo of the language switching feature."
  },
  id: {
    greeting: "Halo, Dunia!",
    switch: "Beralih ke Bahasa Inggris",
    description: "Ini adalah demo dari fitur pengalihan bahasa."
  }
};

function LanguageTest() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{t.greeting}</h2>
      <p>{t.description}</p>
      <button onClick={toggleLanguage} style={{ 
        padding: "0.5rem 1rem", 
        fontSize: "1rem",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
      }}>
        {t.switch}
      </button>
    </div>
  );
}

export default LanguageTest;