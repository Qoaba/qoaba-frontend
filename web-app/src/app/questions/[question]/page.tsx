"use client";

import { useEffect, useState } from 'react';
import { NotFoundTitle } from './404page';

export default function Page({ params }: {
  params: { question: string }
}) {
  const [questionData, setQuestionData] = useState<any>(null);
  
  useEffect(() => {
    // Define the URL for the API call
    const apiUrl = `http://localhost:8000/api/questions/${params.question}`;

    // Make the API call using the fetch function
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setQuestionData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [params.question]);

  if (!questionData) {
    return <NotFoundTitle />
  }

  return (
    <div>
      <h1>Question {params.question}</h1>
      {/* Render question data here */}
      <pre>{JSON.stringify(questionData, null, 2)}</pre>
    </div>
  );
}
