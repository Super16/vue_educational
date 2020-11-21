export default function declOfNum() {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [
    'товар',
    'товара',
    'товаров',
  ];
  return titles[
    (this.productsCount % 100 > 4 && this.productsCount % 100 < 20)
      ? 2 : cases[(this.productsCount % 10 < 5) ? this.productsCount % 10 : 5]
  ];
}
