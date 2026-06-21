import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteGame, getGames } from '../api/gameStoreApi';
import type { GameSummary } from '../types';

export default function GamesListPage() {
  const [games, setGames] = useState<GameSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<GameSummary | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setGames(await getGames());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load games.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteGame(pendingDelete.id);
      setGames((prev) => prev.filter((g) => g.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete game.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Games</h1>
        <Link to="/games/new" className="btn btn-primary">
          + Add Game
        </Link>
      </div>

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <div className="center">
          <span className="loader" />
        </div>
      ) : games.length === 0 ? (
        <div className="empty-state">
          <p>No games yet.</p>
          <Link to="/games/new" className="btn btn-primary">
            Add your first game
          </Link>
        </div>
      ) : (
        <div className="grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onDelete={setPendingDelete} />
          ))}
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete game?"
          message={`Are you sure you want to delete "${pendingDelete.name}"? This cannot be undone.`}
          confirmLabel="Delete"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
