import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        {/* About Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>About Milagres PU College</h3>
          <p className={styles.footerText}>
            We are committed to academic excellence, innovation, and holistic development.
            Our institution provides a stimulating environment to help students reach their full potential.
          </p>
          <div className={styles.socialIcons}>
            <Link href="#" className={styles.socialIcon}><FaInstagram size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><FaFacebook size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><FaYoutube size={20} /></Link>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/academics">Academics</Link></li>
            <li><Link href="/faculty">Faculty</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact Information</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin className={styles.icon} size={18} />
              <span>Milagres PU College, City Name, State 560001</span>
            </li>
            <li className={styles.contactItem}>
              <Phone className={styles.icon} size={18} />
              <span>0824-2448633 / 7026012900</span>
            </li>
            <li className={styles.contactItem}>
              <Mail className={styles.icon} size={18} />
              <span>milagrespucmangalore@yahoo.co.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.copyrightBar}>
        <div className="container">
          <p>© 2026 Milagres PU College. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
