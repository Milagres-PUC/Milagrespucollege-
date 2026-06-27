"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './gallery.module.css';

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

export default function GalleryClient({ initialAlbums }: { initialAlbums: GalleryAlbum[] }) {
  const [albums] = useState<GalleryAlbum[]>(initialAlbums);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<GalleryAlbum | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openLightbox = (album: GalleryAlbum) => {
    if (album.photos.length === 0) return;
    setCurrentAlbum(album);
    setCurrentPhotoIndex(0);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setTimeout(() => {
      setCurrentAlbum(null);
      setCurrentPhotoIndex(0);
    }, 300); // Wait for transition
    document.body.style.overflow = 'auto';
  }, []);

  const nextPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentAlbum) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % currentAlbum.photos.length);
  }, [currentAlbum]);

  const prevPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentAlbum) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + currentAlbum.photos.length) % currentAlbum.photos.length);
  }, [currentAlbum]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextPhoto, prevPhoto]);

  // Swipe support variables
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) nextPhoto();
    if (isRightSwipe) prevPhoto();
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <>
      {albums.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {albums.map((album) => {
            const thumbnail = album.photos.length > 0 ? album.photos[0].url : '/placeholder.jpg';
            return (
              <div 
                key={album.id} 
                className={styles.albumCard}
                onClick={() => openLightbox(album)}
              >
                <div className={styles.albumImageWrapper}>
                  <Image 
                    src={thumbnail} 
                    alt={album.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.albumOverlay}>
                    <span>View Gallery</span>
                  </div>
                </div>
                <div className={styles.albumInfo}>
                  <h3 className={styles.albumTitle}>{album.title}</h3>
                  <p className={styles.albumCount}>{album.photos.length} {album.photos.length === 1 ? 'Photo' : 'Photos'}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No photo albums have been published yet.</p>
        </div>
      )}

      {/* Lightbox */}
      <div 
        className={`${styles.lightbox} ${lightboxOpen ? styles.lightboxOpen : ''}`}
        onClick={closeLightbox}
      >
        {currentAlbum && currentAlbum.photos.length > 0 && (
          <div 
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <X size={32} />
            </button>
            
            <div className={styles.lightboxHeader}>
              <h3>{currentAlbum.title}</h3>
              <span className={styles.counter}>
                {currentPhotoIndex + 1} / {currentAlbum.photos.length}
              </span>
            </div>

            <div className={styles.imageContainer}>
              <Image
                src={currentAlbum.photos[currentPhotoIndex].url}
                alt={`${currentAlbum.title} - Photo ${currentPhotoIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
                priority
              />
            </div>

            {currentAlbum.photos.length > 1 && (
              <>
                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevPhoto}>
                  <ChevronLeft size={48} />
                </button>
                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextPhoto}>
                  <ChevronRight size={48} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
