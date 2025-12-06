// src/components/Cards/CardDetail.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCards } from '../../hooks/useCards';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import AudioPlayer from '../Music/AudioPlayer';

export default function CardDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cardId = searchParams.get('id');
  const { getCardById, deleteCard } = useCards();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!cardId) {
      setLoading(false);
      return;
    }

    const fetchCard = async () => {
      try {
        const data = await getCardById(cardId);
        setCard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteCard(card.id);
      // Force full page refresh to update card list
      window.location.href = '/';
    } catch (err) {
      alert('Failed to delete card: ' + err.message);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Check if current user owns this card
  const isOwner = user && card && String(user.id) === String(card.user_id);

  if (!cardId || (!loading && !card)) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-ink/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-sans">{t('detail.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-ink/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md shadow-xl border border-gray-100">
          <h2 className="text-2xl font-serif font-semibold text-red-600 mb-4">{t('detail.notFound')}</h2>
          <p className="text-gray-600 mb-6 font-sans">
            {t('detail.notFoundDesc')}
          </p>
          <Link
            to="/"
            className="block w-full py-3 bg-ink text-white rounded-lg hover:bg-gray-800 transition text-center font-sans font-medium"
          >
            {t('detail.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-ink/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={() => navigate('/')}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full my-8 shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={card.image_url}
            alt={card.title}
            className="w-full h-64 sm:h-96 object-cover"
          />
          <Link
            to="/"
            className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition text-ink"
          >
            <ArrowLeft size={24} />
          </Link>

          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="absolute top-4 right-4 p-2 bg-red-50/90 backdrop-blur rounded-full shadow-lg hover:bg-red-100 transition text-red-600 disabled:opacity-50"
              title="Delete card"
            >
              <Trash2 size={24} />
            </button>
          )}
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink tracking-tight leading-tight">{card.title}</h1>
            {card.category && (
              <span className="self-start px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-sans font-medium border border-purple-100 whitespace-nowrap">
                {card.category}
              </span>
            )}
          </div>

          <p className="text-gray-800 text-lg leading-relaxed mb-8 whitespace-pre-wrap font-serif">
            {card.description}
          </p>

          {(card.music_url || card.music_file_url) && (
            <div className="mb-8">
              <AudioPlayer
                musicUrl={card.music_url}
                musicFileUrl={card.music_file_url}
                title={card.title}
              />
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 font-mono flex justify-between items-center">
            <span>ID: {card.card_id}</span>
            <span>Reyhanlı Kartlar Collection</span>
          </div>
        </div>
      </div>

      {/* Custom Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-ink mb-3">Delete Card?</h3>
            <p className="text-gray-600 font-sans mb-6">
              Are you sure you want to delete this card? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-sans font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-sans font-medium disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
