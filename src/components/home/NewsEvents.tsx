import Link from 'next/link';
import { Calendar } from 'lucide-react';
import styles from './NewsEvents.module.css';

export default function NewsEvents() {
  const news = [
    { title: 'Annual Sports Day 2026', desc: 'Join us for a day of athletic excellence and team spirit.', imgClass: styles.newsImg1 },
    { title: 'Science Exhibition', desc: 'Exploring innovation through interactive student projects.', imgClass: styles.newsImg2 },
    { title: 'Career Guidance Seminar', desc: 'Expert speakers help students navigate their future career paths.', imgClass: styles.newsImg3 },
  ];

  const events = [
    { date: '15 MAY', title: 'Admissions Deadline' },
    { date: '01 JUN', title: 'Orientation Program' },
    { date: '05 JUN', title: 'Classes Commence' },
    { date: '15 AUG', title: 'Independence Day Celebration' },
  ];

  return (
    <section className={styles.newsSection}>
      <div className={`container ${styles.newsContainer}`}>
        
        {/* Latest News */}
        <div className={styles.newsColumn}>
          <div className={styles.columnHeader}>
            <h3 className={styles.headerTitle}>LATEST NEWS</h3>
          </div>
          <div className={styles.newsList}>
            {news.map((item, index) => (
              <div key={index} className={styles.newsCard}>
                <div className={`${styles.newsImg} ${item.imgClass}`}>
                  <span>Photo {index + 1}</span>
                </div>
                <div className={styles.newsContent}>
                  <h4 className={styles.newsTitle}>{item.title}</h4>
                  <p className={styles.newsDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className={styles.eventsColumn}>
          <div className={styles.columnHeaderBlue}>
            <h3 className={styles.headerTitle}>UPCOMING EVENTS</h3>
          </div>
          <div className={styles.eventsList}>
            {events.map((event, index) => (
              <div key={index} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <Calendar size={18} />
                  <span>{event.date}</span>
                </div>
                <div className={styles.eventDetail}>
                  <h4>{event.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
