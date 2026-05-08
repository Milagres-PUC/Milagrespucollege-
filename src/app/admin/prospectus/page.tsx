"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Loader2, FileText, Upload } from 'lucide-react';

export default function AdminProspectus() {
  const [prospectusList, setProspectusList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchProspectus();
  }, []);

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload to Storage
      const { error: uploadError, data } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // 3. Save to Database
      const { error: dbError } = await supabase
        .from('prospectus')
        .insert([
          { 
            title, 
            file_url: publicUrl, 
            file_name: file.name 
          }
        ]);

      if (dbError) throw dbError;

      setTitle('');
      setFile(null);
      // Reset file input
      (document.getElementById('file-input') as HTMLInputElement).value = '';
      fetchProspectus();
      alert('Prospectus uploaded successfully!');
    } catch (error: any) {
      alert('Error uploading prospectus: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this prospectus?')) return;

    try {
      // Extract file path from URL
      const urlParts = fileUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // 1. Delete from Storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([fileName]);

      if (storageError) console.error('Error deleting file from storage:', storageError);

      // 2. Delete from Database
      const { error: dbError } = await supabase
        .from('prospectus')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      fetchProspectus();
    } catch (error: any) {
      alert('Error deleting prospectus: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <FileText size={32} color="var(--primary-dark-blue)" />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Prospectus Management</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Upload size={20} /> Upload New Prospectus
        </h2>
        <form onSubmit={handleUpload} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Document Title</label>
            <input 
              type="text" 
              placeholder="e.g. Prospectus 2024-25"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Select PDF File</label>
            <input 
              id="file-input"
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              style={{ width: '100%', padding: '0.7rem', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={uploading}
            style={{ backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '0.8rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
          >
            {uploading ? <Loader2 size={18} className="spin" /> : <Plus size={18} />}
            <span>{uploading ? 'Uploading...' : 'Upload'}</span>
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>File Name</th>
              <th style={{ padding: '1rem' }}>Date Added</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}><Loader2 size={24} className="spin" /></td></tr>
            ) : prospectusList.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No prospectus documents found.</td></tr>
            ) : (
              prospectusList.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>{item.title}</td>
                  <td style={{ padding: '1rem', color: '#666' }}>{item.file_name}</td>
                  <td style={{ padding: '1rem', color: '#888', fontSize: '0.9rem' }}>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(item.id, item.file_url)}
                      style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
