import Image from 'next/image';
import styles from './AcademicExcellence.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function AcademicExcellence() {
  const supabase = createClient();
  const { data: studentsData } = await supabase
    .from('academic_excellence')
    .select('*')
    .order('created_at', { ascending: false });

  const students = studentsData || [
    { student_name: 'Aarav Sharma', stream: 'Science', marks: '580', id: '1' },
    { student_name: 'Priya Patel', stream: 'Commerce', marks: '575', id: '2' },
    { student_name: 'Neha Gupta', stream: 'Arts', marks: '560', id: '3' },
    { student_name: 'Rohan Kumar', stream: 'Science', marks: '555', id: '4' },
    { student_name: 'Divya Singh', stream: 'Commerce', marks: '540', id: '5' },
    { student_name: 'Amit Verma', stream: 'Science', marks: '530', id: '6' },
  ];

  return (
    <section className={styles.academicSection}>
      <div className={`container ${styles.academicContainer}`}>
        <h2 className={styles.sectionTitle}>Hall of Academic Excellence</h2>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} className={styles.cardSet}>
                {students.map((student: any) => (
                  <div key={`${setIdx}-${student.id}`} className={styles.studentCard}>
                    <div className={styles.imgWrapper}>
                      <Image 
                        src={student.photo_url || `https://ui-avatars.com/api/?name=${student.student_name.replace(' ', '+')}&background=random&size=150`} 
                        alt={student.student_name} 
                        width={120} 
                        height={120}
                        className={styles.studentImg}
                        unoptimized={!student.photo_url}
                      />
                      <div className={styles.coloredRing}></div>
                    </div>
                    <p className={styles.studentName}>{student.student_name}</p>
                    <p className={styles.studentDesig}>~ {student.stream} ~</p>
                    <div className={styles.scoreBadge}>{student.marks}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
