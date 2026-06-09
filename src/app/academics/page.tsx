import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Academics | Milagres PU College',
};

export default async function AcademicsPage() {
  const supabase = createClient();
  const { data: coursesData } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  const courses = coursesData || [];

  return (
    <div className="container section-padding">
      <h1 className="section-title">Academics</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6', fontSize: '1.1rem', color: '#555' }}>
          We offer comprehensive programs in Science, Commerce, and Arts. Our curriculum is designed to prepare students for competitive exams and higher education.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {courses.length > 0 ? (
          courses.map((course: any) => (
            <div key={course.id} style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'var(--primary-yellow)' }}></div>
              <span style={{ display: 'inline-block', backgroundColor: '#eef2ff', color: 'var(--primary-dark-blue)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {course.stream}
              </span>
              <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>{course.name}</h3>
              <p style={{ color: '#666', lineHeight: '1.5' }}>{course.description}</p>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>No academic courses have been listed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
