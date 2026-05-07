"use client";

import Link from 'next/link';
import { Mail, Phone, Menu, X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('Admissions Open for 2026–2027 • Apply Now for Science, Commerce, and Arts Streams • Better Education for a Better World');
  const supabase = createClient();

  useEffect(() => {
    async function fetchAnnouncement() {
      const { data, error } = await supabase
        .from('announcements')
        .select('content')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data && !error) {
        setAnnouncement(data.content);
      }
    }
    fetchAnnouncement();
  }, [supabase]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about-us' },
    { title: 'Academics', path: '/academics' },
    { title: 'Faculty', path: '/faculty' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Facilities', path: '/facilities' },
    { title: 'News', path: '/news' },
    { title: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <header className={styles.header}>
      {/* Top Information Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail className={styles.yellowIcon} size={16} />
              <span>milagrespucmangalore@yahoo.co.in</span>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.yellowIcon} size={16} />
              <span>0824-2448633 / 7026012900</span>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <Link href="#" className={styles.socialIcon}><FaInstagram size={18} /></Link>
            <Link href="#" className={styles.socialIcon}><FaFacebook size={18} /></Link>
            <Link href="#" className={styles.socialIcon}><FaYoutube size={18} /></Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.navWrapper}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.logoArea}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo.jpg"
                alt="Milagres PU College Logo"
                width={80}
                height={96}
                className={styles.logoImage}
                priority
              />
              <div className={styles.logoText}>
                <span className={styles.logoTextLine1}>MILAGRES</span>
                <span className={styles.logoTextLine2}>PRE-UNIVERSITY</span>
                <span className={styles.logoTextLine3}>COLLEGE</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.path} className={styles.navLink}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation List */}
      {isMobileMenuOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Announcement Ticker */}
      <div className={styles.tickerBar}>
        <div className={styles.tickerHeader}>ANNOUNCEMENT:</div>
        <div className={styles.marquee}>
          <p>{announcement}</p>
        </div>
      </div>
    </header>
  );
}
