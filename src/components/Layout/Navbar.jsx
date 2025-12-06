// src/components/Layout/Navbar.jsx
import { Link } from 'react-router-dom';
import { Plus, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-bold text-pink-600">Basil</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/add"
                  className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add Card</span>
                </Link>

                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={18} />
                  <span className="hidden sm:inline text-sm">
                    {user.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-pink-600 transition"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
