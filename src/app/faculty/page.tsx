import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import FacultyClient from '@/components/faculty/FacultyClient';

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

  return (
    <div className="container section-padding">
      <h1 className="section-title">Our Faculty</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>Our experienced and dedicated faculty members are the backbone of Milagres PU College.</p>
      </div>
      
      <FacultyClient faculty={faculty} />
    </div>
  );
}
