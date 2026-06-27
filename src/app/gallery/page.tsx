import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery | Milagres PU College',
  description: 'Explore moments from our campus life, events, and academic activities at Milagres PU College.',
};

export default async function GalleryPage() {
  const supabase = createClient();
  
  const { data: albumsData } = await supabase
    .from('gallery_albums')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: photosData } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('created_at', { ascending: true });

  const albums = (albumsData || []).map((album: any) => ({
    ...album,
    photos: (photosData || []).filter((p: any) => p.album_id === album.id),
  }));

  return (
    <div className="container section-padding">
      <h1 className="section-title">Photo Gallery</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
        <p>Explore moments from our campus life, events, and academic activities.</p>
      </div>

      <GalleryClient initialAlbums={albums} />
    </div>
  );
}

