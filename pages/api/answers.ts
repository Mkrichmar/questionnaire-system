import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Define the Answer type
interface Answer {
    questionId: number;
    answer: string;
    userId: number;
    questionnaireId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { answers }: { answers: Answer[] } = req.body;

        console.log('Received answers:', JSON.stringify(answers, null, 2));  // Log the incoming answers

        try {
            await saveAnswers(answers);
            res.status(200).json({ message: 'Answers submitted successfully' });
        } catch (error) {
            console.error('Error saving answers:', error);
            res.status(500).json({ error: 'Failed to save answers' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function saveAnswers(answers: Answer[]) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const answer of answers) {
            if (Array.isArray(answer.answer)) {
                // Handle multiple answers for a single question
                for (const singleAnswer of answer.answer) {
                    console.log(`Inserting array item: userId=${answer.userId}, questionId=${answer.questionId}, answer=${singleAnswer}, questionnaireId=${answer.questionnaireId}`);
                    await client.query(
                        'INSERT INTO answers (user_id, question_id, answer, questionnaire_id) VALUES ($1, $2, $3, $4)',
                        [answer.userId, answer.questionId, singleAnswer, answer.questionnaireId]
                    );
                }
            } else if (typeof answer.answer === 'string') {
                console.log(`Inserting string: userId=${answer.userId}, questionId=${answer.questionId}, answer=${answer.answer}, questionnaireId=${answer.questionnaireId}`);
                await client.query(
                    'INSERT INTO answers (user_id, question_id, answer, questionnaire_id) VALUES ($1, $2, $3, $4)',
                    [answer.userId, answer.questionId, answer.answer, answer.questionnaireId]
                );
            } else {
                console.error("Unexpected answer format:", answer);
            }
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during transaction:', error);
        throw error;
    } finally {
        client.release();
    }
}
