import { useState } from 'react';
import type { FormEvent } from 'react';
import type { GameInput, Genre } from '../types';

interface Props {
  genres: Genre[];
  initialValue?: GameInput;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (value: GameInput) => void;
  onCancel: () => void;
}

type Errors = Partial<Record<keyof GameInput, string>>;

const emptyForm: GameInput = {
  name: '',
  genreId: 0,
  price: 1,
  releaseDate: '',
};

function validate(value: GameInput): Errors {
  const errors: Errors = {};

  if (!value.name.trim()) {
    errors.name = 'Name is required.';
  } else if (value.name.length > 50) {
    errors.name = 'Name must be 50 characters or fewer.';
  }

  if (!value.genreId) {
    errors.genreId = 'Please choose a genre.';
  }

  if (Number.isNaN(value.price) || value.price < 1 || value.price > 100) {
    errors.price = 'Price must be between 1 and 100.';
  }

  if (!value.releaseDate) {
    errors.releaseDate = 'Release date is required.';
  }

  return errors;
}

export default function GameForm({
  genres,
  initialValue,
  submitLabel,
  submitting,
  onSubmit,
  onCancel,
}: Props) {
  const [value, setValue] = useState<GameInput>(initialValue ?? emptyForm);
  const [errors, setErrors] = useState<Errors>({});

  function update<K extends keyof GameInput>(key: K, fieldValue: GameInput[K]) {
    setValue((prev) => ({ ...prev, [key]: fieldValue }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(value);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ ...value, name: value.name.trim() });
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className={`input ${errors.name ? 'invalid' : ''}`}
          type="text"
          maxLength={50}
          value={value.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. The Legend of Wendy"
        />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="genreId">Genre</label>
        <select
          id="genreId"
          className={`select ${errors.genreId ? 'invalid' : ''}`}
          value={value.genreId}
          onChange={(e) => update('genreId', Number(e.target.value))}
        >
          <option value={0} disabled>
            Select a genre…
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        {errors.genreId && <div className="field-error">{errors.genreId}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price (1–100)</label>
        <input
          id="price"
          className={`input ${errors.price ? 'invalid' : ''}`}
          type="number"
          min={1}
          max={100}
          step="0.01"
          value={Number.isNaN(value.price) ? '' : value.price}
          onChange={(e) => update('price', e.target.valueAsNumber)}
        />
        {errors.price && <div className="field-error">{errors.price}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="releaseDate">Release date</label>
        <input
          id="releaseDate"
          className={`input ${errors.releaseDate ? 'invalid' : ''}`}
          type="date"
          value={value.releaseDate}
          onChange={(e) => update('releaseDate', e.target.value)}
        />
        {errors.releaseDate && <div className="field-error">{errors.releaseDate}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
