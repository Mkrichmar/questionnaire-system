import { NextApiRequest, NextApiResponse } from 'next';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Adjust this based on your environment
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Fetch the questionnaire and its questions
    const questionnaireResult = await pool.query('SELECT name FROM questionnaires WHERE id = $1', [id]);
    const questionsResult = await pool.query('SELECT id, question FROM questions WHERE id IN (SELECT question_id FROM junction WHERE questionnaire_id = $1 ORDER BY priority)', [id]);

    if (questionnaireResult.rows.length === 0) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const questionnaire = {
      id,
      name: questionnaireResult.rows[0].name,
      questions: questionsResult.rows,
    };

    res.status(200).json(questionnaire);
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    res.status(500).json({ error: 'Failed to fetch questionnaire' });
  }
}
