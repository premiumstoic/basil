// src/components/Cards/CardItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Music } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCards } from '../../hooks/useCards';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CardItem({ card }) {
  const { user } = useAuth();
  const { deleteCard } = useCards();
  const { t } = useLanguage();
  const [deleting, setDeleting] = useState(false);

  const isOwner = user?.id === card.user_id;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm(t('card.deleteConfirm'))) return;

    setDeleting(true);
    try {
      await deleteCard(card.id);
    } catch (err) {
      alert(t('card.deleteError') + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Link
      to={`/?id=${card.card_id}`}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 flex flex-col h-full"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
        <img
          src={card.image_url}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          {card.category && (
            <span className="inline-block px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] uppercase tracking-wider font-sans font-bold rounded-sm border border-purple-100 dark:border-purple-800">
              {card.category}
            </span>
          )}
          {(card.music_url || card.music_file_url) && (
            <Music size={14} className="text-purple-400" />
          )}
        </div>

        <h3 className="font-serif font-bold text-xl text-ink dark:text-ink-dark mb-2 line-clamp-2 leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
          {card.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 font-sans leading-relaxed flex-grow">
          {card.description}
        </p>

        <div className="pt-4 border-t border-gray-50 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500 font-mono flex justify-between items-center mt-auto">
          <span>#{card.card_id}</span>
          {(card.music_url || card.music_file_url) && (
            <span className="text-purple-500 dark:text-purple-400 font-sans font-medium flex items-center">
              {t('card.hasMusic')}
            </span>
          )}
        </div>
      </div>

      {isOwner && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-red-500 rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
        >
          <Trash2 size={16} />
        </button>
      )}
    </Link>
  );
}
