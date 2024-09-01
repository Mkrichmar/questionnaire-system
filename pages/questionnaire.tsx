import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'; // Assuming NextAuth is used for authentication

interface RawQuestion {
    id: number;
    question: string;
}

interface ParsedQuestion {
    id: number;
    type: string;
    question: string;
    options?: string[];
    priority: number;
}

interface JunctionData {
    questionId: number;
    priority: number;
}

interface Answer {
    questionId: number;
    answer: string | string[];
    userId: number; // Add userId to the Answer interface
}

interface QuestionnaireProps {
    questionnaireId: string;
}

const fetchQuestionnaire = async (id: string): Promise<RawQuestion[]> => {
    const response = await fetch(`/api/questionnaire/${id}`);
    const data = await response.json();
    return data.questions;
};

const fetchJunctionData = async (questionnaireId: string): Promise<JunctionData[]> => {
    const response = await fetch(`/api/junction/${questionnaireId}`);
    const data = await response.json();
    return data;
};

const submitAnswers = async (answers: Answer[]) => {
    console.log("Submitting answers:", answers);

    const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
        console.error('Failed to submit answers');
    }
};

const Questionnaire: React.FC<QuestionnaireProps> = ({ questionnaireId }) => {
    console.log('Questionnaire ID:', questionnaireId); 
    const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
    const { data: session } = useSession(); // Use session to get user data
    const router = useRouter();  

    useEffect(() => {
        const loadQuestions = async () => {
            const fetchedQuestions = await fetchQuestionnaire(questionnaireId);
            const junctionData = await fetchJunctionData(questionnaireId);

            const parsedQuestions = fetchedQuestions.map((q) => {
                const parsed = JSON.parse(q.question);
                const junction = junctionData.find((j: JunctionData) => j.questionId === q.id);
                return {
                    id: q.id,
                    type: parsed.type,
                    question: parsed.question,
                    options: parsed.options,
                    priority: junction ? junction.priority : 0,
                };
            });

            const sortedQuestions = parsedQuestions.sort((a, b) => a.priority - b.priority);
            setQuestions(sortedQuestions);
        };

        loadQuestions();
    }, [questionnaireId]);

    const handleAnswerChange = (questionId: number, answer: string, isMultipleChoice: boolean) => {
        setAnswers((prev) => {
            if (isMultipleChoice) {
                const currentAnswers = (prev[questionId] as string[]) || [];
                const newAnswers = currentAnswers.includes(answer)
                    ? currentAnswers.filter((a) => a !== answer)
                    : [...currentAnswers, answer];
                return { ...prev, [questionId]: newAnswers };
            } else {
                return { ...prev, [questionId]: answer };
            }
        });
    };

    const handleSubmit = async () => {
        if (!session?.user?.id) {
            console.error('No user ID found in session');
            return;
        }
    
        const userId = parseInt(session.user.id, 10); // Convert user ID to a number
        console.log('User ID:', userId); // Debugging log
    
        console.log('Questionnaire ID:', questionnaireId); // Debugging log for questionnaireId
    
        const formattedAnswers: Answer[] = Object.entries(answers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId, 10),
            answer,
            userId, 
            questionnaireId// Include the converted userId in each answer
        }));
    
        console.log('Formatted Answers:', formattedAnswers); // Debugging log for answers
    
        try {
            await submitAnswers(formattedAnswers);
            alert('Your answers have been submitted!');
            router.push('/user-home');  // Redirect to the user-home page
        } catch (error) {
            console.error('Failed to submit answers:', error);
        }
    };
    
    

    return (
        <div>
            <h1>Questionnaire</h1>
            {questions.length > 0 ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    {questions.map((question) => (
                        <div key={question.id} className="question">
                            <p>{question.question}</p>
                            {question.type === 'mcq' ? (
                                <ul>
                                    {question.options?.map((option, index) => {
                                        const isMultipleChoice = question.question.includes("Select all that apply");
                                        return (
                                            <li key={index}>
                                                <label>
                                                    <input
                                                        type={isMultipleChoice ? "checkbox" : "radio"}
                                                        name={`question-${question.id}`}
                                                        value={option}
                                                        onChange={() => handleAnswerChange(question.id, option, isMultipleChoice)}
                                                        checked={isMultipleChoice
                                                            ? (answers[question.id] as string[] || []).includes(option)
                                                            : answers[question.id] === option}
                                                    />
                                                    {option}
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : question.type === 'input' ? (
                                <input
                                    type="text"
                                    value={answers[question.id] || ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value, false)}
                                    placeholder="Your answer..."
                                />
                            ) : (
                                <p>Unknown question type</p>
                            )}
                        </div>
                    ))}
                    <button type="submit">Submit Questionnaire</button>
                </form>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
};

export default Questionnaire;
