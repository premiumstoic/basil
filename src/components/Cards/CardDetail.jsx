// src/components/Cards/CardDetail.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Download, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
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

  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (cardId) {
      // Use the current origin or fallback for SSR/port issues if needed, but window.location.origin is standard
      const url = `${window.location.origin}/?id=${cardId}`;
      QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('Error generating QR code:', err));
    }
  }, [cardId]);

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `reyhanli-card-${cardId}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className="fixed inset-0 bg-ink/20 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-sans">{t('detail.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-ink/20 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-serif font-semibold text-red-600 dark:text-red-400 mb-4">{t('detail.notFound')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-sans">
            {t('detail.notFoundDesc')}
          </p>
          <Link
            to="/"
            className="block w-full py-3 bg-ink dark:bg-ink-dark text-white dark:text-ink rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition text-center font-sans font-medium"
          >
            {t('detail.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/30 backdrop-blur-sm"
      onClick={() => navigate('/')}
    >
      <div
        className="min-h-screen flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section - Full viewport height (minus some safe padding) */}
        <div className="relative flex-shrink-0 h-[85vh] sm:h-[80vh]">
          <img
            src={card.image_url}
            alt={card.title}
            className="w-full h-full object-contain bg-black/90"
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

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-sans flex flex-col items-center animate-bounce">
            <span>{t('detail.scrollForDetails')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Details Section - White card below */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl -mt-4 relative z-10 shadow-2xl border-t border-gray-100 dark:border-gray-700">

          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink tracking-tight leading-tight">{card.title}</h1>
              {card.category && (
                <span className="self-start px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-sans font-medium border border-purple-100 whitespace-nowrap">
                  {card.category}
                </span>
              )}
            </div>

            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-8 whitespace-pre-wrap font-serif">
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

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-6">

              {/* QR Code Section */}
              {qrCodeUrl && (
                <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-4 text-ink dark:text-ink-dark font-serif font-bold">
                    <QrCode size={20} className="text-purple-600 dark:text-purple-400" />
                    <h3>{t('detail.share')}</h3>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-4">
                    <img
                      src={qrCodeUrl}
                      alt="Card QR Code"
                      className="w-32 h-32 sm:w-40 sm:h-40"
                    />
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans mb-4 text-center max-w-xs">
                    {t('detail.scanToView')}
                  </p>

                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 text-ink dark:text-ink-dark rounded-lg transition text-sm font-medium shadow-sm hover:shadow"
                  >
                    <Download size={16} />
                    {t('detail.downloadQr')}
                  </button>
                </div>
              )}

              <div className="text-xs text-gray-400 font-mono flex justify-between items-center">
                <span>ID: {card.card_id}</span>
                <span>Reyhan's Collection</span>
              </div>
            </div>
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-ink dark:text-ink-dark mb-3">Delete Card?</h3>
            <p className="text-gray-600 dark:text-gray-400 font-sans mb-6">
              Are you sure you want to delete this card? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-sans font-medium disabled:opacity-50"
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
