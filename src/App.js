import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import SavedJobs from './pages/SavedJobs';
import ResumeBuilder from './pages/ResumeBuilder';
import ApplySuccess from './pages/ApplySuccess';
import AlreadyApplied from './pages/AlreadyApplied';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotAdmin from './pages/NotAdmin';
import ChatButton from './components/ChatButton';
import ApplyForm from './pages/ApplyForm';
import "./css/app.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
}

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/apply-success" element={<ProtectedRoute><ApplySuccess /></ProtectedRoute>} />
          <Route path="/already-applied" element={<ProtectedRoute><AlreadyApplied /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
          <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/not-admin" element={<NotAdmin />} />
          <Route path="/apply/:jobId" element={<ApplyForm />} />
        </Routes>
      </main>

      {user && <ChatButton />}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

export default App;
