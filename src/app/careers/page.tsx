import { Metadata } from 'next';
import { Briefcase, Send } from 'lucide-react';

import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Careers | Milagres PU College',
};

export default async function CareersPage() {
  const supabase = createClient();
  const { data: careersData } = await supabase
    .from('careers')
    .select('*')
    .order('created_at', { ascending: false });

  const careers = careersData || [];

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
          {careers.length > 0 ? (
            careers.map((career: any) => (
              <div key={career.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: 'var(--primary-red)' }}>{career.title}</h4>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 'bold' }}>
                    {career.is_open ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>{career.description}</p>
                {career.deadline && (
                  <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>Deadline: {new Date(career.deadline).toLocaleDateString()}</p>
                )}
              </div>
            ))
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No current openings available.</p>
          )}
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
