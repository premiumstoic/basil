// src/components/Cards/CardGrid.jsx
import { useCards } from '../../hooks/useCards';
import CardItem from './CardItem';

export default function CardGrid() {
  const { cards, loading, error } = useCards();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading cards: {error}</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🌸</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No cards yet</h2>
          <p className="text-gray-600">Be the first to add a cultural card!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Cultural Cards Collection
          </h1>
          <p className="text-gray-600">
            Discover moments of culture, one card at a time
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
