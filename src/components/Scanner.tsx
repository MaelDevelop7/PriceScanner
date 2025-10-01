import { useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

type ScannerProps = {
  onScan: (code: string) => void;
};

export default function Scanner({ onScan }: ScannerProps) {
  const [code, setCode] = useState("");
  const [scanning, setScanning] = useState(false);

  const scanBarcode = async () => {
    setScanning(true);
    try {
      // Web + Mobile (via caméra HTML5)
      const codeReader = new BrowserMultiFormatReader();
      const devices = await codeReader.listVideoInputDevices();
      if (devices.length === 0) {
        alert("Aucune caméra détectée");
        setScanning(false);
        return;
      }
      const result = await codeReader.decodeOnceFromVideoDevice(devices[0].deviceId, "video");
      if (result) onScan(result.getText());
    } catch (err) {
      console.error(err);
    }
    setScanning(false);
  };

  const handleManual = () => {
    if (code) onScan(code);
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Entrez le code-barres"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleManual}>Rechercher</button>
      </div>

      <button onClick={scanBarcode} disabled={scanning}>
        {scanning ? "Scanning..." : "Scanner avec la caméra"}
      </button>

      <video id="video" style={{ width: "100%", marginTop: 8 }} />
    </div>
  );
}
