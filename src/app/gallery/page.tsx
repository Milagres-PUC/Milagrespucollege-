import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Gallery | Milagres PU College',
};

export default async function GalleryPage() {
  const supabase = createClient();
  
  // Fetch images from storage bucket
  const { data, error } = await supabase.storage.from('images').list();
  
  const images = (data || []).map((file: any) => ({
    name: file.name,
    url: supabase.storage.from('images').getPublicUrl(file.name).data.publicUrl
  }));

  return (
    <div className="container section-padding">
      <h1 className="section-title">Photo Gallery</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
        <p>Explore moments from our campus life, events, and academic activities.</p>
      </div>
      
      {images.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {images.map((image: any) => (
            <div key={image.name} style={{ position: 'relative', height: '250px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <Image 
                src={image.url} 
                alt={image.name} 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No photos have been uploaded to the gallery yet.</p>
        </div>
      )}
    </div>
  );
}
