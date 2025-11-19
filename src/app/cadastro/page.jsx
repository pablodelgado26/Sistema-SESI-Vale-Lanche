'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudents } from '@/contexts/StudentsContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import { FaCamera, FaQrcode } from 'react-icons/fa';
import QRScanner from '@/components/QRScanner';
import styles from './cadastro.module.css';

export default function CadastroPage() {
  const router = useRouter();
  const { addStudent, isQRCodeUnique } = useStudents();
  const [formData, setFormData] = useState({
    name: '',
    serie: '',
    qrCode: '',
    photo: ''
  });
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scannerError, setScannerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamanho do arquivo (máximo 1MB)
      if (file.size > 1024 * 1024) {
        alert('Foto muito grande! Tamanho máximo: 1MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.onerror = () => {
        alert('Erro ao carregar foto');
        setPreviewPhoto('');
        setFormData(prev => ({
          ...prev,
          photo: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRScan = (qrCode) => {
    // Verifica se o QR Code é único
    if (!isQRCodeUnique(qrCode)) {
      setScannerError('Este QR Code já está cadastrado para outro aluno!');
      setTimeout(() => setScannerError(''), 3000);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      qrCode: qrCode
    }));
    setShowScanner(false);
    setScannerError('');
  };

  const handleScannerError = (error) => {
    setScannerError(error);
  };

  const handleStopScanner = () => {
    setShowScanner(false);
    setScannerError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.serie || !formData.qrCode) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validação final de unicidade
    if (!isQRCodeUnique(formData.qrCode)) {
      alert('Este QR Code já está cadastrado para outro aluno!');
      return;
    }

    addStudent(formData);
    
    alert('Aluno cadastrado com sucesso!');
    
    // Limpar formulário
    setFormData({
      name: '',
      serie: '',
      qrCode: '',
      photo: ''
    });
    setPreviewPhoto('');
    
    // Redirecionar para a página de alunos
    router.push('/alunos');
  };

  return (
    <ProtectedRoute>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Cadastrar Novo Aluno</h1>
        
        {showScanner ? (
          <div className={styles.scannerSection}>
            <h2 className={styles.scannerTitle}>Escaneie o QR Code do Crachá</h2>
            {scannerError && (
              <div className={styles.scannerError}>
                {scannerError}
              </div>
            )}
            <QRScanner 
              onScan={handleQRScan}
              onError={handleScannerError}
              onStop={handleStopScanner}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.photoSection}>
              <div className={styles.photoPreview}>
                {previewPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={previewPhoto} 
                    alt="Preview"
                    onError={(e) => {
                      setPreviewPhoto('');
                    }}
                  />
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <FaCamera />
                    <span>Foto do Aluno</span>
                  </div>
                )}
              </div>
              <label className={styles.photoButton}>
                <FaCamera />
                Selecionar Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Digite o nome completo do aluno"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="serie">Série *</label>
              <select
                id="serie"
                name="serie"
                value={formData.serie}
                onChange={handleChange}
                required
              >
                <option value="">Selecione a série</option>
                <optgroup label="Ensino Fundamental I">
                  <option value="1º Ano A">1º Ano A</option>
                  <option value="1º Ano B">1º Ano B</option>
                  <option value="1º Ano C">1º Ano C</option>
                  <option value="1º Ano D">1º Ano D</option>
                  <option value="2º Ano A">2º Ano A</option>
                  <option value="2º Ano B">2º Ano B</option>
                  <option value="2º Ano C">2º Ano C</option>
                  <option value="2º Ano D">2º Ano D</option>
                  <option value="3º Ano A">3º Ano A</option>
                  <option value="3º Ano B">3º Ano B</option>
                  <option value="3º Ano C">3º Ano C</option>
                  <option value="3º Ano D">3º Ano D</option>
                  <option value="4º Ano A">4º Ano A</option>
                  <option value="4º Ano B">4º Ano B</option>
                  <option value="4º Ano C">4º Ano C</option>
                  <option value="4º Ano D">4º Ano D</option>
                  <option value="5º Ano A">5º Ano A</option>
                  <option value="5º Ano B">5º Ano B</option>
                  <option value="5º Ano C">5º Ano C</option>
                  <option value="5º Ano D">5º Ano D</option>
                </optgroup>
                <optgroup label="Ensino Fundamental II">
                  <option value="6º Ano A">6º Ano A</option>
                  <option value="6º Ano B">6º Ano B</option>
                  <option value="6º Ano C">6º Ano C</option>
                  <option value="6º Ano D">6º Ano D</option>
                  <option value="7º Ano A">7º Ano A</option>
                  <option value="7º Ano B">7º Ano B</option>
                  <option value="7º Ano C">7º Ano C</option>
                  <option value="7º Ano D">7º Ano D</option>
                  <option value="8º Ano A">8º Ano A</option>
                  <option value="8º Ano B">8º Ano B</option>
                  <option value="8º Ano C">8º Ano C</option>
                  <option value="8º Ano D">8º Ano D</option>
                  <option value="9º Ano A">9º Ano A</option>
                  <option value="9º Ano B">9º Ano B</option>
                  <option value="9º Ano C">9º Ano C</option>
                  <option value="9º Ano D">9º Ano D</option>
                </optgroup>
                <optgroup label="Ensino Médio">
                  <option value="1º Ano EM A">1º Ano EM A</option>
                  <option value="1º Ano EM B">1º Ano EM B</option>
                  <option value="1º Ano EM C">1º Ano EM C</option>
                  <option value="1º Ano EM D">1º Ano EM D</option>
                  <option value="2º Ano EM A">2º Ano EM A</option>
                  <option value="2º Ano EM B">2º Ano EM B</option>
                  <option value="2º Ano EM C">2º Ano EM C</option>
                  <option value="2º Ano EM D">2º Ano EM D</option>
                  <option value="3º Ano EM A">3º Ano EM A</option>
                  <option value="3º Ano EM B">3º Ano EM B</option>
                  <option value="3º Ano EM C">3º Ano EM C</option>
                  <option value="3º Ano EM D">3º Ano EM D</option>
                </optgroup>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="qrCode">Código QR do Crachá *</label>
              <div className={styles.qrCodeInput}>
                <input
                  type="text"
                  id="qrCode"
                  name="qrCode"
                  value={formData.qrCode}
                  onChange={handleChange}
                  required
                  placeholder=""
                  readOnly={formData.qrCode !== ''}
                />
                <button 
                  type="button" 
                  className={styles.scanButton}
                  onClick={() => setShowScanner(true)}
                >
                  <FaQrcode />
                  Escanear
                </button>
              </div>
              <small>Escaneie o QR Code do crachá ou digite manualmente</small>
            </div>
            
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Cadastrar Aluno
              </button>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => router.push('/alunos')}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
