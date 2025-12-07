import QuizPage from "@/components/dynamicImageQuizPage";

export default async function Page({ params }: any) {
  const resolved = await params; // unwrap the promise
  return <QuizPage params={resolved} />;
}
