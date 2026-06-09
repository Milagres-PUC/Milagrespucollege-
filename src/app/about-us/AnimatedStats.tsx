"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './about-us.module.css';

const stats = [
  { year: '1848', label: 'Year Founded' },
  { year: '175+', label: 'Years of Excellence' },
  { year: '10', label: 'Sections Offered' },
  { year: 'Co-Ed', label: 'Since 2011' },
];

export default function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div 
      className={styles.overviewStats}
      ref={containerRef}
    >
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={styles.statBox} 
          style={{ 
            opacity: isVisible ? 1 : 0, 
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: `opacity 0.7s ease-out ${i * 0.15}s, transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s`
          }}
        >
          <span className={styles.statYear}>{stat.year}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
