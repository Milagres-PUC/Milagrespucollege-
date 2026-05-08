import { Metadata } from 'next';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admission Process | Milagres PU College',
};

export default function AdmissionProcessPage() {
  const steps = [
    { title: 'Application', description: 'Obtain the application form from the college office or download it from our website.' },
    { title: 'Submission', description: 'Submit the filled-in application form along with the required documents within the stipulated time.' },
    { title: 'Interview', description: 'Selected candidates will be called for an interview along with their parents.' },
    { title: 'Fee Payment', description: 'Once selected, complete the admission process by paying the prescribed fees.' }
  ];

  return (
    <div className="container section-padding">
      <h1 className="section-title">Admission Process</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        {steps.map((step, index) => (
          <div key={index} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', fontWeight: '900', color: '#f0f0f0', zIndex: 0 }}>
              {index + 1}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary-dark-blue)' }}>
                <CheckCircle size={24} />
              </div>
              <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem' }}>{step.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '5rem', backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to join us?</h2>
        <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Contact our admissions office for any queries regarding the current academic year.</p>
        <button className="btn btn-primary" style={{ backgroundColor: 'var(--primary-yellow)', color: 'var(--primary-dark-blue)', border: 'none', padding: '1rem 2rem', fontWeight: '700', borderRadius: '30px' }}>
          CONTACT ADMISSIONS <ArrowRight size={20} style={{ marginLeft: '0.5rem', display: 'inline' }} />
        </button>
      </div>
    </div>
  );
}
