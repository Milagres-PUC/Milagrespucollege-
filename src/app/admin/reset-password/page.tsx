"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from '../login/login.module.css';
import Image from 'next/image';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push('/admin/login');
      }, 3000);
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
          <h1 className={styles.title}>New Password</h1>
          <p className={styles.subtitle}>Set your new administrative password</p>
        </div>

        {!success ? (
          <form onSubmit={handleReset} className={styles.form}>
            {error && <div className={styles.errorBadge}>{error}</div>}
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">New Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={20} />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Update Password'}
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successBadge}>Password Updated Successfully!</div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
              Redirecting you to login page...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
