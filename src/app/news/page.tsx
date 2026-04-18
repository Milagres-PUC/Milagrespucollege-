import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Announcements | Milagres PU College',
};

export default function NewsPage() {
  return (
    <div className="container section-padding">
      <h1 className="section-title">Latest News</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ marginBottom: '2rem', padding: '2rem', backgroundColor: 'var(--primary-white)', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem' }}>News Article Title {i}</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Published on: April 15, 2026</p>
            <p style={{ lineHeight: '1.6' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
