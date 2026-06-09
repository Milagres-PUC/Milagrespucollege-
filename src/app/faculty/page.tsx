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
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  const faculty = facultyData || [
    { name: 'Fr. Principal', department: 'Administration', designation: 'Principal', is_leadership: true, id: '1' },
    { name: 'Dr. Ramesh Kumar', department: 'Physics', designation: 'Professor', is_leadership: false, id: '2' },
    { name: 'Prof. Sunita Sharma', department: 'Chemistry', designation: 'Professor', is_leadership: false, id: '3' },
    { name: 'Mr. Anil Dsouza', department: 'Commerce', designation: 'Lecturer', is_leadership: false, id: '4' },
    { name: 'Ms. Rekha', department: 'Arts', designation: 'Lecturer', is_leadership: false, id: '5' },
  ];

  const leadershipTeam = faculty.filter((f: any) => f.is_leadership);
  const regularFaculty = faculty.filter((f: any) => !f.is_leadership);

  return (
    <div className="container section-padding">
      <h1 className="section-title">Our Faculty</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>Our experienced and dedicated faculty members are the backbone of Milagres PU College.</p>
      </div>
      
      {leadershipTeam.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--primary-dark-blue)', marginBottom: '2.5rem', textTransform: 'uppercase', borderBottom: '3px solid var(--primary-yellow)', display: 'inline-block', paddingBottom: '0.5rem', marginLeft: '50%', transform: 'translateX(-50%)' }}>
            Leadership Team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {leadershipTeam.map((member: any) => (
              <div key={member.id} style={{ padding: '2rem', background: 'var(--primary-dark-blue)', color: 'white', borderRadius: '10px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'var(--primary-yellow)' }}></div>
                <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--primary-white)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-dark-blue)', border: '4px solid var(--primary-yellow)' }}>
                  {member.image_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-yellow)', fontSize: '1.4rem' }}>{member.name}</h3>
                <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>{member.designation}</p>
                <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{member.department}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {regularFaculty.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center', color: 'var(--primary-dark-blue)', marginBottom: '2.5rem', textTransform: 'uppercase', borderBottom: '3px solid #eee', display: 'inline-block', paddingBottom: '0.5rem', marginLeft: '50%', transform: 'translateX(-50%)' }}>
            Faculty Members
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {regularFaculty.map((member: any) => (
              <div key={member.id} style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-yellow)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-dark-blue)' }}>
                  {member.image_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark-blue)' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-red)', fontWeight: '600', marginBottom: '0.5rem' }}>{member.department}</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
