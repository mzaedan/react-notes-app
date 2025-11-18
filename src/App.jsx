import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NoteApp from "./components/NoteApp";
import HomePage from "./pages/HomePage";
import Addpage from "./pages/Addpage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { NoteProvider } from "./context/NoteContext";
import RegisterPage from "./pages/RegisterPage";
import { getAccessToken } from "./utils/api";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <NoteProvider>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <NoteApp onLogout={handleLogout} /> : <LoginPage loginSuccess={handleLoginSuccess} />} 
            />
            <Route path="/add" element={<Addpage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/login" element={<LoginPage loginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NoteProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;