import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Milagres PU College',
};

export default function ContactPage() {
  return (
    <div className="container section-padding">
      <h1 className="section-title">Contact Us</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1.5rem' }}>Get in Touch</h3>
          <p style={{ marginBottom: '1rem' }}><strong>Address:</strong> Milagres PU College, City Name, State 560001</p>
          <p style={{ marginBottom: '1rem' }}><strong>Phone:</strong>0824-2448633 / 7026012900</p>
          <p style={{ marginBottom: '2rem' }}><strong>Email:</strong>milagrespucmangalore@yahoo.co.in</p>
          <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '1rem' }}>Working Hours</h3>
          <p>Monday - Friday: 8:30 AM - 4:30 PM</p>
          <p>Saturday: 8:30 AM - 12:30 PM</p>
        </div>
        <div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="email" placeholder="Your Email" style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
            <textarea placeholder="Your Message" rows={5} style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}></textarea>
            <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
