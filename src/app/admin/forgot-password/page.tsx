"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from '../login/login.module.css'; // Reuse login styles
import Image from 'next/image';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <Image
            src="/logo.jpg"
            alt="Milagres Logo"
            width={80}
            height={96}
            className={styles.logo}
          />
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your email to receive a reset link</p>
        </div>

        {!success ? (
          <form onSubmit={handleReset} className={styles.form}>
            {error && <div className={styles.errorBadge}>{error}</div>}
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={20} />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@milagres.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successBadge}>Check your email for the reset link!</div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
              We&apos;ve sent instructions to <strong>{email}</strong>
            </p>
            <p>Didn&apos;t receive the code? <Link href="/admin/forgot-password">Resend</Link></p>
          </div>
        )}

        <div className={styles.footer} style={{ marginTop: '2rem' }}>
          <Link href="/admin/login" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
