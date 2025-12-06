// src/components/Layout/Settings.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const { t, language, toggleLanguage } = useLanguage();

    const themeOptions = [
        { value: 'system', label: t('settings.system') || 'System', icon: Monitor },
        { value: 'light', label: t('settings.light') || 'Light', icon: Sun },
        { value: 'dark', label: t('settings.dark') || 'Dark', icon: Moon },
    ];

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'tr', label: 'Türkçe' },
    ];

    return (
        <div className="min-h-screen bg-paper dark:bg-paper-dark py-8 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                    <Link
                        to="/"
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <ArrowLeft size={20} className="text-ink dark:text-ink-dark" />
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink dark:text-ink-dark">
                        {t('settings.title') || 'Settings'}
                    </h1>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Theme Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-serif font-semibold text-ink dark:text-ink-dark mb-4">
                            {t('settings.theme') || 'Theme'}
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {themeOptions.map((option) => {
                                const Icon = option.icon;
                                const isSelected = theme === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setTheme(option.value)}
                                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${isSelected
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                            }`}
                                    >
                                        <Icon
                                            size={24}
                                            className={isSelected ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
                                        />
                                        <span
                                            className={`mt-2 text-sm font-sans font-medium ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Language Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-serif font-semibold text-ink dark:text-ink-dark mb-4">
                            {t('settings.language') || 'Language'}
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {languageOptions.map((option) => {
                                const isSelected = language === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            if (language !== option.value) {
                                                toggleLanguage();
                                            }
                                        }}
                                        className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${isSelected
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                            }`}
                                    >
                                        <span
                                            className={`text-sm font-sans font-medium ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-serif font-semibold text-ink dark:text-ink-dark mb-2">
                            {t('settings.about') || 'About'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-sans">
                            Reyhanlı Kartlar - {t('settings.aboutDesc') || "A collection of cultural moments for Reyhan"}
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs font-mono mt-2">
                            v1.0.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
