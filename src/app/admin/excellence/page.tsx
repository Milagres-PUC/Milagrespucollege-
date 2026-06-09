"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Loader2, Trophy, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function ExcellenceManagement() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    student_name: '',
    score_achievement: '',
    category: 'Science',
    image_url: ''
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('excellence_hall')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setStudents(data || []);
    setLoading(false);
  };

  const uploadPhoto = async () => {
    if (!photoFile) return formData.image_url;

    const fileExt = photoFile.name.split('.').pop();
    const fileName = `excellence_${Date.now()}.${fileExt}`;
    const filePath = `excellence/${fileName}`;

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
        .from('excellence_hall')
        .insert([{ ...formData, image_url: photoUrl }]);
      
      if (!error) {
        setFormData({ student_name: '', score_achievement: '', category: 'Science', image_url: '' });
        setPhotoFile(null);
        setIsModalOpen(false);
        fetchStudents();
      } else {
        alert('Failed to save: ' + error.message);
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
    
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this achievement?')) return;
    const { error } = await supabase.from('excellence_hall').delete().eq('id', id);
    if (!error) fetchStudents();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Trophy size={32} color="var(--primary-dark-blue)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Hall of Excellence Management</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>Add Achievement</span>
        </button>
      </div>

      {loading ? (
        <p>Loading achievements...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {students.map((student: any) => (
            <div key={student.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', position: 'relative' }}>
              <button 
                onClick={() => handleDelete(student.id)}
                style={{ position: 'absolute', top: '10px', right: '10px', color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={16} />
              </button>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 1rem', overflow: 'hidden', border: '3px solid var(--primary-yellow)' }}>
                {student.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={student.image_url} alt={student.student_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', color: '#ccc' }}>
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{student.student_name}</h3>
              <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{student.category}</p>
              <div style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-block' }}>
                {student.score_achievement}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add Student Achievement</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Student Name"
                value={formData.student_name}
                onChange={(e) => setFormData({...formData, student_name: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" 
                placeholder="Score / Achievement (e.g. 580/600)"
                value={formData.score_achievement}
                onChange={(e) => setFormData({...formData, score_achievement: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              >
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
              </select>
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
                  {saving ? <Loader2 size={18} className="spin" /> : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
