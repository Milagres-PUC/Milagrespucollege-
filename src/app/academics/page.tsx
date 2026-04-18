import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academics | Milagres PU College',
};

export default function AcademicsPage() {
  return (
    <div className="container section-padding">
      <h1 className="section-title">Academics</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We offer comprehensive programs in Science, Commerce, and Arts. Our curriculum is designed to prepare students for competitive exams and higher education.
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', flex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: 'var(--primary-dark-blue)' }}>Science</h3>
            <p>PCMB, PCMC, PCME</p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', flex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: 'var(--primary-dark-blue)' }}>Commerce</h3>
            <p>CEBA, SEBA, HEBA</p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', flex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: 'var(--primary-dark-blue)' }}>Arts</h3>
            <p>HEPS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
