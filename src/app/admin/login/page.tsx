"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './login.module.css';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
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
          <h1 className={styles.title}>Admin Portal</h1>
          <p className={styles.subtitle}>Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
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

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
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
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.forgotPassword}>
            <a href="/admin/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Sign In'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Milagres PU College. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
