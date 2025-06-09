import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundImage from "../assets/background_2.jpg";

// 단어 데이터 타입 정의의
interface WordData {
  english: string;
  korean: string;
}

interface WordResult extends WordData {
  isCorrect: boolean;
}

const Test = () => {
  // 페이지 이동 횟수
  const navigate = useNavigate();
  // 이전 페이지에서 넘겨준 state 접근
  const location = useLocation();
  // word 섹션에서 넘겨준 단어 배열을 받아옴.
  const allWords: WordData[] = location.state?.words || [];

  const [currentIndex, setCurrentIndex] = useState(-1); // 테스트 시작 전
  const [userAnswer, setUserAnswer] = useState(""); // 사용자의 입력값
  const [score, setScore] = useState(0); // 맞힌 갯수
  const [isFinished, setIsFinished] = useState(false); // 테스트 종료 여부
  const [wordResults, setWordResults] = useState<WordResult[]>([]);

  // 테스트 시작 버튼 클릭 시 첫 문제로 진입
  const handleStart = () => {
    setCurrentIndex(0);
  };

  const handleAnswerSubmit = () => {
    const correctAnswer = allWords[currentIndex].korean.trim();
    const userAnswerTrimmed = userAnswer.trim();
    const isCorrect = correctAnswer === userAnswerTrimmed;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setWordResults((prev) => [
      ...prev,
      {
        ...allWords[currentIndex],
        isCorrect,
      },
    ]);

    setUserAnswer("");
    if (currentIndex + 1 < allWords.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleReviewClick = () => {
    navigate("/review", { state: { words: wordResults } });
  };

  if (allWords.length === 0) {
    return (
      <div className="bg-black text-white h-screen flex justify-center items-center">
        단어 데이터가 없습니다. 홈으로 돌아가주세요.
      </div>
    );
  }

  return (
    <div
      className="bg-black text-white h-screen flex flex-col justify-center items-center bg-cover bg-center px-6 text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {currentIndex === -1 ? (
        // 테스트 시작 전 화면
        <>
          <br />
          <h1 className="text-3xl tablet:text-5xl font-bold mb-6">
            Let's get Test!
          </h1>
          <button
            className="mt-12 bg-gray-800/70 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-xl"
            onClick={handleStart}
          >
            Start!
          </button>
        </>
      ) : isFinished ? (
        <>
          <div className="absolute top-6 right-6 text-lg">
            {allWords.length}/{allWords.length}
          </div>
          <div className="text-3xl tablet:text-5xl font-bold mb-8">
            {score} / {allWords.length}
          </div>
          <p className="tablet:text-4xl text-lg mb-6">🎉고생했어요🎉</p>
          <p className="tablet:text-4xl text-lg mb-8">
            틀린 단어 복습 잊지 말기!
          </p>
          <br />
          <div className="flex space-x-8">
            <button
              className="bg-gray-700/70 hover:bg-gray-600/70 text-white font-bold py-3 px-8 rounded-full text-xl"
              onClick={handleHomeClick}
            >
              Home
            </button>
            <button
              className="bg-gray-700/70 hover:bg-gray-600/70 text-white font-bold py-3 px-8 rounded-full text-xl"
              onClick={handleReviewClick}
            >
              Review
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-6 right-6 text-lg">
            {currentIndex + 1}/{allWords.length}
          </div>
          <div className="text-xl tablet:text-3xl mb-4">
            {allWords[currentIndex].english}
          </div>
          <input
            type="text"
            className="bg-black border border-gray-400 rounded-md px-4 py-2 text-white text-lg text-center focus:outline-none"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="한국말"
          />
          <button
            className="mt-6 bg-gray-200 text-black text-lg font-bold py-2 px-6 rounded-md hover:bg-white"
            onClick={handleAnswerSubmit}
          >
            제출
          </button>
        </>
      )}
    </div>
  );
};

export default Test;
