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
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/answers')
      .then((res) => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setAnswers(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((err) => console.error('Error fetching answers:', err));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
      {answers.length > 0 ? (
        <ul>
          {answers.map((answer, idx) => (
            <li key={idx}>
              <strong>{answer.username}</strong> answered:
              <p>Q: {answer.question?.question}</p> {/* Render only the 'question' field */}
              <p>A: {answer.answer}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No answers found.</p>
      )}
    </div>
  );
}
