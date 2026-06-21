export function formatPrice(price: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDate(isoDate: string): string {
  if (!isoDate) return '—';
  // Parse as a plain date (no timezone shifting) since the API uses DateOnly.
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
