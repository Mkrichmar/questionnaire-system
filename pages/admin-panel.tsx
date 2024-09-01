import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    username: string;
    completedQuestionnaires: number;
  }

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        const formattedUsers = data.map((item: any) => ({
          id: item.id || 0,
          username: item.username || '',
          completedQuestionnaires: item.completed_questionnaires || 0
        }));
        setUsers(formattedUsers);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleViewUser = (userId: number) => {
    router.push(`/admin-panel/user/${userId}`);
  };

  return (
    <div>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.completedQuestionnaires}</td>
              <td><button onClick={() => handleViewUser(user.id)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
