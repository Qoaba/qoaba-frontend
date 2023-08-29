"use client";

import { useEffect, useState } from 'react';
import { NotFoundTitle } from './404page';
import { HeaderMegaMenu } from "../Header";
import { FaqSimple } from './dropdown';

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
      < HeaderMegaMenu />
      <FaqSimple questionData={questionData} />
    </div>
  );
}