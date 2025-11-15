import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-message">
          Maaf, halaman yang Anda cari tidak ditemukan.
        </p>
        <Link to="/" className="not-found-link">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;