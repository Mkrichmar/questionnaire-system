import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

console.log("API route '/api/questionnaires' invoked.");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from('questionnaires')
      .select('id, name');

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Failed to fetch questionnaires', details: error.message });
    }

    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Unexpected error:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch questionnaires' });
  }
}
