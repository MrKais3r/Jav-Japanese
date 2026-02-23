import QuizPage from "@/components/dynamicImageQuizPage";
import VocabPage from "@/components/dynamicVocabPage";

export default async function Page({ params }: any) {
    const resolved = await params;
    const { sectionId } = resolved;

    // String section IDs like "1-vocab-1", "2-grammar-3" → vocab/grammar pages
    // Numeric section IDs like "1", "4" → existing image quiz page
    const isStringSection = isNaN(Number(sectionId));

    if (isStringSection) {
        return <VocabPage params={resolved} />;
    }

    return <QuizPage params={resolved} />;
}
