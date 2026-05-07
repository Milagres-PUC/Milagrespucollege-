"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Loader2, Newspaper, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function NewsManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    image_url: ''
  });

  const supabase = createClient();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setNews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase
      .from('news')
      .insert([formData]);
    
    if (!error) {
      setFormData({ title: '', content: '', category: 'General', image_url: '' });
      setIsModalOpen(false);
      fetchNews();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this news article?')) return;
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (!error) fetchNews();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Newspaper size={32} color="var(--primary-dark-blue)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>News Management</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} />
          <span>Add News</span>
        </button>
      </div>

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {news.map((item: any) => (
            <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '150px', backgroundColor: '#f0f0f0', position: 'relative' }}>
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>
              <div style={{ padding: '1rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '0.2rem 0.5rem', borderRadius: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {item.category}
                  </span>
                  <button onClick={() => handleDelete(item.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add News Article</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Article Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              >
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
              </select>
              <input 
                type="text" 
                placeholder="Image URL (optional)"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <textarea 
                placeholder="Article Content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                rows={5}
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
                  {saving ? <Loader2 size={18} className="spin" /> : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
