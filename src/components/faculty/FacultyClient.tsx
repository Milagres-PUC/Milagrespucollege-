"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function FacultyClient({ faculty }: { faculty: any[] }) {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const leadershipTeam = faculty.filter((f: any) => f.is_leadership);
  const regularFaculty = faculty.filter((f: any) => !f.is_leadership);

  return (
    <>
      {leadershipTeam.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--primary-dark-blue)', marginBottom: '2.5rem', textTransform: 'uppercase', borderBottom: '3px solid var(--primary-yellow)', display: 'inline-block', paddingBottom: '0.5rem', marginLeft: '50%', transform: 'translateX(-50%)' }}>
            Leadership Team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {leadershipTeam.map((member: any) => (
              <div 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                style={{ padding: '2rem', background: 'var(--primary-dark-blue)', color: 'white', borderRadius: '10px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', textAlign: 'center', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'var(--primary-yellow)' }}></div>
                <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--primary-white)', borderRadius: '10px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-dark-blue)', border: '4px solid var(--primary-yellow)', overflow: 'hidden' }}>
                  {member.image_url ? (
                    <Image src={member.image_url} alt={member.name} width={120} height={120} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-yellow)', fontSize: '1.4rem' }}>{member.name}</h3>
                <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>{member.designation}</p>
                <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{member.department}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {regularFaculty.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center', color: 'var(--primary-dark-blue)', marginBottom: '2.5rem', textTransform: 'uppercase', borderBottom: '3px solid #eee', display: 'inline-block', paddingBottom: '0.5rem', marginLeft: '50%', transform: 'translateX(-50%)' }}>
            Faculty Members
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {regularFaculty.map((member: any) => (
              <div 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                style={{ padding: '2rem', background: 'var(--primary-white)', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--primary-yellow)', borderRadius: '10px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-dark-blue)', overflow: 'hidden' }}>
                  {member.image_url ? (
                    <Image src={member.image_url} alt={member.name} width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark-blue)' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-red)', fontWeight: '600', marginBottom: '0.5rem' }}>{member.department}</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {selectedMember && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}
          onClick={() => setSelectedMember(null)}
        >
          <div 
            style={{ backgroundColor: 'white', borderRadius: '15px', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMember(null)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
            >
              <X size={20} color="#333" />
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: 'var(--primary-dark-blue)', padding: '4rem 2rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '-50px', width: '140px', height: '140px', backgroundColor: 'white', borderRadius: '15px', border: '5px solid white', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                  {selectedMember.image_url ? (
                    <Image src={selectedMember.image_url} alt={selectedMember.name} width={140} height={140} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-yellow)', color: 'var(--primary-dark-blue)', fontSize: '3rem', fontWeight: 'bold' }}>
                      {selectedMember.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ padding: '4rem 2rem 2rem', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary-dark-blue)', fontSize: '1.8rem', marginBottom: '0.2rem' }}>{selectedMember.name}</h2>
                <h3 style={{ color: 'var(--primary-red)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{selectedMember.designation}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: '500' }}>{selectedMember.department}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '10px', textAlign: 'left', marginBottom: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Qualification</p>
                    <p style={{ fontWeight: '600', color: '#333' }}>{selectedMember.qualification || 'Not Specified'}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Experience</p>
                    <p style={{ fontWeight: '600', color: '#333' }}>{selectedMember.experience || 'Not Specified'}</p>
                  </div>
                </div>
                
                {selectedMember.bio && (
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Profile Overview</p>
                    <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>{selectedMember.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
