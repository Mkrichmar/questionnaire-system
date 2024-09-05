import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query; // Extract userId from query parameters

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      // Fetch answers for the specified userId
      const { data, error } = await supabase
        .from('answers')
        .select(`
          id,
          user_id,  // Ensure you select the user_id field
          user_id (username),  // Join with user table to get username (if needed)
          question_id (question),
          answer
        `)
        .eq('user_id', userId) // Filter by userId
        .order('id', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      // // Transform data to match the original output format
      // const answers = data.map((row: any) => ({
      //   username: row.user_id?.username || 'Anonymous',
      //   question: row.question_id?.question || 'Question not found',
      //   answer: row.answer,
      // }));

      // res.status(200).json(answers);

      res.status(200).json(data);

    } catch (error) {
      console.error('Error fetching answers:', (error as Error).message);
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
