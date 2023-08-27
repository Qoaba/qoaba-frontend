export default function Page({ params }: {
  params: { question: string }
}) {
  return <h1>Question {params.question}</h1>;
}
