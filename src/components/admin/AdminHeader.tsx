"use client";

import { User } from '@supabase/supabase-js';
import styles from './AdminHeader.module.css';
import { Bell, Search, User as UserIcon, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminHeader({ user }: { user: User | null }) {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className={styles.headerActions}>
        <button className={styles.actionBtn}>
          <Bell size={20} />
          <span className={styles.notificationDot}></span>
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.email?.split('@')[0] || 'Admin'}</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
          <div className={styles.avatar}>
            <UserIcon size={20} />
          </div>
          
          <div className={styles.profileDropdown}>
            <button onClick={handleLogout} className={styles.logoutItem}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
