import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Courses Offered | Milagres PU College',
};

export const revalidate = 0;

export default async function CoursesPage() {
  const supabase = createClient();
  const { data: coursesData } = await supabase.from('courses').select('*').order('created_at', { ascending: true });
  
  const courses = coursesData || [];

  const groupedCourses = courses.reduce((acc: any, course: any) => {
    if (!acc[course.stream]) {
      acc[course.stream] = {
        stream: course.stream,
        combinations: [],
        description: course.stream === 'Science' 
          ? 'Ideal for students aspiring for careers in Medicine, Engineering, Research, and Technology.' 
          : course.stream === 'Commerce' 
            ? 'Perfect for students aiming for CA, CS, MBA, Banking, and Entrepreneurship.' 
            : 'Designed for students interested in Civil Services, Law, Journalism, and Humanities.'
      };
    }
    acc[course.stream].combinations.push(`${course.name} (${course.description})`);
    return acc;
  }, {});

  const displayCourses = Object.values(groupedCourses);

  return (
    <div className="container section-padding">
      <h1 className="section-title">Courses Offered</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>We offer a diverse range of Pre-University courses designed to provide a strong foundation for higher education and career success.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {displayCourses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No courses currently available.</p>
        ) : (
          displayCourses.map((course: any) => (
            <div key={course.stream} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderLeft: '10px solid var(--primary-dark-blue)' }}>
              <h2 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem', textTransform: 'uppercase' }}>{course.stream} Stream</h2>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>{course.description}</p>
              <h4 style={{ marginBottom: '0.8rem', color: 'var(--primary-red)' }}>Combinations:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {course.combinations.map((comb: string) => (
                  <li key={comb} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary-yellow)', fontWeight: 'bold' }}>•</span> {comb}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
