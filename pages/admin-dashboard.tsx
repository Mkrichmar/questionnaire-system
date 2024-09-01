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

  const extractQuestionText = (questionData: any) => {
    if (!questionData || typeof questionData !== 'object' || !questionData.question) {
      console.error('Invalid question data format:', questionData);
      return 'No question text available';
    }
  
    // Assuming `question` is the property within `question_id` that contains the text you want
    return questionData.question || 'No question text available';
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
