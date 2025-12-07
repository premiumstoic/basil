// src/components/Cards/CardGrid.jsx
import { useState, useEffect } from 'react';
import { useCards } from '../../hooks/useCards';
import { useLanguage } from '../../contexts/LanguageContext';
import CardItem from './CardItem';
import { ChevronDown } from 'lucide-react';

export default function CardGrid() {
  const { cards, loading, error } = useCards();
  const { t } = useLanguage();
  const [displayedCards, setDisplayedCards] = useState([]);
  const [page, setPage] = useState(1);
  const CARDS_PER_PAGE = 8;

  useEffect(() => {
    if (cards.length > 0) {
      setDisplayedCards(cards.slice(0, page * CARDS_PER_PAGE));
    }
  }, [cards, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = displayedCards.length < cards.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-paper-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('home.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-paper-dark">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-paper-dark">
        <div className="text-center p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm max-w-md mx-auto">
          <span className="text-6xl mb-6 block opacity-80">🌿</span>
          <h2 className="text-3xl font-serif font-medium text-ink dark:text-ink-dark mb-3">{t('home.noCards')}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans">{t('home.noCardsDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-paper-dark py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-ink dark:text-ink-dark mb-4 sm:mb-6 tracking-tight leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-serif italic max-w-2xl mx-auto">
            {t('home.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {displayedCards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center pb-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-ink dark:text-ink-dark font-medium"
            >
              <span>{t('home.loadMore') || 'Load More'}</span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
