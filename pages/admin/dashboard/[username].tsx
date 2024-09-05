import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

interface UserAnswer {
  username: string;
  question: {
    type: string;
    options: string[];
    question: string;
  };
  answer: string;
}

export default function AdminDashboard() {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { username } = router.query;  // Get username from the dynamic route

  useEffect(() => {
    if (username) {
      setLoading(true);
      // Fetch the answers
      fetch(`/api/admin/answers`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching answers: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log('Fetched answers:', data);  // Log the fetched data
          if (Array.isArray(data)) {
            setAnswers(data);
          } else {
            setError('Unexpected data format');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching answers:', err);
          setError('Failed to fetch answers');
          setLoading(false);
        });
    }
  }, [username]);

  if (!username) {
    return <div>Loading user data...</div>;
  }

  // Filter the answers by username to make sure only the selected user's answers are shown
  const filteredAnswers = answers.filter(answer => {
    console.log('answer.username:', answer.username);  // Log the username of each answer
    return answer.username === username;
  });

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard for {username}</h1>
      {loading ? (
        <p>Loading answers...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {filteredAnswers.length > 0 ? (
            filteredAnswers.map((answer, idx) => (
              <li key={idx}>
                <strong>{answer.username}</strong> answered:
                <p>Q: {answer.question?.question}</p> {/* Render only the 'question' field */}
                <p>A: {answer.answer}</p>
              </li>
            ))
          ) : (
            <p>No answers found for this user.</p>
          )}
        </ul>
      )}
    </div>
  );
}
