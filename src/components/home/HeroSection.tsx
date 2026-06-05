import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image using Next/Image for optimization */}
      <div className={styles.bgWrapper}>
        <Image
          src="/hero-bg.jpg"
          alt="Milagres PU College Campus"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>
          MILAGRES<br />PRE-UNIVERSITY<br />COLLEGE
        </h1>
        <p className={styles.heroSubtitle}>Better Education for better world.</p>

        {/* URL will be added later by user as requested */}
        <Link href="#" className={`btn btn-primary ${styles.ctaBtn}`}>
          Admission Open
        </Link>
      </div>

      <div className={styles.scholarshipCards}>
        <div className={`${styles.card} ${styles.cardRed}`}>
          <h3>Scholarship Facility</h3>
          <p>For better education please go through with english</p>
        </div>
        <div className={`${styles.card} ${styles.cardBlue}`}>
          <h3>Scholarship Facility</h3>
          <p>For better education please go through with english</p>
        </div>
        <div className={`${styles.card} ${styles.cardYellow}`}>
          <h3>Scholarship Facility</h3>
          <p>For better education please go through with english</p>
        </div>
      </div>
    </section>
  );
}
