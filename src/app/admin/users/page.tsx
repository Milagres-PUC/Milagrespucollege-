"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './users.module.css';
import { 
  UserPlus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Check, 
  X,
  Loader2,
  Shield,
  Mail
} from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // In a real app, you would fetch from your 'profiles' or 'admins' table
    // For now, we'll simulate or fetch from a public table if exists
    // const { data, error } = await supabase.from('profiles').select('*');
    
    // Simulating data for demonstration
    const demoUsers = [
      { id: '1', email: 'mpuc1982@gmail.com', role: 'Super Admin', created_at: '2026-01-15' },
      { id: '2', email: 'staff@milagres.com', role: 'Editor', created_at: '2026-03-20' },
      { id: '3', email: 'support@milagres.com', role: 'Viewer', created_at: '2026-04-05' },
    ];
    
    setUsers(demoUsers);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // await supabase.from('profiles').delete().eq('id', id);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(search.toLowerCase()) || 
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Manage administrative access and permissions</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by email or role..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loadingState}>
            <Loader2 className={styles.spin} />
            <span>Loading users...</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Info</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {user.email[0].toUpperCase()}
                      </div>
                      <div className={styles.userDetails}>
                        <span className={styles.userEmail}>{user.email}</span>
                        <span className={styles.userId}>ID: {user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase().replace(' ', '')]}`}>
                      <Shield size={14} />
                      {user.role}
                    </span>
                  </td>
                  <td>{user.created_at}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} title="Edit User">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className={styles.deleteBtn} 
                        title="Delete User"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Placeholder */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add New Administrator</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form className={styles.modalForm} onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="email@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Role</label>
                <select>
                  <option>Super Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
