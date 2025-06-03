import React, { useState, useEffect } from "react";

interface Word {
  word: string;
  definition: string;
}

const ReviewPage: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleDefs, setVisibleDefs] = useState<{ [key: string]: boolean }>({});

  const exampleWords: Word[] = [
    { word: "apple", definition: "A fruit that is red or green" },
    { word: "banana", definition: "A long yellow fruit" },
    { word: "cat", definition: "A small domesticated animal" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setWords(exampleWords);
      setIsLoading(false);
    }, 500);
  }, []);

  const toggleDefinition = (word: string) => {
    setVisibleDefs((prev) => ({
      ...prev,
      [word]: !prev[word],
    }));
  };

  const sortWords = () => {
    const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word));
    setWords(sorted);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">시험 단어 리뷰</h1>
      <p className="mb-4 text-gray-700">총 {words.length}개 단어</p>

      <button
        onClick={sortWords}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        가나다순 정렬
      </button>

      {isLoading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {words.map(({ word, definition }) => (
            <li
              key={word}
              onClick={() => toggleDefinition(word)}
              className="text-lg cursor-pointer hover:text-blue-600"
            >
              <strong>{word}</strong>
              {visibleDefs[word] && <span>: {definition}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPage;
