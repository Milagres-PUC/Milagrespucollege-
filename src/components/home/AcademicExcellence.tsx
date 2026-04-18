import Image from 'next/image';
import styles from './AcademicExcellence.module.css';
import { Trophy } from 'lucide-react';

export default function AcademicExcellence() {
  const students = [
    { name: 'Aarav Sharma', designation: 'Science', score: '580' },
    { name: 'Priya Patel', designation: 'Commerce', score: '575' },
    { name: 'Neha Gupta', designation: 'Arts', score: '560' },
    { name: 'Rohan Kumar', designation: 'Science', score: '555' },
    { name: 'Divya Singh', designation: 'Commerce', score: '540' },
    { name: 'Amit Verma', designation: 'Science', score: '530' },
  ];

  return (
    <section className={styles.academicSection}>
      <div className={`container ${styles.academicContainer}`}>
        <h2 className={styles.sectionTitle}>Hall of Academic Excellence</h2>
        
        <div className={styles.studentsGrid}>
          {students.map((student, index) => (
            <div key={index} className={styles.studentCard}>
              <div className={styles.imgWrapper}>
                {/* Fallback avatar since we don't have real images yet */}
                <Image 
                  src={`https://ui-avatars.com/api/?name=${student.name.replace(' ', '+')}&background=random&size=150`} 
                  alt={student.name} 
                  width={120} 
                  height={120}
                  className={styles.studentImg}
                  unoptimized
                />
                <div className={styles.coloredRing}></div>
              </div>
              <p className={styles.studentName}>{student.name}</p>
              <p className={styles.studentDesig}>~ {student.designation} ~</p>
              <div className={styles.scoreBadge}>{student.score}</div>
            </div>
          ))}
        </div>

        <div className={styles.honoringBanner}>
          <Trophy size={48} className={styles.trophyIcon} />
          <div className={styles.bannerText}>
            <h3>Honoring students who have achieved exceptional academic success</h3>
            <p>~ For the Academic Year 2024–2025 ~</p>
          </div>
          <Trophy size={48} className={styles.trophyIcon} />
        </div>
      </div>
    </section>
  );
}
