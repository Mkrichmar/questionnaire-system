import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Query to fetch data from the 'questionnaire_questions' table
    const { data, error } = await supabase
      .from('questionnaire_questions')
      .select('*')
      .limit(10);

    if (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }

    // Return the fetched data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
