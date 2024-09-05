import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface User {
    id: number;
    username: string;
    password: string;
    role: string;
  }

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }
        const formattedUsers = data.map((item: any) => ({
          id: item.id || 0,
          username: item.username || '',
          password: item.password || '',
          role: item.role || '',
        }));
        setUsers(formattedUsers);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      });
  }, []);

  const handleViewUser = (username: string) => {
    router.push(`/admin/dashboard/${username}`);  // Pass username in the route
  };
  

  const filteredUsers = users.filter(user => user.role === 'user');


  return (
    <div>
      <Navbar />
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Completed Questionnaires</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td><button onClick={() => handleViewUser(user.username)}>View</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users found with role "user".</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
