import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Facilities | Milagres PU College',
};

export default async function FacilitiesPage() {
  const supabase = createClient();
  const { data: facilitiesData } = await supabase
    .from('facilities')
    .select('*')
    .order('created_at', { ascending: false });

  const facilities = facilitiesData || [];

  return (
    <div className="container section-padding">
      <h1 className="section-title">Campus Facilities</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <p>Our campus provides world-class facilities to support student learning and development.</p>
      </div>
      
      {facilities.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {facilities.map((facility: any) => (
            <div key={facility.id} style={{ backgroundColor: 'var(--primary-white)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              {facility.image_url ? (
                <div style={{ height: '200px', position: 'relative' }}>
                  <Image src={facility.image_url} alt={facility.title} fill style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ height: '200px', backgroundColor: '#e5edf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {facility.icon || '🏛️'}
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {facility.icon && !facility.image_url ? null : <span>{facility.icon}</span>}
                  {facility.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No facilities have been added yet.</p>
        </div>
      )}
    </div>
  );
}
