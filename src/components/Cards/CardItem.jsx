// src/components/Cards/CardItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Music } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCards } from '../../hooks/useCards';

export default function CardItem({ card }) {
  const { user } = useAuth();
  const { deleteCard } = useCards();
  const [deleting, setDeleting] = useState(false);

  const isOwner = user?.id === card.user_id;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this card?')) return;

    setDeleting(true);
    try {
      await deleteCard(card.id);
    } catch (err) {
      alert('Error deleting card: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Link
      to={`/?id=${card.card_id}`}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={card.image_url}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
          {card.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {card.description}
        </p>

        {card.category && (
          <span className="inline-block px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">
            {card.category}
          </span>
        )}

        {(card.music_url || card.music_file_url) && (
          <div className="mt-2 flex items-center text-pink-500 text-sm">
            <Music size={16} className="mr-1" />
            <span>Has music</span>
          </div>
        )}
      </div>

      {isOwner && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="absolute bottom-3 right-3 px-2 py-1 bg-gray-900 bg-opacity-75 text-white text-xs rounded">
        ID: {card.card_id}
      </div>
    </Link>
  );
}
