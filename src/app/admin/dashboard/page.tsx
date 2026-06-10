import { createClient } from '@/utils/supabase/server';
import styles from './dashboard.module.css';
import { Users, Newspaper, Eye, TrendingUp, Activity } from 'lucide-react';

export default async function Dashboard() {
  const supabase = createClient();
  
  const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
  const { count: facultyCount } = await supabase.from('faculty').select('*', { count: 'exact', head: true });
  const { count: coursesCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });
  const { count: facilitiesCount } = await supabase.from('facilities').select('*', { count: 'exact', head: true });

  const stats = [
    { label: 'News Articles', value: newsCount || '0', icon: Newspaper, color: '#4d7cfe', change: 'Total published' },
    { label: 'Faculty Members', value: facultyCount || '0', icon: Users, color: '#ffbb00', change: 'Total listed' },
    { label: 'Courses Offered', value: coursesCount || '0', icon: Activity, color: '#00d284', change: 'Total streams' },
    { label: 'Facilities', value: facilitiesCount || '0', icon: Eye, color: '#ff4d4d', change: 'Total listed' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Overview</h1>
          <p className={styles.subtitle}>Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <button className={styles.refreshBtn}>
          <TrendingUp size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className={stat.change.includes('+') ? styles.positiveChange : styles.neutralChange}>
              {stat.change}
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>


    </div>
  );
}
