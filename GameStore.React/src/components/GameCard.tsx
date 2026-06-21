import { Link } from 'react-router-dom';
import type { GameSummary } from '../types';
import { formatDate, formatPrice } from '../utils/format';

interface Props {
  game: GameSummary;
  onDelete: (game: GameSummary) => void;
}

export default function GameCard({ game, onDelete }: Props) {
  return (
    <article className="card">
      <h2 className="card-title">{game.name}</h2>
      <div className="card-meta">
        <span>
          <span className="badge">{game.genre}</span>
        </span>
        <span className="price">{formatPrice(game.price)}</span>
        <span>Released {formatDate(game.releaseDate)}</span>
      </div>
      <div className="card-actions">
        <Link to={`/games/${game.id}`} className="btn btn-sm">
          View
        </Link>
        <Link to={`/games/${game.id}/edit`} className="btn btn-sm">
          Edit
        </Link>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(game)}>
          Delete
        </button>
      </div>
    </article>
  );
}
