import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilities | Milagres PU College',
};

export default function FacilitiesPage() {
  return (
    <div className="container section-padding">
      <h1 className="section-title">Campus Facilities</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>Our campus provides world-class facilities to support student learning and development.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {['Library', 'Computer Labs', 'Science Laboratories', 'Sports Complex', 'Cafeteria', 'Auditorium'].map((facility, i) => (
          <div key={i} style={{ backgroundColor: 'var(--primary-white)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ height: '200px', backgroundColor: '#e5edf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6a9ce0' }}>Image</div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '0.5rem' }}>{facility}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Modern amenities to enhance the overall experience.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
