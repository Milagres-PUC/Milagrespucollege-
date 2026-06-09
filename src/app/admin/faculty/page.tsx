"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Edit2, Loader2, Users, User } from 'lucide-react';
import ImageCropperModal from '@/components/admin/ImageCropperModal';

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    image_url: '',
    is_leadership: false,
    display_order: 100
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [cropImageFile, setCropImageFile] = useState<File | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchFaculty();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const fetchFaculty = async () => {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (!error) setFaculty(data || []);
    setLoading(false);
  };

  const uploadPhoto = async () => {
    if (!photoFile) return formData.image_url;

    const fileExt = photoFile.name.split('.').pop();
    const fileName = `faculty_${Date.now()}.${fileExt}`;
    const filePath = `faculty/${fileName}`;

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
      
      const insertData = { ...formData, image_url: photoUrl };

      let error;
      if (editingId) {
        const { error: updateError } = await supabase
          .from('faculty')
          .update(insertData)
          .eq('id', editingId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('faculty')
          .insert([insertData]);
        error = insertError;
      }
      
      if (!error) {
        setFormData({ name: '', designation: '', department: '', image_url: '', is_leadership: false, display_order: 100 });
        setEditingId(null);
        setPhotoFile(null);
        setIsModalOpen(false);
        fetchFaculty();
      } else {
        alert('Failed to save: ' + error.message);
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this faculty member?')) return;
    const { error } = await supabase.from('faculty').delete().eq('id', id);
    if (!error) fetchFaculty();
  };

  const handleEdit = (member: any) => {
    setFormData({
      name: member.name,
      designation: member.designation,
      department: member.department,
      image_url: member.image_url || '',
      is_leadership: member.is_leadership || false,
      display_order: member.display_order || 100
    });
    setEditingId(member.id);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Users size={32} color="var(--primary-dark-blue)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Faculty Management</h1>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', designation: '', department: '', image_url: '', is_leadership: false, display_order: 100 });
            setIsModalOpen(true);
          }}
          style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>Add Faculty</span>
        </button>
      </div>

      {loading ? (
        <p>Loading faculty list...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {faculty.map((member: any) => (
            <div key={member.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', position: 'relative' }}>
              {member.is_leadership && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--primary-dark-blue)', color: 'white', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 'bold' }}>
                  Leadership
                </div>
              )}
              <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#eee', color: '#666', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 'bold' }}>
                #{member.display_order}
              </div>
              <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-yellow)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-dark-blue)' }}>
                {member.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : member.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--primary-red)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem' }}>{member.department}</p>
              <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>{member.designation}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button 
                  onClick={() => handleEdit(member)}
                  style={{ color: 'var(--primary-dark-blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Faculty Member' : 'Add Faculty Member'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" 
                placeholder="Department (e.g. Physics)"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" 
                placeholder="Designation (e.g. Lecturer)"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flex: 1 }}>
                  <input 
                    type="checkbox" 
                    checked={formData.is_leadership}
                    onChange={(e) => setFormData({...formData, is_leadership: e.target.checked})}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>Is Leadership Team?</span>
                </label>
                <input 
                  type="number" 
                  placeholder="Display Priority (e.g. 1)"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 100})}
                  style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd', flex: 1 }}
                />
              </div>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setCropImageFile(e.target.files[0]);
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
                  {saving ? <Loader2 size={18} className="spin" /> : 'Save Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Image Cropper */}
      {cropImageFile && (
        <ImageCropperModal
          imageFile={cropImageFile}
          aspectRatio={1}
          onCropComplete={(croppedFile) => {
            setPhotoFile(croppedFile);
            setCropImageFile(null);
          }}
          onCancel={() => setCropImageFile(null)}
        />
      )}
    </div>
  );
}
