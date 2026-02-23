import QuizPage from "@/components/dynamicImageQuizPage";
import VocabPage from "@/components/dynamicVocabPage";

export default async function Page({ params }: any) {
    const resolved = await params;
    const { sectionId } = resolved;

    // Numeric section IDs like "1", "4" → image quiz page (kana quizzes)
    if (!isNaN(Number(sectionId))) {
        return <QuizPage params={resolved} />;
    }

    // Grammar/culture sections → MCQ quiz page
    if (sectionId.includes("grammar") || sectionId.includes("culture")) {
        return <QuizPage params={resolved} />;
    }

    // Vocab/kana/greetings/numbers sections → vocab flashcard page
    return <VocabPage params={resolved} />;
}
