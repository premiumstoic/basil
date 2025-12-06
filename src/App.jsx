// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import CardGrid from './components/Cards/CardGrid';
import CardDetail from './components/Cards/CardDetail';
import AddCardForm from './components/Forms/AddCardForm';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function Home() {
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get('id');

  return (
    <>
      <CardGrid />
      {cardId && <CardDetail />}
    </>
  );
}

import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-paper text-ink transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddCardForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
