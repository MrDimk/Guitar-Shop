export function formatPrice(price: number): string {
  const formattedPrice = price.toLocaleString('ru-RU');
  return `${formattedPrice} ₽`;
}
