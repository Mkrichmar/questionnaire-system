import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch related data from the questions table using the foreign key relationship
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          username,
          password,
          role
        `)
        .order('id', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      // Transform data to match the original output format
      const answers = data.map((row: any) => ({
        id: row.id || 'Anonymous',
        username: row.username || 'Anonymous',
        password: row.password || 'Password not found',
        role: row.role,
      }));

      res.status(200).json(answers);
    } catch (error) {
      console.error('Error fetching users:', (error as Error).message);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
