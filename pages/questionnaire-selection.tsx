import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Questionnaire {
  id: number;
  name: string;
}

export default function QuestionnaireSelection() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/questionnaires');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setQuestionnaires(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    };
    fetchData();
  }, []);
  

  const handleSelect = (id: number) => {
    router.push(`/questionnaire/${id}`);
  };

  return (
    <div>
      <h1>Select a Questionnaire</h1>
      <ul>
        {questionnaires.map((q) => (
          <li key={q.id}>
            <button onClick={() => handleSelect(q.id)}>{q.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
