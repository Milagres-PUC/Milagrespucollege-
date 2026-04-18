import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Milagres PU College',
};

export default function GalleryPage() {
  return (
    <div className="container section-padding">
      <h1 className="section-title">Photo Gallery</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
        <p>Explore moments from our campus life, events, and academic activities.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ height: '250px', backgroundColor: '#e5edf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#6a9ce0' }}>
            Gallery Image {i}
          </div>
        ))}
      </div>
    </div>
  );
}
