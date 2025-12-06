// src/components/Forms/AddCardForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Music as MusicIcon, Link as LinkIcon, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCards } from '../../hooks/useCards';
import { uploadImage, uploadAudio } from '../../lib/storage';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AddCardForm() {
  const { user } = useAuth();
  const { addCard, generateCardId } = useCards();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [musicType, setMusicType] = useState('none'); // 'none', 'url', 'file'
  const [musicUrl, setMusicUrl] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleMusicFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMusicFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!image) {
        throw new Error(t('addCard.errors.noImage'));
      }

      // Upload image
      const imageUrl = await uploadImage(image);

      // Upload music file if selected
      let musicFileUrl = null;
      if (musicType === 'file' && musicFile) {
        musicFileUrl = await uploadAudio(musicFile);
      }

      // Create card
      const cardData = {
        user_id: user.id,
        title,
        description,
        category: category || null,
        image_url: imageUrl,
        music_url: musicType === 'url' ? musicUrl : null,
        music_file_url: musicFileUrl,
        card_id: generateCardId(),
      };

      await addCard(cardData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper py-16 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <h1 className="text-4xl font-serif font-medium text-ink mb-3 tracking-tight">{t('addCard.pageTitle')}</h1>
          <p className="text-gray-600 mb-10 font-sans">{t('addCard.pageDesc')}</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                {t('addCard.labels.illustration')} *
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${imagePreview ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200 hover:border-purple-400'
                  }`}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 rounded-lg shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute -top-3 -right-3 p-1.5 bg-white text-gray-500 rounded-full shadow-md hover:text-red-600 border border-gray-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-400 mb-2">
                      <Upload size={32} />
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <span className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-purple-400 hover:text-purple-700 transition font-medium shadow-sm inline-block">
                          {t('addCard.buttons.upload')}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </label>
                      <p className="mt-3 text-sm text-gray-500 font-sans">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                {t('addCard.labels.title')} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-purple-500 focus:bg-white transition font-serif text-lg text-ink placeholder-gray-400"
                placeholder={t('addCard.placeholders.title')}
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                {t('addCard.labels.description')} *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-purple-500 focus:bg-white transition font-serif text-lg text-ink placeholder-gray-400 resize-none leading-relaxed"
                placeholder={t('addCard.placeholders.description')}
                required
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                {t('addCard.labels.category')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="categories"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-purple-500 focus:bg-white transition font-sans text-gray-700"
                  placeholder={t('addCard.placeholders.category')}
                />
                <datalist id="categories">
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Music Section */}
            <div className="pt-6 border-t border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-4 tracking-wide uppercase flex items-center">
                <Music size={18} className="mr-2 text-purple-600" />
                {t('addCard.labels.music')}
              </label>

              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setMusicType('none')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition text-sm ${musicType === 'none'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {t('addCard.buttons.noMusic')}
                </button>
                <button
                  type="button"
                  onClick={() => setMusicType('url')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition text-sm ${musicType === 'url'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {t('addCard.buttons.url')}
                </button>
                <button
                  type="button"
                  onClick={() => setMusicType('file')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition text-sm ${musicType === 'file'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {t('addCard.buttons.upload')}
                </button>
              </div>

              {musicType === 'url' && (
                <input
                  type="url"
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-0 focus:border-purple-500 transition font-sans"
                  placeholder={t('addCard.placeholders.musicUrl')}
                />
              )}

              {musicType === 'file' && (
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <input
                    type="file"
                    id="music-file"
                    accept="audio/*"
                    onChange={handleMusicFileChange}
                    className="hidden"
                  />
                  <label htmlFor="music-file" className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium flex flex-col items-center">
                    <MusicIcon size={24} className="mb-2 opacity-50" />
                    {musicFile ? musicFile.name : t('addCard.buttons.chooseFile')}
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-ink text-white rounded-xl hover:bg-gray-800 transition font-sans font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-8 tracking-wide transform active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  {t('addCard.buttons.submitting')}
                </span>
              ) : (
                t('addCard.buttons.submit')
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
