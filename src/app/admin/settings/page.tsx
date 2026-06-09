"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './settings.module.css';
import { Save, Loader2, Image as ImageIcon } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    admission_form_link: '',
    principal_name: 'Fr. Principal',
    principal_message: '',
    principal_photo_url: '',
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('global_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (data) {
      setFormData({
        admission_form_link: data.admission_form_link || '',
        principal_name: data.principal_name || 'Fr. Principal',
        principal_message: data.principal_message || '',
        principal_photo_url: data.principal_photo_url || '',
      });
      setPhotoPreview(data.principal_photo_url || null);
    }
    setLoading(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Size limit: 5MB
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: 'File size must be under 5MB.', type: 'error' });
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) return formData.principal_photo_url;

    const fileExt = photoFile.name.split('.').pop();
    const fileName = `principal_photo_${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

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
    setMessage({ text: '', type: '' });

    try {
      const photoUrl = await uploadPhoto();

      const { error } = await supabase
        .from('global_settings')
        .upsert({
          id: 1,
          admission_form_link: formData.admission_form_link,
          principal_name: formData.principal_name,
          principal_message: formData.principal_message,
          principal_photo_url: photoUrl,
        });

      if (error) throw error;
      
      setMessage({ text: 'Settings updated successfully!', type: 'success' });
      setPhotoFile(null); // Clear pending file
    } catch (err: any) {
      setMessage({ text: err.message || 'Error saving settings.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-gray-500" size={32} /></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Global Settings</h1>
        <p className={styles.subtitle}>Manage global website content like Admission forms and Principal message.</p>
      </div>

      {message.text && (
        <div className={`${styles.alert} ${message.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Admission Form Settings */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Admission Settings</h2>
          <div className={styles.formGroup}>
            <label htmlFor="admission_form_link">Google Form Link for Admissions</label>
            <input
              type="url"
              id="admission_form_link"
              value={formData.admission_form_link}
              onChange={(e) => setFormData({ ...formData, admission_form_link: e.target.value })}
              placeholder="https://docs.google.com/forms/..."
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Principal Message Settings */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Principal's Desk</h2>
          
          <div className={styles.formRow}>
            <div className={styles.photoUploadSection}>
              <label>Principal's Photo</label>
              <div className={styles.photoPreviewWrapper}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Principal" className={styles.photoPreview} />
                ) : (
                  <div className={styles.photoPlaceholder}><ImageIcon size={48} color="#ccc" /></div>
                )}
              </div>
              <input
                type="file"
                id="principal_photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.fileInput}
              />
              <p className={styles.helpText}>Max size: 5MB. Recommended square aspect ratio.</p>
            </div>

            <div className={styles.textDetailsSection}>
              <div className={styles.formGroup}>
                <label htmlFor="principal_name">Principal's Name</label>
                <input
                  type="text"
                  id="principal_name"
                  value={formData.principal_name}
                  onChange={(e) => setFormData({ ...formData, principal_name: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="principal_message">Message Content</label>
                <textarea
                  id="principal_message"
                  value={formData.principal_message}
                  onChange={(e) => setFormData({ ...formData, principal_message: e.target.value })}
                  className={styles.textarea}
                  rows={8}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
