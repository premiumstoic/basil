// src/components/Cards/CardGrid.jsx
import { useCards } from '../../hooks/useCards';
import { useLanguage } from '../../contexts/LanguageContext';
import CardItem from './CardItem';

export default function CardGrid() {
  const { cards, loading, error } = useCards();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('home.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center p-8 bg-white border border-gray-100 rounded-xl shadow-sm max-w-md mx-auto">
          <span className="text-6xl mb-6 block opacity-80">🌿</span>
          <h2 className="text-3xl font-serif font-medium text-ink mb-3">{t('home.noCards')}</h2>
          <p className="text-gray-500 font-sans">{t('home.noCardsDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-serif font-medium text-ink mb-6 tracking-tight leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-500 font-serif italic max-w-2xl mx-auto">
            {t('home.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
