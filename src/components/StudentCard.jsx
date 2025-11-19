'use client';

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from './StudentCard.module.css';

export default function StudentCard({ student, onUseVoucher }) {
  return (
    <div className={styles.card}>
      <div className={styles.photoContainer}>
        {student.photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={student.photo} 
            alt={student.name}
            className={styles.photo}
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
      
      <div className={styles.info}>
        <h2 className={styles.name}>{student.name}</h2>
        <p className={styles.serie}>{student.serie}</p>
        
        <div className={styles.voucherStatus}>
          {student.hasVoucherToday ? (
            <>
              <FaCheckCircle className={styles.iconAvailable} />
              <span className={styles.available}>Vale-lanche disponível</span>
            </>
          ) : (
            <>
              <FaTimesCircle className={styles.iconUsed} />
              <span className={styles.used}>Vale-lanche já utilizado hoje</span>
            </>
          )}
        </div>
        
        {student.hasVoucherToday && onUseVoucher && (
          <button 
            className={styles.useButton}
            onClick={() => onUseVoucher(student.id)}
          >
            Usar Vale-Lanche
          </button>
        )}
      </div>
    </div>
  );
}
