// src/components/Layout/Navbar.jsx
import { Link } from 'react-router-dom';
import { Plus, LogOut, User, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <nav className="bg-paper border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Reyhan Logo" className="h-10 w-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="text-2xl font-serif font-semibold text-ink tracking-tight">{t('navbar.title')}</span>
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-700 transition font-sans font-medium text-sm tracking-wide"
              title="Switch Language"
            >
              <Globe size={18} />
              <span className="uppercase">{language}</span>
            </button>

            {user ? (
              <>
                <Link
                  to="/add"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-ink text-white rounded-lg hover:bg-gray-800 transition shadow-sm hover:shadow-md font-sans font-medium"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">{t('navbar.addCard')}</span>
                </Link>
                <div className="flex items-center space-x-4 ml-2 border-l border-gray-200 pl-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User size={18} />
                    <span className="hidden sm:inline font-sans font-medium">{user.email}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="p-2 text-gray-500 hover:text-red-600 transition"
                    title={t('navbar.logout')}
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-purple-700 transition font-sans font-medium"
                >
                  {t('navbar.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-ink text-white rounded-lg hover:bg-gray-800 transition shadow-sm hover:shadow-md font-sans font-medium"
                >
                  {t('navbar.signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
