import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import loadCSV from '../../src/utils/loadCSV';

const pool = new Pool();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { filename } = req.body;
      const data = await loadCSV(filename);
      const query = `
        INSERT INTO ${filename.split('.')[0]} (${Object.keys(data[0]).join(', ')})
        VALUES (${Object.values(data[0]).map((_, i) => `$${i + 1}`).join(', ')});
      `;
      await pool.query(query, Object.values(data[0]));
      res.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error importing data:', error);
      res.status(500).json({ error: 'Failed to import data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
