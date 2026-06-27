"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './gallery.module.css';
import Image from 'next/image';
import { 
  Trash2, 
  Image as ImageIcon, 
  Plus, 
  X, 
  Loader2,
  Edit2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface GalleryPhoto {
  id: string;
  album_id: string;
  url: string;
  created_at: string;
}

interface GalleryAlbum {
  id: string;
  title: string;
  created_at: string;
  photos: GalleryPhoto[];
}

export default function GalleryManagement() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal state
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalPhotos, setModalPhotos] = useState<{file?: File, url?: string, id?: string}[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const supabase = createClient();

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data: albumsData, error: albumsError } = await supabase
        .from('gallery_albums')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (albumsError) throw albumsError;

      const { data: photosData, error: photosError } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: true });

      if (photosError) throw photosError;

      const formattedAlbums = (albumsData || []).map((album: any) => ({
        ...album,
        photos: (photosData || []).filter((p: any) => p.album_id === album.id)
      }));

      setAlbums(formattedAlbums);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const openNewAlbumModal = () => {
    setEditingAlbum(null);
    setModalTitle('');
    setModalPhotos([]);
    setIsModalOpen(true);
  };

  const openEditAlbumModal = (album: GalleryAlbum) => {
    setEditingAlbum(album);
    setModalTitle(album.title);
    setModalPhotos(album.photos.map(p => ({ url: p.url, id: p.id })));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAlbum(null);
    setModalTitle('');
    setModalPhotos([]);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files);
    const availableSlots = 6 - modalPhotos.length;
    
    if (availableSlots <= 0) {
      alert('You can only upload up to 6 images per album.');
      return;
    }
    
    const filesToAdd = newFiles.slice(0, availableSlots).map(file => ({ file }));
    setModalPhotos([...modalPhotos, ...filesToAdd]);
    
    // reset input
    e.target.value = '';
  };

  const removeModalPhoto = (index: number) => {
    const newPhotos = [...modalPhotos];
    newPhotos.splice(index, 1);
    setModalPhotos(newPhotos);
  };

  const movePhoto = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === modalPhotos.length - 1) return;
    
    const newPhotos = [...modalPhotos];
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[newIndex];
    newPhotos[newIndex] = temp;
    
    setModalPhotos(newPhotos);
  };

  const saveAlbum = async () => {
    if (!modalTitle.trim()) {
      alert('Please enter an album title.');
      return;
    }
    if (modalPhotos.length === 0) {
      alert('Please add at least one photo.');
      return;
    }

    setIsSaving(true);
    
    try {
      let albumId = editingAlbum?.id;

      if (albumId) {
        // Update existing album title
        const { error: updateError } = await supabase
          .from('gallery_albums')
          .update({ title: modalTitle })
          .eq('id', albumId);
        if (updateError) throw updateError;
        
        // Remove photos that were deleted in the modal
        const currentPhotoIds = modalPhotos.filter(p => p.id).map(p => p.id);
        const originalPhotoIds = (editingAlbum?.photos ?? []).map((p: any) => p.id);
        const photosToDelete = originalPhotoIds.filter(id => !currentPhotoIds.includes(id));
        
        if (photosToDelete.length > 0) {
          const { error: deleteError } = await supabase
            .from('gallery_photos')
            .delete()
            .in('id', photosToDelete);
          if (deleteError) throw deleteError;
        }
      } else {
        // Create new album
        const { data, error: insertError } = await supabase
          .from('gallery_albums')
          .insert({ title: modalTitle })
          .select()
          .single();
        if (insertError) throw insertError;
        albumId = data.id;
      }

      // Process photos in order
      const now = new Date().getTime();
      
      for (let i = 0; i < modalPhotos.length; i++) {
        const photo = modalPhotos[i];
        // Create a unique created_at timestamp for ordering
        const photoTimestamp = new Date(now + i * 1000).toISOString();
        
        if (photo.file) {
          // Upload new file
          const fileExt = photo.file.name.split('.').pop() || 'jpg';
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(`gallery/${fileName}`, photo.file);
            
          if (uploadError) throw uploadError;
          
          const url = supabase.storage.from('images').getPublicUrl(`gallery/${fileName}`).data.publicUrl;
          
          const { error: photoInsertError } = await supabase
            .from('gallery_photos')
            .insert({ 
              album_id: albumId, 
              url: url,
              created_at: photoTimestamp
            });
          if (photoInsertError) throw photoInsertError;
          
        } else if (photo.id) {
          // Update existing photo's created_at to preserve new order
          const { error: photoUpdateError } = await supabase
            .from('gallery_photos')
            .update({ created_at: photoTimestamp })
            .eq('id', photo.id);
          if (photoUpdateError) throw photoUpdateError;
        }
      }
      
      closeModal();
      fetchAlbums();
    } catch (error: any) {
      alert('Error saving album: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!window.confirm('Are you sure you want to delete this album?')) return;

    try {
      const { error } = await supabase
        .from('gallery_albums')
        .delete()
        .eq('id', albumId);
        
      if (error) throw error;
      fetchAlbums();
    } catch (error: any) {
      alert('Error deleting album: ' + error.message);
    }
  };

  return (
    <div className={styles.galleryPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gallery Management</h1>
          <p className={styles.subtitle}>Manage albums and photos</p>
        </div>
        <button className={styles.addBtn} onClick={openNewAlbumModal}>
          <Plus size={18} />
          <span>New Album</span>
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <Loader2 className={styles.spin} />
          <span>Loading albums...</span>
        </div>
      ) : albums.length === 0 ? (
        <div className={styles.emptyState}>
          <ImageIcon size={48} />
          <h3>No albums yet</h3>
          <p>Create your first album to get started.</p>
        </div>
      ) : (
        <div className={styles.imageGrid}>
          {albums.map((album) => {
            const thumbnail = album.photos.length > 0 ? album.photos[0].url : '/placeholder.jpg';
            return (
              <div key={album.id} className={styles.imageCard} onClick={() => openEditAlbumModal(album)}>
                <div className={styles.imageWrapper}>
                  <Image src={thumbnail} alt={album.title} fill className={styles.galleryImage} />
                  <div className={styles.imageOverlay}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEditAlbumModal(album); }} 
                      className={styles.editBtn}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteAlbum(album.id); }} 
                      className={styles.deleteBtn}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className={styles.imageInfo}>
                  <span className={styles.imageName}>{album.title}</span>
                  <span className={styles.imageCount}>{album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Album Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingAlbum ? 'Edit Album' : 'New Album'}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.formGroup}>
              <label>Album Title</label>
              <input 
                type="text" 
                value={modalTitle}
                onChange={(e) => setModalTitle(e.target.value)}
                placeholder="e.g. Annual Sports Day 2026"
                className={styles.input}
              />
            </div>
            
            <div className={styles.photosSection}>
              <div className={styles.photosHeader}>
                <h3>Photos ({modalPhotos.length}/6)</h3>
                <span className={styles.subtitle}>Drag or use arrows to reorder. First image is thumbnail.</span>
              </div>
              
              <div className={styles.photosGrid}>
                {modalPhotos.map((photo, index) => (
                  <div key={index} className={styles.photoItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={photo.file ? URL.createObjectURL(photo.file) : photo.url} 
                      alt={`Photo ${index + 1}`} 
                    />
                    <div className={styles.photoActions}>
                      {index > 0 && (
                        <button className={styles.actionBtn} onClick={() => movePhoto(index, 'left')} title="Move Left">
                          <ChevronLeft size={16} />
                        </button>
                      )}
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => removeModalPhoto(index)} title="Remove">
                        <Trash2 size={16} />
                      </button>
                      {index < modalPhotos.length - 1 && (
                        <button className={styles.actionBtn} onClick={() => movePhoto(index, 'right')} title="Move Right">
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {modalPhotos.length < 6 && (
                  <label className={styles.uploadPhotoBtn}>
                    <Plus size={24} />
                    <span>Add Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handlePhotoSelect} 
                      hidden 
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={closeModal} disabled={isSaving}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={saveAlbum} disabled={isSaving}>
                {isSaving ? <Loader2 className={styles.spin} size={18} /> : null}
                <span>{isSaving ? 'Saving...' : 'Save Album'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

