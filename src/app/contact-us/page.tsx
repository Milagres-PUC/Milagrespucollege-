"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('inquiries').insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: 'General Inquiry'
      }
    ]);

    if (error) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="container section-padding">
      <h1 className="section-title">Contact Us</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1.5rem' }}>Get in Touch</h3>
          <p style={{ marginBottom: '1rem' }}><strong>Address:</strong> Milagres PU College, City Name, State 560001</p>
          <p style={{ marginBottom: '1rem' }}><strong>Phone:</strong> 0824-2448633 / 7026012900</p>
          <p style={{ marginBottom: '2rem' }}><strong>Email:</strong> milagrespucmangalore@yahoo.co.in</p>
          <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem' }}>Working Hours</h3>
          <p>Monday - Friday: 8:30 AM - 4:30 PM</p>
          <p>Saturday: 8:30 AM - 12:30 PM</p>
        </div>
        <div>
          {success ? (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f0fff4', borderRadius: '10px', border: '1px solid #c6f6d5' }}>
              <CheckCircle size={48} color="#38a169" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: '#2f855a' }}>Message Sent!</h3>
              <p>Thank you for reaching out. We will get back to you soon.</p>
              <button 
                onClick={() => setSuccess(false)} 
                className="btn btn-primary" 
                style={{ marginTop: '1.5rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {error && <div style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>{error}</div>}
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
                style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
                style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <textarea 
                placeholder="Your Message" 
                rows={5} 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required 
                style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
              ></textarea>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                disabled={loading}
              >
                {loading ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
