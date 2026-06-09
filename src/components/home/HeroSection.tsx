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
          CREATE<br />BRIGHT FUTURES<br />TODAY
        </h1>
        <p className={styles.heroSubtitle}>Better Education for better world</p>

        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdTwoN8ynyn7jfw2vXhzU3fWuWQNXiJmHYWJZIpr4TBgVcnmw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.ctaBtn}`}>
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
