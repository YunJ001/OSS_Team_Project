import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background_2.jpg';

interface WordData {
  english: string;
  korean: string;
}

const Word = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWordData, setCurrentWordData] = useState<WordData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [allWordsForSession, setAllWordsForSession] = useState<WordData[]>([]);

  const navigate = useNavigate();
  const WORDS_API_KEY = import.meta.env.VITE_WORDS_API_KEY;
  const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

  // 영어 단어를 한국어로 번역하는 함수
  const translateEnglishToKorean = async (englishWord: string): Promise<string> => {
    if (!GOOGLE_TRANSLATE_API_KEY) {
      console.error("Google Translate API Key is not set.");
      return "번역 API 키 없음";
    }
    try {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: englishWord, source: 'en', target: 'ko', format: 'text' }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Translation API error: ${errorData.error ? errorData.error.message : response.statusText}`);
      }
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (e: any) {
      console.error("Error during translation:", e);
      if (e.message.includes("API key not valid")) return "번역 실패: API 키가 유효하지 않습니다.";
      else if (e.message.includes("daily limit exceeded")) return "번역 실패: 일일 사용량 한도 초과.";
      return `번역 실패: ${e.message}`;
    }
  };

  // N개의 단어를 API에서 가져오고 번역하여 저장하는 함수
  const fetchAndTranslateWords = async (count: number) => {
    setIsLoading(true);
    setLoadingMessage(`단어 불러오는 중...`); // 초기 로딩 메시지
    setError(null);
    const fetchedWords: WordData[] = [];
    const MAX_ATTEMPTS_PER_WORD = 5;

    for (let i = 0; i < count; i++) {
      let foundValidWord = false;
      let attempts = 0;

      while (!foundValidWord && attempts < MAX_ATTEMPTS_PER_WORD) {
        attempts++;
        setLoadingMessage(`단어 ${i + 1}개째 불러오는 중...`); 

        try {
          const wordsApiResp = await fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true&limit=1`, {
            headers: { 'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com', 'X-RapidAPI-Key': WORDS_API_KEY }
          });
          if (!wordsApiResp.ok) throw new Error(`WordsAPI error! Status: ${wordsApiResp.status}`);
          const wordsApiData = await wordsApiResp.json();
          const englishWord = wordsApiData.word;
          
          if (!englishWord) {
            throw new Error("Could not find a valid word from WordsAPI.");
          }

          setLoadingMessage(`'${englishWord}' 번역 중... (${i + 1}/${count})`);
          const koreanTranslation = await translateEnglishToKorean(englishWord);
          fetchedWords.push({ english: englishWord, korean: koreanTranslation });
          foundValidWord = true;
        } catch (e: any) {
          console.error(`Error fetching and translating word ${i + 1} (attempt ${attempts}):`, e);
          if (attempts >= MAX_ATTEMPTS_PER_WORD) {
            fetchedWords.push({ english: "오류 단어", korean: `로딩 실패: ${e.message ? e.message.substring(0, 30) : '알 수 없는 오류'}...` });
            setError(`일부 단어 로딩에 실패했습니다. 콘솔을 확인해주세요.`);
            foundValidWord = true;
          }
        }
      }
      if (!foundValidWord) {
        console.warn(`Warning: Could not find a valid word after ${MAX_ATTEMPTS_PER_WORD} attempts for word ${i + 1}.`);
      }
    }
    setAllWordsForSession(fetchedWords);
    if (fetchedWords.length > 0) {
      setCurrentWordData(fetchedWords[0]);
    } else {
      setError("단어를 불러오는 데 실패했습니다. 단어 목록이 비어 있습니다.");
      setCurrentWordData(null);
    }
    setIsLoading(false);
    setLoadingMessage('');
  };

  const handleWordCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWordCount(Number(event.target.value));
  };

  const handleStartClick = async () => {
    if (wordCount <= 0) {
      alert("학습할 단어 수를 1개 이상 입력해주세요!");
      return;
    }
    if (!WORDS_API_KEY) {
      alert("WordsAPI Key가 설정되지 않았습니다. .env 파일에 VITE_WORDS_API_KEY를 설정해주세요.");
      return;
    }
    if (!GOOGLE_TRANSLATE_API_KEY) {
      alert("Google Translate API Key가 설정되지 않았습니다. .env 파일에 VITE_GOOGLE_TRANSLATE_API_KEY를 설정해주세요.");
      return;
    }

    setCurrentWordIndex(0);
    await fetchAndTranslateWords(wordCount);
    setCurrentScreen(2);
  };

  // '다음' 버튼 클릭 시
  const handleNextWord = () => {
    const nextIndex = currentWordIndex + 1;
    if (nextIndex < allWordsForSession.length) {
      setCurrentWordIndex(nextIndex);
      setCurrentWordData(allWordsForSession[nextIndex]);
    } else {
      setCurrentScreen(3); // 마지막 단어에서 '다음' 버튼 클릭 시 '끝!!' 화면으로 전환
    }
  };

  // '이전' 버튼 클릭 시
  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      const prevIndex = currentWordIndex - 1;
      setCurrentWordIndex(prevIndex);
      setCurrentWordData(allWordsForSession[prevIndex]);
      setError(null);
    } else {
      setError("이전 단어가 없습니다.");
    }
  };

  // 'Test' 버튼 클릭 시
  const handleTestClick = () => {
    navigate('/test');
  };

  // 'Home' 버튼 클릭 시
  const handleHomeClick = () => {
    navigate('/home');
  };

  // 화면 렌더링
  if (currentScreen === 1) {
    return (
      <div
        className="bg-black text-white h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-5xl font-bold mb-8">Today's word count?</h1>
        <input
          type="number"
          placeholder="숫자를 입력하세요"
          className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-center text-2xl"
          value={wordCount}
          onChange={handleWordCountChange}
          disabled={isLoading}
        />
        <button
          className="mt-12 bg-gray-800/70 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-xl"
          onClick={handleStartClick}
          disabled={isLoading}
        >
          {isLoading ? loadingMessage : 'Start'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    );
  } else if (currentScreen === 2) {
    if (isLoading || !currentWordData) {
      return (
        <div
          className="bg-black text-white h-screen flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {isLoading ? <div className="loading-text">{loadingMessage}</div> : '단어를 불러올 수 없습니다. 다시 시도해주세요.'}
        </div>
      );
    }

    return (
      <div
        className="bg-black text-white h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-8 right-8 text-2xl">
          {currentWordIndex + 1}/{allWordsForSession.length}
        </div>
        <button
          className="absolute left-8 text-white text-6xl hover:text-gray-400/80"
          onClick={handlePreviousWord}
          disabled={currentWordIndex === 0}
        >
          &lt;
        </button>
        <div className="text-7xl font-bold mb-4">{currentWordData?.english}</div>
        <div className="text-4xl">{currentWordData?.korean}</div>
        <button
          className="absolute right-8 text-white text-6xl hover:text-gray-400/80"
          onClick={handleNextWord}
          disabled={false} // 항상 활성화
        >
          &gt;
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    );
  } else if (currentScreen === 3) {
    return (
      <div
        className="bg-black text-white h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-7xl font-bold mb-8">끝!!</h1>
        <p className="text-4xl mb-12">Test도 도전해보세요!</p>
        <div className="flex space-x-8">
          <button
            className="bg-gray-700/70 hover:bg-gray-600/70 text-white font-bold py-3 px-8 rounded-full text-xl"
            onClick={handleTestClick}
          >
            Test
          </button>
          <button
            className="bg-gray-700/70 hover:bg-gray-600/70 text-white font-bold py-3 px-8 rounded-full text-xl"
            onClick={handleHomeClick}
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return <div className="text-white">알 수 없는 화면입니다.</div>;
};

export default Word;