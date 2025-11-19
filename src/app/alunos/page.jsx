'use client';

import { useState, useMemo } from 'react';
import { useStudents } from '@/contexts/StudentsContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import styles from './alunos.module.css';

export default function AlunosPage() {
  const { students, giveVoucherToAll, removeVoucherFromAll, deleteStudent, updateStudent } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, available, used

  // Calcular contagens de forma memorizada
  const counts = useMemo(() => ({
    total: students.length,
    available: students.filter(s => s.hasVoucherToday).length,
    used: students.filter(s => !s.hasVoucherToday).length
  }), [students]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'available' && student.hasVoucherToday) ||
                         (filterStatus === 'used' && !student.hasVoucherToday);
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (studentId, studentName) => {
    if (window.confirm(`Tem certeza que deseja excluir ${studentName}?`)) {
      deleteStudent(studentId);
    }
  };

  const toggleVoucher = (studentId, currentStatus) => {
    updateStudent(studentId, { hasVoucherToday: !currentStatus });
  };

  return (
    <ProtectedRoute>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
        <h1 className={styles.title}>Gerenciar Alunos</h1>
        
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar por nome, série ou QR Code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filters}>
            <button
              className={filterStatus === 'all' ? styles.activeFilter : styles.filter}
              onClick={() => setFilterStatus('all')}
            >
              Todos ({counts.total})
            </button>
            <button
              className={filterStatus === 'available' ? styles.activeFilter : styles.filter}
              onClick={() => setFilterStatus('available')}
            >
              Disponíveis ({counts.available})
            </button>
            <button
              className={filterStatus === 'used' ? styles.activeFilter : styles.filter}
              onClick={() => setFilterStatus('used')}
            >
              Utilizados ({counts.used})
            </button>
          </div>
          
          <div className={styles.bulkActions}>
            <button
              className={styles.giveAllButton}
              onClick={giveVoucherToAll}
            >
              Dar Vale a Todos
            </button>
            <button
              className={styles.removeAllButton}
              onClick={removeVoucherFromAll}
            >
              Remover Vale de Todos
            </button>
          </div>
        </div>
        
        {filteredStudents.length === 0 ? (
          <div className={styles.empty}>
            <p>Nenhum aluno encontrado.</p>
          </div>
        ) : (
          <div className={styles.studentsList}>
            {filteredStudents.map(student => (
              <div key={student.id} className={styles.studentCard}>
                <div className={styles.studentPhoto}>
                  {student.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={student.photo}
                      alt={student.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="' + styles.noPhoto + '">Sem Foto</div>';
                      }}
                    />
                  ) : (
                    <div className={styles.noPhoto}>Sem Foto</div>
                  )}
                </div>
                
                <div className={styles.studentInfo}>
                  <h3>{student.name}</h3>
                  <p className={styles.serie}>{student.serie}</p>
                  <p className={styles.qrCode}>QR: {student.qrCode}</p>
                </div>
                
                <div className={styles.studentActions}>
                  <button
                    className={student.hasVoucherToday ? styles.voucherAvailable : styles.voucherUsed}
                    onClick={() => toggleVoucher(student.id, student.hasVoucherToday)}
                    title={student.hasVoucherToday ? 'Marcar como utilizado' : 'Marcar como disponível'}
                  >
                    {student.hasVoucherToday ? (
                      <>
                        <FaCheckCircle />
                        <span>Disponível</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        <span>Utilizado</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(student.id, student.name)}
                    title="Excluir aluno"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
