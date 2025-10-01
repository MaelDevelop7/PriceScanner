export async function fetchProduct(barcode: string) {
  const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
  const data = await res.json();
  if (data.status === 1) return data.product;
  else return null;
}
