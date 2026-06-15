import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import AdminClientWrapper from './AdminClientWrapper';
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

  if (!user && !isPublicRoute && fullPath !== '') {
    redirect('/admin/login');
  }

  // If we are on a public route (like login) and already logged in, redirect to dashboard
  if (user && isPublicRoute && fullPath !== '') {
    redirect('/admin/dashboard');
  }

  return (
    <AdminClientWrapper user={user}>
      {children}
    </AdminClientWrapper>
  );
}
