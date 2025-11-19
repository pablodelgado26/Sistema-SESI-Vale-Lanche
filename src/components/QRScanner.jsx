'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import styles from './QRScanner.module.css';

export default function QRScanner({ onScan, onError, onStop }) {
  const html5QrCodeRef = useRef(null);
  const isMountedRef = useRef(true);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let html5QrCode = null;
    isMountedRef.current = true;

    const startScanner = async () => {
      // Evita inicialização duplicada
      if (isInitialized || !isMountedRef.current) return;
      
      try {
        html5QrCode = new Html5Qrcode('qr-reader');
        html5QrCodeRef.current = html5QrCode;
        
        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            if (isMountedRef.current) {
              onScan(decodedText);
            }
          },
          (errorMessage) => {
            // Ignora erros de leitura contínua
          }
        );
        
        if (isMountedRef.current) {
          setIsScanning(true);
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Erro ao iniciar scanner:', err);
        if (onError && isMountedRef.current) {
          onError('Erro ao acessar a câmera. Verifique as permissões.');
        }
      }
    };

    startScanner();

    return () => {
      isMountedRef.current = false;
      const qrCode = html5QrCodeRef.current;
      
      if (qrCode) {
        // Verifica se está realmente rodando antes de parar
        try {
          const state = qrCode.getState();
          if (state === 2) { // Estado 2 = SCANNING
            qrCode.stop()
              .then(() => {
                html5QrCodeRef.current = null;
              })
              .catch((err) => {
                console.debug('Scanner cleanup:', err.message);
              });
          } else {
            html5QrCodeRef.current = null;
          }
        } catch (err) {
          // Se houver erro ao verificar estado, tenta parar mesmo assim
          qrCode.stop()
            .then(() => {
              html5QrCodeRef.current = null;
            })
            .catch(() => {
              html5QrCodeRef.current = null;
            });
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStopScanner = async () => {
    const html5QrCode = html5QrCodeRef.current;
    if (html5QrCode && isScanning && isMountedRef.current) {
      try {
        // Verifica se o scanner realmente está rodando antes de parar
        if (html5QrCode.getState() === 2) { // Estado 2 = SCANNING
          await html5QrCode.stop();
        }
        html5QrCodeRef.current = null;
        if (isMountedRef.current) {
          setIsScanning(false);
          if (onStop) {
            onStop();
          }
        }
      } catch (err) {
        // Ignora silenciosamente erros de parada
        console.debug('Scanner já estava parado:', err.message);
        if (isMountedRef.current) {
          setIsScanning(false);
          if (onStop) {
            onStop();
          }
        }
      }
    }
  };

  return (
    <div className={styles.scannerContainer}>
      <div id="qr-reader" className={styles.qrReader}></div>
      <p className={styles.instruction}>Aponte a câmera para o QR Code do crachá</p>
      {isScanning && (
        <button onClick={handleStopScanner} className={styles.stopButton}>
          Parar Câmera
        </button>
      )}
    </div>
  );
}
