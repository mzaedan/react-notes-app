import React from "react";
import { Routes, Route } from "react-router-dom";
import NoteApp from "./components/NoteApp";
import HomePage from "./pages/HomePage";
import Addpage from "./pages/Addpage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import NotFoundPage from "./pages/NotFoundPage";
import { NoteProvider } from "./context/NoteContext";

function App() {
  return (
    <NoteProvider>
      <Routes>
        <Route path="/" element={<NoteApp />} />
        <Route path="/add" element={<Addpage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </NoteProvider>
  );
}

export default App;