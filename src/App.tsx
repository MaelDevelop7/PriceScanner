import { useState } from "react";
import Scanner from "./components/Scanner"; // Assure-toi que Scanner.tsx est dans le même dossier ou ajuste le path

export default function App() {
  const [scannedCode, setScannedCode] = useState("");

  const handleScan = (code: string) => {
    setScannedCode(code);
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      <h1>Price Scanner</h1>

      {/* Scanner Component */}
      <Scanner onScan={handleScan} />

      {/* Affichage du code scanné */}
      {scannedCode && (
        <div style={{ marginTop: 20 }}>
          <strong>Code scanné :</strong> {scannedCode}
        </div>
      )}
    </div>
  );
}
