"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Loader2, Briefcase } from 'lucide-react';

export default function CareersManagement() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    is_open: true
  });

  const supabase = createClient();

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setCareers(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Convert empty string to null for date fields
    const insertData = {
      ...formData,
      deadline: formData.deadline ? formData.deadline : null
    };

    const { error } = await supabase
      .from('careers')
      .insert([insertData]);
    
    if (!error) {
      setFormData({ title: '', description: '', deadline: '', is_open: true });
      setIsModalOpen(false);
      fetchCareers();
    } else {
      alert('Failed to save career: ' + error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this career opening?')) return;
    const { error } = await supabase.from('careers').delete().eq('id', id);
    if (!error) fetchCareers();
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('careers').update({ is_open: !currentStatus }).eq('id', id);
    if (!error) fetchCareers();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Briefcase size={32} color="var(--primary-dark-blue)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Careers Management</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>Add Career Opening</span>
        </button>
      </div>

      {loading ? (
        <p>Loading careers...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {careers.map((career: any) => (
            <div key={career.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{career.title}</h3>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '10px', 
                    fontWeight: 'bold',
                    backgroundColor: career.is_open ? '#dcfce7' : '#fee2e2',
                    color: career.is_open ? '#166534' : '#991b1b'
                  }}>
                    {career.is_open ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '800px' }}>{career.description}</p>
                {career.deadline && (
                  <p style={{ color: 'var(--primary-red)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: '600' }}>
                    Deadline: {career.deadline}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button 
                  onClick={() => toggleStatus(career.id, career.is_open)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '5px', 
                    border: '1px solid #ddd', 
                    background: 'white', 
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {career.is_open ? 'Close Opening' : 'Reopen'}
                </button>
                <button 
                  onClick={() => handleDelete(career.id)}
                  style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {careers.length === 0 && <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>No careers added yet.</p>}
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add Career Opening</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Job Title (e.g. English Lecturer)"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <textarea 
                placeholder="Job Description & Requirements"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={5}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              ></textarea>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Application Deadline (Optional)</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '5px', border: 'none', backgroundColor: 'var(--primary-dark-blue)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {saving ? <Loader2 size={18} className="spin" /> : 'Save Career'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
