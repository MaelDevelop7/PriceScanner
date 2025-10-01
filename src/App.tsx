import { useState } from "react";
import Scanner from "./components/Scanner";
import { fetchProduct } from "./api/product";

type Product = {
  product_name?: string;
  brands?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    [key: string]: any;
  };
  [key: string]: any;
};

export default function App() {
  const [scannedCode, setScannedCode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (code: string) => {
    setScannedCode(code);
    setLoading(true);
    const result = await fetchProduct(code);
    setProduct(result);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1>Price Scanner</h1>

      {/* Scanner */}
      <Scanner onScan={handleScan} />

      {/* Affichage du code scanné */}
      {scannedCode && (
        <div style={{ marginTop: 20 }}>
          <strong>Code scanné :</strong> {scannedCode}
        </div>
      )}

      {/* Affichage produit */}
      {loading && <p>Recherche du produit...</p>}
      {!loading && product && (
        <div style={{ marginTop: 20 }}>
          <h2>{product.product_name || "Nom inconnu"}</h2>
          <p><strong>Marque :</strong> {product.brands || "Inconnue"}</p>
          {product.nutriments?.["energy-kcal_100g"] && (
            <p><strong>Calories :</strong> {product.nutriments["energy-kcal_100g"]} kcal / 100g</p>
          )}
        </div>
      )}

      {!loading && scannedCode && !product && (
        <p>Produit non trouvé</p>
      )}
    </div>
  );
}
