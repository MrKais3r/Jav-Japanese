import Lesson from "@/components/DynamicLessonPage";

export default async function Page({ params }: any) {
  const resolved = await params; // unwrap the promise
  return <Lesson params={resolved} />;
}
