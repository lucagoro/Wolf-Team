import './App.css'
import StudentsPage from './StudentsPage'
import StudentDetailPage from "./StudentDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Header from "./components/Header";
import BottomNav from './components/BottomNav';
import AddStudentPage from './AddStudentPage';
import EditStudentPage from './EditStudentPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './LoginPage';




function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
          <Route path="/students/:id" element={<ProtectedRoute><StudentDetailPage /></ProtectedRoute>} />
          <Route path="/students/add" element={<ProtectedRoute><AddStudentPage /></ProtectedRoute>} />
          <Route path="/students/:id/edit" element={<ProtectedRoute><EditStudentPage /></ProtectedRoute>} />
        </Routes>
        <BottomNav/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
