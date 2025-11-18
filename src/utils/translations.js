// Translation utility for the personal notes app
const translations = {
  en: {
    // Navbar
    appName: "My Notes",
    logout: "Logout",
    
    // HomePage
    notes: "Notes",
    noNotes: "No notes found",
    activeNotes: "Active Notes",
    archivedNotes: "Archived Notes",
    
    // AddPage
    addNote: "Add Note",
    noteTitle: "Note Title",
    noteBody: "Note Body",
    save: "Save",
    
    // EditPage
    editNote: "Edit Note",
    cancel: "Cancel",
    
    // DetailPage
    back: "Back",
    
    // NoteItem
    delete: "Delete",
    archive: "Archive",
    unarchive: "Unarchive",
    edit: "Edit",
    
    // Search
    search: "Search...",
    
    // Login/Register
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Name",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    
    // Messages
    loading: "Loading...",
    error: "An error occurred",
    
    // 404 Page
    pageNotFound: "Page Not Found",
    pageNotFoundMessage: "Sorry, the page you're looking for doesn't exist.",
    goHome: "Go to Home"
  },
  
  id: {
    // Navbar
    appName: "Catatan Saya",
    logout: "Keluar",
    
    // HomePage
    notes: "Catatan",
    noNotes: "Tidak ada catatan",
    activeNotes: "Catatan Aktif",
    archivedNotes: "Catatan Diarsipkan",
    
    // AddPage
    addNote: "Tambah Catatan",
    noteTitle: "Judul Catatan",
    noteBody: "Isi Catatan",
    save: "Simpan",
    
    // EditPage
    editNote: "Edit Catatan",
    cancel: "Batal",
    
    // DetailPage
    back: "Kembali",
    
    // NoteItem
    delete: "Hapus",
    archive: "Arsipkan",
    unarchive: "Batal Arsip",
    edit: "Edit",
    
    // Search
    search: "Cari...",
    
    // Login/Register
    login: "Masuk",
    register: "Daftar",
    email: "Email",
    password: "Kata Sandi",
    name: "Nama",
    confirmPassword: "Konfirmasi Kata Sandi",
    alreadyHaveAccount: "Sudah punya akun?",
    dontHaveAccount: "Belum punya akun?",
    
    // Messages
    loading: "Memuat...",
    error: "Terjadi kesalahan",
    
    // 404 Page
    pageNotFound: "Halaman Tidak Ditemukan",
    pageNotFoundMessage: "Maaf, halaman yang Anda cari tidak ada.",
    goHome: "Ke Beranda"
  }
};

export const useTranslation = (language) => {
  return (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };
};

export default translations;