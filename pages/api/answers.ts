import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define the Answer type
interface Answer {
  questionId: number;
  answer: string | string[]; // Adjusted to handle both string and array of strings
  userId: number;
  questionnaireId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { answers }: { answers: Answer[] } = req.body;

    console.log('Received answers:', JSON.stringify(answers, null, 2)); // Log the incoming answers

    try {
      await saveAnswers(answers);
      res.status(200).json({ message: 'Answers submitted successfully' });
    } catch (error) {
      console.error('Error saving answers:', (error as Error).message);
      res.status(500).json({ error: 'Failed to save answers' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function saveAnswers(answers: Answer[]) {
    try {
      for (const answer of answers) {
        if (Array.isArray(answer.answer)) {
          // Handle multiple answers for a single question
          for (const singleAnswer of answer.answer) {
            console.log(`Inserting array item: userId=${answer.userId}, questionId=${answer.questionId}, answer=${singleAnswer}, questionnaireId=${answer.questionnaireId}`);
            const { error } = await supabase
              .from('answers')
              .insert([
                {
                  user_id: answer.userId,
                  question_id: answer.questionId,
                  answer: singleAnswer,
                  questionnaire_id: answer.questionnaireId,
                },
              ]);
  
            if (error) {
              console.error('Error inserting answer:', error.message);
              // You can decide whether to throw an error here or continue
              throw new Error(`Failed to insert answer for question ${answer.questionId}: ${error.message}`);
            }
          }
        } else if (typeof answer.answer === 'string') {
          console.log(`Inserting string: userId=${answer.userId}, questionId=${answer.questionId}, answer=${answer.answer}, questionnaireId=${answer.questionnaireId}`);
          const { error } = await supabase
            .from('answers')
            .insert([
              {
                user_id: answer.userId,
                question_id: answer.questionId,
                answer: answer.answer,
                questionnaire_id: answer.questionnaireId,
              },
            ]);
  
          if (error) {
            console.error('Error inserting answer:', error.message);
            throw new Error(`Failed to insert answer for question ${answer.questionId}: ${error.message}`);
          }
        } else {
          console.error('Unexpected answer format:', answer);
        }
      }
    } catch (error) {
      console.error('Error during saving answers:', (error as Error).message);
      throw error;
    }
  }
  