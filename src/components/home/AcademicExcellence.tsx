import Image from 'next/image';
import styles from './AcademicExcellence.module.css';
import { Trophy } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function AcademicExcellence() {
  const supabase = createClient();
  const { data: studentsData } = await supabase
    .from('excellence_hall')
    .select('*')
    .order('created_at', { ascending: false });

  const students = studentsData || [
    { student_name: 'Aarav Sharma', category: 'Science', score_achievement: '580', id: '1' },
    { student_name: 'Priya Patel', category: 'Commerce', score_achievement: '575', id: '2' },
    { student_name: 'Neha Gupta', category: 'Arts', score_achievement: '560', id: '3' },
    { student_name: 'Rohan Kumar', category: 'Science', score_achievement: '555', id: '4' },
    { student_name: 'Divya Singh', category: 'Commerce', score_achievement: '540', id: '5' },
    { student_name: 'Amit Verma', category: 'Science', score_achievement: '530', id: '6' },
  ];

  return (
    <section className={styles.academicSection}>
      <div className={`container ${styles.academicContainer}`}>
        <h2 className={styles.sectionTitle}>Hall of Academic Excellence</h2>
        
        <div className={styles.studentsGrid}>
          {students.map((student: any) => (
            <div key={student.id} className={styles.studentCard}>
              <div className={styles.imgWrapper}>
                <Image 
                  src={student.image_url || `https://ui-avatars.com/api/?name=${student.student_name.replace(' ', '+')}&background=random&size=150`} 
                  alt={student.student_name} 
                  width={120} 
                  height={120}
                  className={styles.studentImg}
                  unoptimized={!student.image_url}
                />
                <div className={styles.coloredRing}></div>
              </div>
              <p className={styles.studentName}>{student.student_name}</p>
              <p className={styles.studentDesig}>~ {student.category} ~</p>
              <div className={styles.scoreBadge}>{student.score_achievement}</div>
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
