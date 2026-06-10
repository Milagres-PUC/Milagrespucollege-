import Image from 'next/image';
import { Quote } from 'lucide-react';
import styles from './PrincipalMessage.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function PrincipalMessage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from('global_settings').select('*').eq('id', 1).single();

  const principalName = settings?.principal_name || 'Melwin Dsouza';
  const principalMessage = settings?.principal_message || 'Welcome to Milagres PU College...';
  const principalPhoto = settings?.principal_photo_url || '/principal.jpg';

  return (
    <section className={styles.principalSection}>
      <div className={`container ${styles.principalContainer}`}>
        <div className={styles.contentColumn}>
          <h2 className={styles.sectionTitle}>Principal Message</h2>

          <div className={styles.messageBox}>
            <Quote className={styles.quoteIconTop} size={48} />
            <p className={styles.greeting}>Dear Students, Parents and Visitors</p>
            <p style={{ whiteSpace: 'pre-line' }}>{principalMessage}</p>
            <p className={styles.signature}>~ {principalName}</p>
            <Quote className={styles.quoteIconBottom} size={48} />
          </div>
        </div>

        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.decorativeBox}></div>
            <Image
              src={principalPhoto}
              alt={`Principal ${principalName}`}
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
