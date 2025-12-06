// src/components/Auth/Login.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (user) {
      navigate('/');
    } else {
      // Open login modal immediately
      signIn();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-8">
          <span className="text-5xl">🌸</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            The login modal should open automatically. If it doesn't, please refresh the page.
          </p>
        </div>
        <button
          onClick={signIn}
          className="w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-medium"
        >
          Open Login
        </button>
      </div>
    </div>
  );
}
