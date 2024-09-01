import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

interface UserAnswer {
  username: string;
  questionnaireName: string;
  question: string;
  answer: string;
}

export default function AdminDashboard() {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/answers')
      .then((res) => {
        console.log('Response status:', res.status);  // Log the response status
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);  // Log the data fetched from the API
        if (Array.isArray(data)) {
          setAnswers(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((err) => console.error('Error fetching answers:', err));
  }, []);

  const extractQuestionText = (questionData: string) => {
    try {
      const parsedData = JSON.parse(questionData);
      return parsedData.question || questionData;
    } catch (error) {
      console.error('Error parsing question data:', error);
      return questionData;  // Return the original if parsing fails
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
      {answers.length > 0 ? (
        <ul>
          {answers.map((answer, idx) => (
            <li key={idx}>
              <strong>{answer.username}</strong> completed {answer.questionnaireName}: 
              <p>Q: {extractQuestionText(answer.question)}</p>
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
