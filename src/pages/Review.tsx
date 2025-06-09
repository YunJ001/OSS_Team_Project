import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background_2.jpg";

interface WordData {
  english: string;
  korean: string;
  isCorrect: boolean;
}

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const words: WordData[] = location.state?.words || [];

  const handleHomeClick = () => {
    navigate("/home");
  };

  if (words.length === 0) {
    return (
      <div className="bg-black text-white h-screen flex justify-center items-center">
        단어 데이터가 없습니다. 홈으로 돌아가주세요.
      </div>
    );
  }

  const correctCount = words.filter((word) => word.isCorrect).length;
  const incorrectCount = words.length - correctCount;

  return (
    <div
      className="bg-black text-white h-screen flex flex-col items-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-3xl tablet:text-5xl font-bold mt-12 mb-4">
        단어 복습
      </h1>
      <div className="text-xl mb-8">
        맞은 단어: {correctCount}개 / 틀린 단어: {incorrectCount}개
      </div>
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/70 rounded-lg p-6 mb-8">
          <h2 className="text-xl tablet:text-2xl font-bold mb-4">
            총 {words.length}개의 단어
          </h2>
          <div className="space-y-4">
            {words.map((word, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg transition-colors ${
                  word.isCorrect
                    ? "bg-green-900/50 hover:bg-green-900/70"
                    : "bg-red-900/50 hover:bg-red-900/70"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xl tablet:text-2xl font-bold">
                    {word.english}
                  </div>
                  <div
                    className={`text-sm px-2 py-1 rounded ${
                      word.isCorrect
                        ? "bg-green-500/50 text-green-200"
                        : "bg-red-500/50 text-red-200"
                    }`}
                  >
                    {word.isCorrect ? "정답" : "오답"}
                  </div>
                </div>
                <div className="text-lg tablet:text-xl text-gray-300">
                  {word.korean}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-gray-700/70 hover:bg-gray-600/70 text-white font-bold py-3 px-8 rounded-full text-xl w-full"
          onClick={handleHomeClick}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Review;
