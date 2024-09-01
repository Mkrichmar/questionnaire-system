import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Perform a complex query using Supabase
      const { data, error } = await supabase
        .from('answers')
        .select(`
          user_id:users(username),
          questionnaire_id:questionnaires(name),
          question_id:questions(question),
          answer
        `)
        .order('user_id', { ascending: true })
        .order('questionnaire_id', { ascending: true })
        .order('question_id', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      // Verify if questions are being returned in the response
      console.log('Data fetched:', data);

      // Transform data to match the original output format
      const answers = data.map((row: any) => ({
        username: row.username || 'Anonymous',
        questionnaireName: row.name,
        question: row.question || 'Question not found', // Add a fallback to detect missing questions
        answer: row.answer,
      }));

      res.status(200).json(answers);
    } catch (error) {
      console.error('Error fetching answers:', (error as Error).message);
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
