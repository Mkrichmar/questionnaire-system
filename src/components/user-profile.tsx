import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CompletedQuestionnaire {
    id: number;
}

export default function UserProfile() {
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users/me')
      .then(res => res.json())
      .then(data => setCompletedQuestionnaires(data.completedQuestionnaires))
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  const handleCompleteQuestionnaire = (questionnaireId: number) => {
    // Simulate completing a questionnaire
    setCompletedQuestionnaires([...completedQuestionnaires, questionnaireId]);
    router.push('/questionnaire-selection');
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Completed Questionnaires:</p>
      <ul>
        {completedQuestionnaires.map((id: number) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <button onClick={() => handleCompleteQuestionnaire(1)}>Complete Another Questionnaire</button>
    </div>
  );
}
