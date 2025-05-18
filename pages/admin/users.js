import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const toggleBan = async (id, banned) => {
    await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ banned: !banned })
    });
    setUsers(users.map(u => u._id === id ? { ...u, banned: !banned } : u));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {users.map(user => (
        <div key={user._id} className="border p-4 mb-2">
          <p><strong>{user.name}</strong> ({user.email})</p>
          <p>Status: {user.banned ? 'Banned' : 'Active'}</p>
          <button onClick={() => toggleBan(user._id, user.banned)} className={`px-2 py-1 rounded ${user.banned ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {user.banned ? 'Unban' : 'Ban'}
          </button>
        </div>
      ))}
    </Layout>
  );
}
