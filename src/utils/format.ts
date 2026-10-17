export function formatPrice(price: number): string {
  if (price === 0) return 'Gratis';
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string): string {
  // El "T00:00:00" evita que la fecha se corra un día por la zona horaria
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-CR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}