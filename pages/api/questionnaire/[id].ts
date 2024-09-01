import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Fetch the questionnaire name
    const { data: questionnaireData, error: questionnaireError } = await supabase
      .from('questionnaires')
      .select('name')
      .eq('id', id)
      .single();

    if (questionnaireError) {
      console.error('Error fetching questionnaire:', questionnaireError.message);
      return res.status(500).json({ error: 'Failed to fetch questionnaire' });
    }

    if (!questionnaireData) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    // Fetch the question IDs associated with the questionnaire from the junction table
    const { data: junctionData, error: junctionError } = await supabase
      .from('junction')
      .select('question_id')
      .eq('questionnaire_id', id)
      .order('priority', { ascending: true });

    if (junctionError) {
      console.error('Error fetching question IDs:', junctionError.message);
      return res.status(500).json({ error: 'Failed to fetch question IDs' });
    }

    const questionIds = junctionData?.map((item) => item.question_id) || [];

    if (questionIds.length === 0) {
      return res.status(200).json({ id, name: questionnaireData.name, questions: [] });
    }

    // Fetch the questions based on the IDs
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('id, question')
      .in('id', questionIds);

    if (questionsError) {
      console.error('Error fetching questions:', questionsError.message);
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }

    const questionnaire = {
      id,
      name: questionnaireData.name,
      questions: questionsData || [],
    };

    res.status(200).json(questionnaire);
  } catch (error) {
    console.error('Error fetching questionnaire:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch questionnaire' });
  }
}
