import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameForm from '../components/GameForm';
import { createGame, getGenres } from '../api/gameStoreApi';
import type { GameInput, Genre } from '../types';

export default function CreateGamePage() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load genres.')
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(value: GameInput) {
    setSubmitting(true);
    setError(null);
    try {
      const created = await createGame(value);
      navigate(`/games/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game.');
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Add Game</h1>
      </div>

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <div className="center">
          <span className="loader" />
        </div>
      ) : (
        <GameForm
          genres={genres}
          submitLabel="Create Game"
          submitting={submitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
        />
      )}
    </div>
  );
}
