"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './gallery.module.css';
import Image from 'next/image';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Plus, 
  X, 
  Loader2,
  ExternalLink
} from 'lucide-react';

interface GalleryItem {
  name: string;
  url: string;
  created_at: string | null;
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from('images').list();
      
      if (error) throw error;

      const imageUrls = (data || []).map((file: any) => ({
        name: file.name,
        url: supabase.storage.from('images').getPublicUrl(file.name).data.publicUrl,
        created_at: file.created_at
      }));

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;
      
      fetchImages();
    } catch (error) {
      alert('Error uploading image: ' + (error as any).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase.storage.from('images').remove([name]);
      if (error) throw error;
      setImages(images.filter(img => img.name !== name));
    } catch (error) {
      alert('Error deleting image');
    }
  };

  return (
    <div className={styles.galleryPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gallery Management</h1>
          <p className={styles.subtitle}>Upload and manage website images</p>
        </div>
        <label className={styles.uploadBtn}>
          {uploading ? <Loader2 className={styles.spin} size={18} /> : <Plus size={18} />}
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            disabled={uploading} 
            hidden 
          />
        </label>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <Loader2 className={styles.spin} />
          <span>Loading gallery...</span>
        </div>
      ) : images.length === 0 ? (
        <div className={styles.emptyState}>
          <ImageIcon size={48} />
          <h3>No images yet</h3>
          <p>Upload your first image to get started.</p>
        </div>
      ) : (
        <div className={styles.imageGrid}>
          {images.map((image) => (
            <div key={image.name} className={styles.imageCard}>
              <div className={styles.imageWrapper}>
                <Image src={image.url} alt={image.name} fill className={styles.galleryImage} />
                <div className={styles.imageOverlay}>
                  <a href={image.url} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                    <ExternalLink size={18} />
                  </a>
                  <button onClick={() => handleDelete(image.name)} className={styles.deleteBtn}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className={styles.imageInfo}>
                <span className={styles.imageName}>{image.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
