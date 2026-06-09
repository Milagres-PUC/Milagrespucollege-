import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News & Announcements | Milagres PU College',
};

export const revalidate = 0;

export default async function NewsPage() {
  const supabase = createClient();
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  const newsList = news || [];

  return (
    <div className="container section-padding">
      <h1 className="section-title">Latest News</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {newsList.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>No news articles available at the moment.</p>
        ) : (
          newsList.map((item: any) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--primary-white)', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {item.image_url && (
                <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                  <Image src={item.image_url} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <Calendar size={16} />
                  <span>{new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>{item.title}</h3>
                <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1.5rem' }}>
                  {item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content}
                </p>
                <Link href={`/news/${item.id}`} className="btn btn-primary" style={{ display: 'inline-block' }}>
                  Read More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
