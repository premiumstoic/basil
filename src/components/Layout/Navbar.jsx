// src/components/Layout/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, LogOut, User, Globe, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-paper dark:bg-paper-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <img src={logo} alt="Reyhan Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="text-lg sm:text-2xl font-serif font-semibold text-ink dark:text-ink-dark tracking-tight">{t('navbar.title')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition font-sans font-medium text-sm tracking-wide"
              title="Switch Language"
            >
              <Globe size={18} />
              <span className="uppercase">{language}</span>
            </button>

            <Link
              to="/settings"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition"
              title={t('navbar.settings') || 'Settings'}
            >
              <Settings size={20} />
            </Link>

            {user ? (
              <>
                <Link
                  to="/add"
                  className="flex items-center space-x-2 px-4 py-2 bg-ink dark:bg-ink-dark text-white dark:text-ink rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-sm hover:shadow-md font-sans font-medium border dark:border-gray-600"
                >
                  <Plus size={18} />
                  <span>{t('navbar.addCard')}</span>
                </Link>
                <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-gray-600 pl-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <User size={18} />
                    <span className="font-sans font-medium text-sm max-w-[120px] truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
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
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition font-sans font-medium"
                >
                  {t('navbar.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-ink dark:bg-ink-dark text-white dark:text-ink rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-sm hover:shadow-md font-sans font-medium border dark:border-gray-600"
                >
                  {t('navbar.signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50" onClick={closeMobileMenu}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Drawer */}
          <div
            className="absolute top-0 right-0 w-72 h-full bg-paper dark:bg-paper-dark shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="font-serif font-semibold text-ink dark:text-ink-dark">{t('navbar.title')}</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 space-y-4">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <User size={20} className="text-gray-500 dark:text-gray-400" />
                    <span className="font-sans text-sm text-gray-700 dark:text-gray-300 truncate">{user.email}</span>
                  </div>

                  {/* Add Card */}
                  <Link
                    to="/add"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 p-3 bg-ink dark:bg-ink-dark text-white dark:text-ink rounded-lg font-sans font-medium border dark:border-gray-600"
                  >
                    <Plus size={20} />
                    <span>{t('navbar.addCard')}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block p-3 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-sans font-medium transition"
                  >
                    {t('navbar.login')}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block p-3 text-center bg-ink dark:bg-ink-dark text-white dark:text-ink rounded-lg font-sans font-medium border dark:border-gray-600"
                  >
                    {t('navbar.signup')}
                  </Link>
                </>
              )}

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Settings Link */}
              <Link
                to="/settings"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <Settings size={20} />
                <span className="font-sans font-medium">{t('navbar.settings') || 'Settings'}</span>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                className="flex items-center space-x-3 p-3 w-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <Globe size={20} />
                <span className="font-sans font-medium">
                  {language === 'en' ? 'Türkçe' : 'English'}
                </span>
              </button>

              {user && (
                <>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                    className="flex items-center space-x-3 p-3 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <LogOut size={20} />
                    <span className="font-sans font-medium">{t('navbar.logout')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
