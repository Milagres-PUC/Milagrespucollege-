import { Metadata } from 'next';
import { Briefcase, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Milagres PU College',
};

export default function CareersPage() {
  return (
    <div className="container section-padding">
      <h1 className="section-title">Join Our Team</h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '3rem' }}>
          Milagres PU College is always looking for passionate and dedicated individuals to join our academic and administrative staff. If you want to make a difference in the lives of students, we want to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
        <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '15px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary-dark-blue)', marginBottom: '1.5rem' }}>
            <Briefcase className="text-primary-red" /> Current Openings
          </h3>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
            <h4 style={{ color: 'var(--primary-red)' }}>Lecturer in Computer Science</h4>
            <p style={{ fontSize: '0.85rem', color: '#777' }}>Qualification: M.Sc (CS) / MCA with B.Ed</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: 'var(--primary-red)' }}>Administrative Assistant</h4>
            <p style={{ fontSize: '0.85rem', color: '#777' }}>Qualification: Any Degree with Tally Knowledge</p>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
            * Even if no suitable position is listed, you can still send us your resume for future consideration.
          </p>
        </div>

        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary-dark-blue)', marginBottom: '1.5rem' }}>
            <Send className="text-primary-red" /> Submit Your Application
          </h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Full Name" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="email" placeholder="Email Address" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Position Applied For" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }} />
            <div style={{ border: '2px dashed #ddd', padding: '2rem', textAlign: 'center', borderRadius: '10px' }}>
              <p style={{ color: '#888' }}>Upload Resume (PDF only)</p>
              <input type="file" style={{ marginTop: '0.5rem' }} />
            </div>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }}>SUBMIT APPLICATION</button>
          </form>
        </div>
      </div>
    </div>
  );
}
