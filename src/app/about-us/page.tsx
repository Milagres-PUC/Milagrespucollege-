import { Metadata } from 'next';
import styles from './about-us.module.css';
import AnimatedStats from './AnimatedStats';

export const metadata: Metadata = {
  title: 'About Us | Milagres PU College',
  description:
    'Learn about the history, vision, mission, and infrastructure of Milagres PU College — a legacy of excellence since 1848.',
};

export default function AboutUsPage() {
  const milestones = [
    { year: '1848', event: 'Establishment of the institution by Bishop Rt. Rev. Bernardin, entrusted to Mr. John Edward Fitzgerald and Monsieur Dupret.' },
    { year: '1929', event: 'Director of Public Instruction, Madras, granted permanent recognition as an independent Secondary Institution (Classes I–V) on 23rd July.' },
    { year: '1944', event: 'Sir Mervelar Stetham permitted the opening of High School classes on 3rd April.' },
    { year: '1954', event: 'Permanent recognition accorded to the High School on 5th August.' },
    { year: '1982', event: 'Government of Karnataka upgraded the High School to a Pre-University College with a Commerce course on 5th July.' },
    { year: '1999', event: 'Introduction of the Science stream, expanding academic offerings.' },
    { year: '2011', event: 'Admission of girls, making Milagres a fully co-educational institution.' },
  ];

  const missionPoints = [
    'Develop young students with creative and active minds.',
    'Offer suitable opportunities to face future challenges.',
    'Instill a sense of understanding and compassion for others.',
    'Create a love for the environment and natural world.',
    'Instill patriotic values and a sense of civic responsibility.',
  ];



  return (
    <>
      {/* Page Hero Banner */}
      <section className={styles.pageBanner}>
        <div className={`container ${styles.bannerContent}`}>
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.breadcrumb}>Home &rsaquo; About Us</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.section} id="overview">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.sectionLabel}>Our Story</div>
          <h2 className={styles.sectionHeading}>Overview</h2>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <p>
                Milagres Educational Institution was founded in <strong>1848</strong> by Bishop Rt. Rev.
                Bernardin and was entrusted to the care of Mr. John Edward Fitzgerald, an Irishman, and
                Monsieur Dupret, a Frenchman. Initially established as a Primary English School, classes
                were gradually added over time.
              </p>
              <p>
                The Director of Public Instruction, Madras, granted permanent recognition to the school on
                <strong> 23rd July 1929</strong> as an independent Secondary Institution with classes I
                to V. Sir Mervelar Stetham, the then Director of Public Instruction, Madras, permitted
                the opening of High School classes on <strong>3rd April 1944</strong>, with permanent
                recognition accorded on <strong>5th August 1954</strong>.
              </p>
              <p>
                The Government of Karnataka upgraded the High School into a Pre-University College with a
                Commerce course on <strong>5th July 1982</strong>, and the Science section was introduced
                in <strong>1999</strong>. In <strong>2011</strong>, girls were admitted, making Milagres a
                co-educational institution.
              </p>
              <p>
                Milagres Pre-University College, Mangalore, is a <strong>Christian Religious Minority
                Institution</strong> run by the Catholic Board of Education of the Diocese of Mangalore and
                is locally managed by Milagres Church, Mangalore. The institution imparts education to all
                without distinction of caste and creed. Currently, the college offers ten sections
                comprising <strong>HEBA, EBAC, and EBAS</strong> in Commerce, and{' '}
                <strong>PCMB and PCMC</strong> in Science.
              </p>
            </div>
            <AnimatedStats />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={`${styles.section} ${styles.vmSection}`} id="vision-mission">
        <div className="container">
          <div className={styles.vmGrid}>

            {/* Vision */}
            <div className={styles.vmCard} id="vision">
              <div className={styles.vmIconWrapper}>
                <span className={styles.vmIcon}>👁️</span>
              </div>
              <h2 className={styles.vmTitle}>Vision</h2>
              <p className={styles.vmText}>
                Our college strives to develop young students with active and creative minds, offering them
                suitable opportunities to face future challenges. We aim for the <strong>holistic
                development</strong> of each student — social, moral, intellectual, emotional, and
                physical — while fostering understanding and compassion for others, instilling a love for
                the environment, and promoting patriotic values.
              </p>
            </div>

            {/* Mission */}
            <div className={`${styles.vmCard} ${styles.vmCardAlt}`} id="mission">
              <div className={styles.vmIconWrapper}>
                <span className={styles.vmIcon}>🎯</span>
              </div>
              <h2 className={styles.vmTitle}>Mission</h2>
              <p className={styles.vmIntro}>
                Inspired by the noble message of Christ —{' '}
                <em>&ldquo;Go and teach the world,&rdquo;</em>{' '}
                the Catholic Board of Education, along with the management and staff, intends to:
              </p>
              <ul className={styles.missionList}>
                {missionPoints.map((point, i) => (
                  <li key={i} className={styles.missionItem}>
                    <span className={styles.missionBullet}>✦</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className={styles.section} id="history">
        <div className="container">
          <div className={styles.sectionLabel}>Our Journey</div>
          <h2 className={styles.sectionHeading}>History</h2>
          <p className={styles.sectionSubheading}>
            A legacy spanning over 175 years — milestones that shaped an institution of excellence.
          </p>

          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div key={i} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineYear}>{m.year}</div>
                  <p className={styles.timelineEvent}>{m.event}</p>
                </div>
                <div className={styles.timelineDot}></div>
              </div>
            ))}
            <div className={styles.timelineLine}></div>
          </div>
        </div>
      </section>

    </>
  );
}
