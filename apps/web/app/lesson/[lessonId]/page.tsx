import Lesson from "@/components/dynamicLessonPage";

export default async function Page({ params }: any) {
  const resolved = await params; // unwrap the promise
  return <Lesson params={resolved} />;
}
