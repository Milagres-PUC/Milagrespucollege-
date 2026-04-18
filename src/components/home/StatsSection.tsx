import { Users, UserSquare2, Trophy, Building2 } from 'lucide-react';
import styles from './StatsSection.module.css';

export default function StatsSection() {
  const stats = [
    { icon: <Users size={48} />, count: '500+', label: 'Students' },
    { icon: <UserSquare2 size={48} />, count: '25+', label: 'Teachers' },
    { icon: <Trophy size={48} />, count: '10+', label: 'Awards' },
    { icon: <Building2 size={48} />, count: '4+', label: 'Institutions' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={`container ${styles.statsContainer}`}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.iconWrapper}>{stat.icon}</div>
            <h3 className={styles.statCount}>{stat.count}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
