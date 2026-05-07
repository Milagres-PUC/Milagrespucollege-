import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from './layout.module.css';
import { headers } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = hasEnvVars ? createClient() : null;
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  
  const headersList = headers();
  const fullPath = headersList.get('x-pathname') || '';
  
  // Public admin routes
  const isPublicRoute = 
    fullPath.includes('/admin/login') || 
    fullPath.includes('/admin/forgot-password') || 
    fullPath.includes('/admin/verify-otp') || 
    fullPath.includes('/admin/reset-password');

  if (!user && !isPublicRoute) {
    redirect('/admin/login');
  }

  // If we are on a public route (like login) and already logged in, redirect to dashboard
  if (user && isPublicRoute) {
    redirect('/admin/dashboard');
  }

  // If it's a public route, don't show sidebar/header
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
