import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { questionnaireId } = req.query;

    // Replace this with your database query logic
    const junctionData = await getJunctionDataByQuestionnaireId(questionnaireId as string);

    res.status(200).json(junctionData);
}

// Example function to get junction data based on questionnaire ID
async function getJunctionDataByQuestionnaireId(questionnaireId: string) {
    // Replace this with your actual database query
    return [
        { questionId: 1, priority: 1 },
        { questionId: 2, priority: 3 },
        { questionId: 3, priority: 2 },
    ];
}

