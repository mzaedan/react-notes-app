import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";

function NotFoundPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  return (
    <div className="page not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404 - {t('pageNotFound')}</h1>
        <p className="not-found-message">
          {t('pageNotFoundMessage')}
        </p>
        <Link to="/" className="not-found-link">
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;