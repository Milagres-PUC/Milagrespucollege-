import Link from 'next/link';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container ${styles.aboutContainer}`}>
        <h2 className={styles.aboutTitle}>MILAGRES PRE-UNIVERSITY COLLEGE</h2>
        
        <div className={styles.aboutContent}>
          <p>
            Milagres PU College was established with the vision of providing quality higher education and 
            empowering students to become responsible and competent global citizens. Since its inception, 
            the college has been committed to academic excellence, innovation, and holistic development.
          </p>
          <p>
            Affiliated with the State Pre-University Board and recognized by the relevant educational authorities, 
            the college offers a wide range of programs in the fields of Arts, Science, and Commerce. 
            Our curriculum is designed to blend theoretical knowledge with practical experience, 
            ensuring that students are well-prepared for both professional careers and higher studies.
          </p>
        </div>

        <Link href="/about-us" className={`btn btn-primary ${styles.aboutBtn}`}>
          Learn more
        </Link>
      </div>
    </section>
  );
}
