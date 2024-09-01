import { useRouter } from 'next/router';
import Questionnaire from '../questionnaire';

const QuestionnairePage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <p>Loading...</p>;
    }

    return <Questionnaire questionnaireId={id as string} />;
};

export default QuestionnairePage;