import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import styles from './newsDetail.module.css';

export const revalidate = 0; // Ensure dynamic rendering or ISR

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from('news').select('title').eq('id', params.id).single();
  
  if (!data) {
    return { title: 'News Not Found' };
  }
  return { title: `${data.title} | Milagres PU College` };
}

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  const { data: article, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !article) {
    notFound();
  }

  const publishDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container section-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark-blue)', marginBottom: '2rem', fontWeight: 600, textDecoration: 'none' }}>
        <ArrowLeft size={20} />
        Back to News
      </Link>
      
      <div className={styles.articleContainer}>
        {article.image_url && (
          <div className={styles.imageWrapper}>
            <Image 
              src={article.image_url} 
              alt={article.title} 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        )}
        
        <div className={styles.contentWrapper}>
          <div className={styles.metaInfo}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} />
              <span>{publishDate}</span>
            </div>
            {article.category && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark-blue)', backgroundColor: '#f0f4f8', padding: '0.2rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>
                <Tag size={14} />
                <span>{article.category}</span>
              </div>
            )}
          </div>
          
          <h1 className={styles.articleTitle}>
            {article.title}
          </h1>
          
          <div className={styles.articleContent}>
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
}
