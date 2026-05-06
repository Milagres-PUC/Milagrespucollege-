"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from '../login/login.module.css';
import Image from 'next/image';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const supabase = createClient();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'recovery',
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/reset-password');
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
          <h1 className={styles.title}>Verify OTP</h1>
          <p className={styles.subtitle}>Enter the 6-digit code sent to your email</p>
        </div>

        <form onSubmit={handleVerify} className={styles.form}>
          {error && <div className={styles.errorBadge}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="otp">OTP Code</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                id="otp"
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem' }}
              />
            </div>
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Verify & Continue'}
          </button>
        </form>

        <div className={styles.footer} style={{ marginTop: '2rem' }}>
          <p>Didn't receive the code? <Link href="/admin/forgot-password">Resend</Link></p>
          <Link href="/admin/login" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
