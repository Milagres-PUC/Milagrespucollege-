"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from './layout.module.css';

export default function AdminClientWrapper({ 
  children, 
  user 
}: { 
  children: React.ReactNode;
  user: any;
}) {
  const pathname = usePathname() || '';
  
  const isPublicRoute = 
    pathname.includes('/admin/login') || 
    pathname.includes('/admin/forgot-password') || 
    pathname.includes('/admin/verify-otp') || 
    pathname.includes('/admin/reset-password');

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <AdminHeader user={user} />
        <main className={styles.pageBody}>
          {children}
        </main>
      </div>
    </div>
  );
}
