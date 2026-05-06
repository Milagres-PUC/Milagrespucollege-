import { createClient } from '@/utils/supabase/server';
import styles from './dashboard.module.css';
import { Users, Newspaper, Eye, TrendingUp, Activity } from 'lucide-react';

export default async function Dashboard() {
  const supabase = createClient();
  
  // Fetch some summary data (placeholder for now, you can connect to actual tables)
  // const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  // const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });

  const stats = [
    { label: 'Total Users', value: '124', icon: Users, color: '#4d7cfe', change: '+12% from last month' },
    { label: 'News Articles', value: '45', icon: Newspaper, color: '#ffbb00', change: '+5 new this week' },
    { label: 'Site Visits', value: '1,280', icon: Eye, color: '#00d284', change: '+18% increase' },
    { label: 'Active Sessions', value: '12', icon: Activity, color: '#ff4d4d', change: 'Currently online' },
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

      <div className={styles.contentGrid}>
        <div className={styles.recentActivity}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.activityList}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityAvatar}>
                  <Users size={16} />
                </div>
                <div className={styles.activityInfo}>
                  <p><strong>Admin</strong> updated a news article title.</p>
                  <span>2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quickLinks}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <button className={styles.actionCard}>
              <Newspaper size={20} />
              <span>Add News</span>
            </button>
            <button className={styles.actionCard}>
              <Users size={20} />
              <span>Manage Users</span>
            </button>
            <button className={styles.actionCard}>
              <Settings size={20} />
              <span>Site Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings({ size }: { size: number }) {
  return <TrendingUp size={size} />;
}
