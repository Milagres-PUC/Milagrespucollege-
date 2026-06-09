"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Loader2, Building, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function FacilitiesManagement() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🏛️',
    image_url: ''
  });

  const supabase = createClient();

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setFacilities(data || []);
    setLoading(false);
  };

  const uploadPhoto = async () => {
    if (!photoFile) return formData.image_url;

    const fileExt = photoFile.name.split('.').pop();
    const fileName = `facility_${Date.now()}.${fileExt}`;
    const filePath = `facilities/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, photoFile, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const photoUrl = await uploadPhoto();

      const { error } = await supabase
        .from('facilities')
        .insert([{ ...formData, image_url: photoUrl }]);
      
      if (!error) {
        setFormData({ title: '', description: '', icon: '🏛️', image_url: '' });
        setPhotoFile(null);
        setIsModalOpen(false);
        fetchFacilities();
      } else {
        alert('Failed to save facility: ' + error.message);
      }
    } catch(err: any) {
      alert('Error: ' + err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this facility?')) return;
    const { error } = await supabase.from('facilities').delete().eq('id', id);
    if (!error) fetchFacilities();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Building size={32} color="var(--primary-dark-blue)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Facilities Management</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>Add Facility</span>
        </button>
      </div>

      {loading ? (
        <p>Loading facilities...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {facilities.map((fac: any) => (
            <div key={fac.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
              <button 
                onClick={() => handleDelete(fac.id)}
                style={{ position: 'absolute', top: '15px', right: '15px', color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{fac.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{fac.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>{fac.description}</p>
              
              {fac.image_url && (
                <div style={{ width: '100%', height: '150px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <Image src={fac.image_url} alt={fac.title} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))}
          {facilities.length === 0 && <p style={{ color: '#999', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>No facilities added yet.</p>}
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add Facility</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Facility Name (e.g. Library, Science Lab)"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" 
                placeholder="Emoji Icon (e.g. 📚, 🔬)"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <textarea 
                placeholder="Facility Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              ></textarea>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Facility Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPhotoFile(e.target.files[0]);
                    }
                  }}
                  style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
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
                  {saving ? <Loader2 size={18} className="spin" /> : 'Save Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
