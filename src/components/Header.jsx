'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaQrcode, FaUsers, FaUserPlus } from 'react-icons/fa';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>SESI</h1>
          <p>Controle de Vale-Lanche</p>
        </div>
        
        <nav className={styles.nav}>
          <Link 
            href="/" 
            className={pathname === '/' ? styles.activeLink : styles.link}
          >
            <FaQrcode />
            <span>Scanner</span>
          </Link>
          <Link 
            href="/alunos" 
            className={pathname === '/alunos' ? styles.activeLink : styles.link}
          >
            <FaUsers />
            <span>Alunos</span>
          </Link>
          <Link 
            href="/cadastro" 
            className={pathname === '/cadastro' ? styles.activeLink : styles.link}
          >
            <FaUserPlus />
            <span>Cadastro</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
