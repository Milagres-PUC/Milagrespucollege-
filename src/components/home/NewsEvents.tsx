import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import styles from './NewsEvents.module.css';
import Image from 'next/image';

export default async function NewsEvents() {
  const supabase = createClient();

  // Fetch News
  const { data: newsData } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  // Fetch Events
  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(4);

  const news = newsData || [
    { title: 'Annual Sports Day 2026', content: 'Join us for a day of athletic excellence and team spirit.', image_url: null, id: '1' },
    { title: 'Science Exhibition', content: 'Exploring innovation through interactive student projects.', image_url: null, id: '2' },
    { title: 'Career Guidance Seminar', content: 'Expert speakers help students navigate their future career paths.', image_url: null, id: '3' },
  ];

  const events = eventsData || [
    { event_date: '15 MAY', title: 'Admissions Deadline', id: 'e1' },
    { event_date: '01 JUN', title: 'Orientation Program', id: 'e2' },
    { event_date: '05 JUN', title: 'Classes Commence', id: 'e3' },
    { event_date: '15 AUG', title: 'Independence Day Celebration', id: 'e4' },
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
            {news.map((item: any, index: number) => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.newsImg}>
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.title} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className={styles.placeholderImg}>
                      <span>News Image</span>
                    </div>
                  )}
                </div>
                <div className={styles.newsContent}>
                  <h4 className={styles.newsTitle}>{item.title}</h4>
                  <p className={styles.newsDesc}>{item.content}</p>
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
            {events.map((event: any) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <Calendar size={18} />
                  <span>{event.event_date}</span>
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
