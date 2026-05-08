import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses Offered | Milagres PU College',
};

export default function CoursesPage() {
  const courses = [
    {
      stream: 'Science',
      combinations: ['PCMB (Physics, Chemistry, Mathematics, Biology)', 'PCMC (Physics, Chemistry, Mathematics, Computer Science)'],
      description: 'Ideal for students aspiring for careers in Medicine, Engineering, Research, and Technology.'
    },
    {
      stream: 'Commerce',
      combinations: ['CEBA (Computer Science, Economics, Business Studies, Accountancy)', 'SEBA (Statistics, Economics, Business Studies, Accountancy)'],
      description: 'Perfect for students aiming for CA, CS, MBA, Banking, and Entrepreneurship.'
    },
    {
      stream: 'Arts',
      combinations: ['HEPS (History, Economics, Political Science, Sociology)'],
      description: 'Designed for students interested in Civil Services, Law, Journalism, and Humanities.'
    }
  ];

  return (
    <div className="container section-padding">
      <h1 className="section-title">Courses Offered</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>We offer a diverse range of Pre-University courses designed to provide a strong foundation for higher education and career success.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {courses.map((course) => (
          <div key={course.stream} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderLeft: '10px solid var(--primary-dark-blue)' }}>
            <h2 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem', textTransform: 'uppercase' }}>{course.stream} Stream</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>{course.description}</p>
            <h4 style={{ marginBottom: '0.8rem', color: 'var(--primary-red)' }}>Combinations:</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {course.combinations.map((comb) => (
                <li key={comb} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-yellow)', fontWeight: 'bold' }}>•</span> {comb}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
