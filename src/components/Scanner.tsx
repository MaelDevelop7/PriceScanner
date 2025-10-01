import { useState } from "react";
import { Capacitor } from "@capacitor/core";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
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
      if (Capacitor.getPlatform() === "ios" || Capacitor.getPlatform() === "android") {
        // Mobile : plugin communautaire Capacitor
        // Demande la permission si nécessaire
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          const result = await BarcodeScanner.startScan();
          if (result.hasContent) onScan(result.content);
        } else {
          alert("Permission caméra refusée");
        }
      } else {
        // Web : ZXing
        const codeReader = new BrowserMultiFormatReader();
        const devices = await codeReader.listVideoInputDevices();
        if (devices.length === 0) {
          alert("Aucune caméra détectée");
          setScanning(false);
          return;
        }
        const result = await codeReader.decodeOnceFromVideoDevice(devices[0].deviceId, "video");
        if (result) onScan(result.getText());
      }
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
      {/* Saisie manuelle */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Entrez le code-barres"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleManual}>Rechercher</button>
      </div>

      {/* Bouton scanner */}
      <button onClick={scanBarcode} disabled={scanning}>
        {scanning ? "Scanning..." : "Scanner avec la caméra"}
      </button>

      {/* Vidéo pour web */}
      {Capacitor.getPlatform() !== "ios" && Capacitor.getPlatform() !== "android" && (
        <video id="video" style={{ width: "100%", marginTop: 8 }} />
      )}
    </div>
  );
}
