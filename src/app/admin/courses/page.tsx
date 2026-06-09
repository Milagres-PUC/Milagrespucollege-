"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Edit2, Loader2, BookOpen } from 'lucide-react';

export default function CoursesManagement() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    stream: 'Science',
    description: ''
  });

  const supabase = createClient();

  useEffect(() => {
    fetchCourses();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setCourses(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let error;
    if (editId) {
      const { error: updateError } = await supabase
        .from('courses')
        .update({
          name: formData.name,
          stream: formData.stream,
          description: formData.description
        })
        .eq('id', editId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('courses')
        .insert([{
          name: formData.name,
          stream: formData.stream,
          description: formData.description
        }]);
      error = insertError;
    }
    
    if (!error) {
      setFormData({ name: '', stream: 'Science', description: '' });
      setEditId(null);
      setIsModalOpen(false);
      fetchCourses();
    } else {
      alert('Failed to save course: ' + error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) fetchCourses();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BookOpen size={32} color="var(--primary-dark-blue)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Courses Management</h1>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: '', stream: 'Science', description: '' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>Add Course</span>
        </button>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {courses.map((course: any) => (
            <div key={course.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => {
                    setFormData({ name: course.name, stream: course.stream, description: course.description });
                    setEditId(course.id);
                    setIsModalOpen(true);
                  }}
                  style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
                  title="Edit Course"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(course.id)}
                  style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
                  title="Delete Course"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--primary-yellow)', color: '#333', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: 'bold', display: 'inline-block', marginBottom: '0.5rem' }}>
                {course.stream}
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{course.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>{course.description}</p>
            </div>
          ))}
          {courses.length === 0 && <p style={{ color: '#999', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>No courses added yet.</p>}
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editId ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Course Name (e.g. PCMB, CEBA)"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <select 
                value={formData.stream}
                onChange={(e) => setFormData({...formData, stream: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              >
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
              <textarea 
                placeholder="Course Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              ></textarea>
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
                  {saving ? <Loader2 size={18} className="spin" /> : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
