'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import QRScanner from '@/components/QRScanner';
import StudentCard from '@/components/StudentCard';
import { useStudents } from '@/contexts/StudentsContext';
import styles from './scanner.module.css';

export default function Home() {
  const studentsContext = useStudents();
  const [scannedStudent, setScannedStudent] = useState(null);
  const [error, setError] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (qrCode) => {
    const student = studentsContext.findStudentByQRCode(qrCode);
    
    if (student) {
      setScannedStudent(student);
      setError('');
      setShowScanner(false);
    } else {
      setError('Aluno não encontrado. Verifique se o QR Code está correto.');
      setScannedStudent(null);
    }
  };

  const handleUseVoucher = (studentId) => {
    studentsContext.useVoucher(studentId);
    setScannedStudent(null);
    setShowScanner(true);
  };

  const handleNewScan = () => {
    setScannedStudent(null);
    setError('');
    setShowScanner(true);
  };

  const handleStopScanner = () => {
    setShowScanner(false);
    setScannedStudent(null);
    setError('');
  };

  return (
    <ProtectedRoute>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
        <h1 className={styles.title}>Scanner de Vale-Lanche</h1>
        
        {!showScanner && !scannedStudent && (
          <button onClick={() => setShowScanner(true)} className={styles.startButton}>
            Iniciar Scanner
          </button>
        )}
        
        {showScanner && !scannedStudent && (
          <div className={styles.scannerWrapper}>
            <QRScanner 
              onScan={handleScan}
              onError={setError}
              onStop={handleStopScanner}
            />
          </div>
        )}
        
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={handleNewScan} className={styles.retryButton}>
              Tentar Novamente
            </button>
          </div>
        )}
        
        {scannedStudent && (
          <div className={styles.resultWrapper}>
            <StudentCard 
              student={scannedStudent}
              onUseVoucher={handleUseVoucher}
            />
            <button onClick={handleNewScan} className={styles.newScanButton}>
              Escanear Outro Crachá
            </button>
          </div>
        )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
