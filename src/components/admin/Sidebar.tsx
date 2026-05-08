"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  School,
  FileText
} from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const supabase = createClient();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Announcements', icon: School, path: '/admin/announcements' },
    { name: 'News & Updates', icon: Newspaper, path: '/admin/news' },
    { name: 'Events', icon: Newspaper, path: '/admin/events' },
    { name: 'Academic Excellence', icon: School, path: '/admin/excellence' },
    { name: 'Faculty', icon: Users, path: '/admin/faculty' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Prospectus', icon: FileText, path: '/admin/prospectus' },
    { name: 'User Inquiries', icon: Users, path: '/admin/inquiries' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        {!isCollapsed && (
          <div className={styles.logo}>
            <School size={24} color="var(--primary-yellow)" />
            <span>Milagres Admin</span>
          </div>
        )}
        <button 
          className={styles.toggleBtn} 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
          >
            <item.icon size={22} className={styles.icon} />
            {!isCollapsed && <span>{item.name}</span>}
            {isCollapsed && <div className={styles.tooltip}>{item.name}</div>}
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={22} className={styles.icon} />
          {!isCollapsed && <span>Logout</span>}
          {isCollapsed && <div className={styles.tooltip}>Logout</div>}
        </button>
      </div>
    </aside>
  );
}
