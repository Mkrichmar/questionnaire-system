import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let client;
    if (req.method === 'GET') {
        try {
            client = await pool.connect();

            const query = `
                SELECT
                    COALESCE(users.username, 'Anonymous') AS username,
                    questionnaires.name AS questionnaireName,
                    questions.question,
                    answers.answer
                FROM
                    answers
                LEFT JOIN users ON answers.user_id = users.id
                JOIN questions ON answers.question_id = questions.id
                JOIN questionnaires ON answers.questionnaire_id = questionnaires.id
                ORDER BY username, questionnaireName, questions.id;

            `;

            console.log("Executing query:", query);  // Log the query being executed

            const result = await client.query(query);

            console.log("Query result:", result.rows);  // Log the result of the query

            const answers = result.rows;

            res.status(200).json(answers);
        } catch (error) {
            console.error('Error fetching answers:', error);
            res.status(500).json({ error: 'Failed to fetch answers' });
        } finally {
            if (client) {
                client.release();
            }
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
