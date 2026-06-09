"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Save, Loader2, Megaphone } from 'lucide-react';

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching announcements:', error);
    } else {
      setAnnouncements(data || []);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please enter both title and content.');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('announcements')
        .insert([{ title: newTitle, content: newContent, is_active: true }]);
      
      if (error) {
        alert('Failed to add announcement: ' + error.message);
      } else {
        setNewTitle('');
        setNewContent('');
        fetchAnnouncements();
      }
    } catch (err: any) {
      alert('An unexpected error occurred: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('announcements')
      .update({ is_active: !current })
      .eq('id', id);
    
    if (!error) fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (!error) fetchAnnouncements();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Megaphone size={32} color="var(--primary-dark-blue)" />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Announcements Management</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Add New Announcement</h2>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Announcement Title"
            style={{ width: '200px', padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <input 
            type="text" 
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Type announcement message here..."
            style={{ flex: 1, padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <button 
            type="submit" 
            disabled={saving}
            style={{ 
              backgroundColor: saving ? '#ccc' : 'var(--primary-dark-blue)', 
              color: 'white', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '5px', 
              border: 'none', 
              cursor: saving ? 'not-allowed' : 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? <Loader2 size={18} className="spin" /> : <Plus size={18} />}
            <span>{saving ? 'Adding...' : 'Add'}</span>
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <p>Loading...</p>
        ) : announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          announcements.map((item: any) => (
            <div key={item.id} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="checkbox" 
                  checked={item.is_active} 
                  onChange={() => toggleActive(item.id, item.is_active)}
                  style={{ width: '20px', height: '20px' }}
                />
                <span style={{ color: item.is_active ? 'black' : '#999', textDecoration: item.is_active ? 'none' : 'line-through' }}>
                  <strong>{item.title}</strong>: {item.content}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
