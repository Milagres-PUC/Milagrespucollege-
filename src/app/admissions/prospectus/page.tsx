"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FileText, Download, Loader2 } from 'lucide-react';

export default function ProspectusPage() {
  const [prospectusList, setProspectusList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProspectus() {
      const { data, error } = await supabase
        .from('prospectus')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setProspectusList(data);
      }
      setLoading(false);
    }
    fetchProspectus();
  }, [supabase]);

  return (
    <div className="container section-padding">
      <h1 className="section-title">College Prospectus</h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Download our official prospectus to learn more about our academic programs, facilities, and the vibrant life at Milagres PU College.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <Loader2 size={48} className="spin" color="var(--primary-dark-blue)" />
          <p style={{ marginTop: '1rem', color: '#666' }}>Fetching documents...</p>
        </div>
      ) : prospectusList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
          <FileText size={64} color="#ccc" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ color: '#888' }}>No prospectus available at the moment.</h3>
          <p>Please check back later or contact the college office.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {prospectusList.map((item) => (
            <div key={item.id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #eee' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary-red)' }}>
                <FileText size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark-blue)', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: '2rem' }}>Uploaded on {new Date(item.created_at).toLocaleDateString()}</p>
              
              <a 
                href={item.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Download size={18} /> DOWNLOAD PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
