import Image from 'next/image';
import { Quote } from 'lucide-react';
import styles from './PrincipalMessage.module.css';

export default function PrincipalMessage() {
  return (
    <section className={styles.principalSection}>
      <div className={`container ${styles.principalContainer}`}>
        <div className={styles.contentColumn}>
          <h2 className={styles.sectionTitle}>Principal Message</h2>
          
          <div className={styles.messageBox}>
            <Quote className={styles.quoteIconTop} size={48} />
            <p className={styles.greeting}>Dear Students, Parents, and Visitors</p>
            <p>
              Welcome to Milagres PU College. It gives me immense pleasure to extend my warm greetings to you. 
              At our institution, we believe that education is not just about academic excellence but also about 
              nurturing responsible, confident, and compassionate individuals.
            </p>
            <p>
              Our dedicated team of educators strives to create a stimulating and supportive learning environment 
              where every student is encouraged to explore their potential and develop critical thinking skills. We 
              focus on holistic development by integrating academics with co-curricular and extracurricular activities, 
              ensuring that our students are well-prepared to face the challenges of the future.
            </p>
            <p className={styles.signature}>~ Melwin Dsouza</p>
            <Quote className={styles.quoteIconBottom} size={48} />
          </div>
        </div>

        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.decorativeBox}></div>
            <Image 
              src="/principal.jpg" 
              alt="Principal Melwin Dsouza" 
              width={400} 
              height={500}
              className={styles.pImg}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
