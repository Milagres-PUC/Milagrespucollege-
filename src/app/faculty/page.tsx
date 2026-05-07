import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Faculty | Milagres PU College',
};

export default async function FacultyPage() {
  const supabase = createClient();
  const { data: facultyData } = await supabase
    .from('faculty')
    .select('*')
    .order('order_index', { ascending: true });

  const faculty = facultyData || [
    { name: 'Dr. Ramesh Kumar', department: 'Physics', designation: 'Professor', id: '1' },
    { name: 'Prof. Sunita Sharma', department: 'Chemistry', designation: 'Professor', id: '2' },
    { name: 'Mr. Anil Dsouza', department: 'Commerce', designation: 'Lecturer', id: '3' },
    { name: 'Ms. Rekha', department: 'Arts', designation: 'Lecturer', id: '4' },
  ];

  return (
    <div className="container section-padding">
      <h1 className="section-title">Our Faculty</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>Our experienced and dedicated faculty members are the backbone of Milagres PU College.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {faculty.map((member: any) => (
          <div key={member.id} style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-yellow)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-dark-blue)' }}>
              {member.name.charAt(0)}
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark-blue)' }}>{member.name}</h3>
            <p style={{ color: 'var(--primary-red)', fontWeight: '600', marginBottom: '0.5rem' }}>{member.department}</p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{member.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
