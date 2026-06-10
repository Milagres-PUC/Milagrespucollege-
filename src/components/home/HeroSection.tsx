import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function HeroSection() {
  const supabase = createClient();

  const { data: settings } = await supabase.from('global_settings').select('*').eq('id', 1).single();
  const admissionLink = settings?.admission_form_link || '#';

  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <section className={styles.heroSection}>
      {/* Background Image using Next/Image for optimization */}
      <div className={styles.bgWrapper}>
        <Image
          src="/hero-bg.jpg"
          alt="Milagres PU College Campus"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className={styles.overlay}></div>
      </div>



      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>
          CREATE<br />BRIGHT FUTURES<br />TODAY
        </h1>
        <p className={styles.heroSubtitle}>Better Education for better world</p>

        <Link href={admissionLink} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.ctaBtn}`}>
          Admission Form
        </Link>
      </div>

      <div className={styles.scholarshipCards}>
        <div className={`${styles.card} ${styles.cardRed}`}>
          <h3>Scholarship Facility</h3>
          <p>For better education please go through with english</p>
        </div>
        <div className={`${styles.card} ${styles.cardBlue}`}>
          <h3>Mentorship & Support</h3>
          <p>Comprehensive guidance for holistic student development</p>
        </div>
        <div className={`${styles.card} ${styles.cardYellow}`}>
          <h3>Quality Infrastructure</h3>
          <p>Modern classrooms and facilities to foster effective learning</p>
        </div>
      </div>
    </section>
  );
}
