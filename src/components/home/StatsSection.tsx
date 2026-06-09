"use client";

import { useEffect, useRef, useState } from 'react';
import { Users, UserSquare2, Trophy, Building2 } from 'lucide-react';
import styles from './StatsSection.module.css';

function AnimatedNumber({ target, suffix }: { target: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOut * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  return <h3 className={styles.statCount} ref={ref}>{count}{suffix}</h3>;
}

export default function StatsSection() {
  const stats = [
    { icon: <Users size={48} />, target: 500, suffix: '+', label: 'Students' },
    { icon: <UserSquare2 size={48} />, target: 25, suffix: '+', label: 'Teachers' },
    { icon: <Trophy size={48} />, target: 10, suffix: '+', label: 'Awards' },
    { icon: <Building2 size={48} />, target: 4, suffix: '+', label: 'Institutions' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={`container ${styles.statsContainer}`}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.iconWrapper}>{stat.icon}</div>
            <AnimatedNumber target={stat.target} suffix={stat.suffix} />
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
