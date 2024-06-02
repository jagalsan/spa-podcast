/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import styles from '@/styles/main-layout.module.scss';
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from 'react';
import { loadingService } from '@/services/loading.service';

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadingService.loading$.subscribe(res => {
      setIsLoading(res);
    })
  }, [])

  return (
    <html lang="es">
    <body className={`${styles.container} ${inter.className}`}>
      <header className={styles.header}>
        <Link href="/" passHref>
          <div className={styles.logo} role="button" tabIndex={0}>
            Podcaster
          </div>
        </Link>
        {isLoading && <span className={styles.loading}></span>}
      </header>
      <main className={styles.mainContent}>{children}</main>
    </body>
    </html>
  );
};

export default MainLayout;
