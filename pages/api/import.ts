import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import loadCSV from '../../src/utils/loadCSV';

// Initialize the Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { filename } = req.body;
      const data = await loadCSV(filename);

      if (!data || data.length === 0) {
        return res.status(400).json({ error: 'No data found in the CSV file' });
      }

      const tableName = filename.split('.')[0];

      // Insert the CSV data into the specified table in Supabase
      const { error } = await supabase.from(tableName).insert(data);

      if (error) {
        throw new Error(`Error inserting data into ${tableName}: ${error.message}`);
      }

      res.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error importing data:', (error as Error).message);
      res.status(500).json({ error: 'Failed to import data' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
