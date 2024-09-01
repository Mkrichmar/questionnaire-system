import { NextApiRequest, NextApiResponse } from 'next';
import pg from 'pg';
import dotenv from 'dotenv';

console.log("API route '/api/questionnaires' invoked.");  // Log to ensure the route is hit

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Adjust this based on your environment
  },
});

console.log(process.env.DATABASE_URL);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simple query to fetch the list of questionnaires
    const result = await pool.query('SELECT id, name FROM questionnaires');
    console.log(result.rows);
    

    // Return the rows as a JSON array
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    res.status(500).json({ error: 'Failed to fetch questionnaires' });
  }
}
