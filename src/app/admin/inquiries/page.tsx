"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Trash2, Loader2, Mail, User, Clock, MessageSquare } from 'lucide-react';

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    fetchInquiries();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setInquiries(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) fetchInquiries();
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);
    
    if (!error) fetchInquiries();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Mail size={32} color="var(--primary-dark-blue)" />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>User Inquiries</h1>
      </div>

      {loading ? (
        <p>Loading inquiries...</p>
      ) : inquiries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'white', borderRadius: '10px' }}>
          <MessageSquare size={48} color="#ccc" style={{ marginBottom: '1rem' }} />
          <h3>No inquiries yet</h3>
          <p>Messages from the Contact Us page will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {inquiries.map((item: any) => (
            <div key={item.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: `5px solid ${item.status === 'New' ? 'var(--primary-yellow)' : '#ccc'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <User size={18} color="var(--primary-dark-blue)" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.name}</h3>
                    {item.status === 'New' && (
                      <span style={{ backgroundColor: 'var(--primary-red)', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '10px', fontWeight: 'bold' }}>NEW</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#666', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Mail size={14} /> {item.email}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} /> {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select 
                    value={item.status} 
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    style={{ padding: '0.4rem', borderRadius: '5px', border: '1px solid #ddd', fontSize: '0.8rem' }}
                  >
                    <option value="New">Mark as New</option>
                    <option value="Read">Mark as Read</option>
                    <option value="Replied">Mark as Replied</option>
                  </select>
                  <button onClick={() => handleDelete(item.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '5px', color: '#444', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-dark-blue)' }}>Subject: {item.subject}</p>
                {item.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
