// src/hooks/useCards.js
import { useState, useEffect } from 'react';
import { query } from '../lib/neon';

export const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const result = await query(
        'SELECT * FROM cards ORDER BY created_at DESC'
      );
      setCards(result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const getCardById = async (cardId) => {
    const result = await query(
      'SELECT * FROM cards WHERE card_id = $1 LIMIT 1',
      [cardId]
    );
    
    if (!result || result.length === 0) {
      throw new Error('Card not found');
    }
    
    return result[0];
  };

  const addCard = async (cardData) => {
    // Validate that user_id is provided
    if (!cardData.user_id) {
      throw new Error('User ID is required to create a card. Please log in again.');
    }
    
    const result = await query(
      `INSERT INTO cards (user_id, title, description, category, image_url, music_url, music_file_url, card_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
      [
        cardData.user_id,
        cardData.title,
        cardData.description,
        cardData.category,
        cardData.image_url,
        cardData.music_url,
        cardData.music_file_url,
        cardData.card_id,
      ]
    );

    if (!result || result.length === 0) {
      throw new Error('Failed to create card');
    }

    return result[0];
  };

  const deleteCard = async (id) => {
    await query('DELETE FROM cards WHERE id = $1', [id]);
  };

  const generateCardId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return {
    cards,
    loading,
    error,
    getCardById,
    addCard,
    deleteCard,
    generateCardId,
    refetch: fetchCards,
  };
};
