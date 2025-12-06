// src/components/Auth/Login.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Login() {
  const { signIn, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      signIn();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌿</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-ink mb-3 tracking-tight">{t('login.welcomeTitle')}</h2>
          <p className="text-gray-600 font-sans leading-relaxed">
            {t('login.welcomeDesc')}
          </p>
        </div>
        <button
          onClick={signIn}
          className="w-full py-3.5 bg-ink text-white rounded-lg hover:bg-gray-800 transition font-sans font-medium shadow-md hover:shadow-lg transform active:scale-[0.99] duration-200"
        >
          {t('login.openButton')}
        </button>
        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 font-sans uppercase tracking-widest">
          Reyhanlı Kartlar
        </div>
      </div>
    </div>
  );
}
