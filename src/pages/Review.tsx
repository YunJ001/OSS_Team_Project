import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background_2.jpg";

interface WordData {
  english: string;
  korean: string;
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

  return (
    <div
      className="bg-black text-white h-screen flex flex-col items-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-3xl tablet:text-5xl font-bold mt-12 mb-8">
        단어 복습
      </h1>
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/70 rounded-lg p-6 mb-8">
          <h2 className="text-xl tablet:text-2xl font-bold mb-4">
            총 {words.length}개의 단어
          </h2>
          <div className="space-y-4">
            {words.map((word, index) => (
              <div
                key={index}
                className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                <div className="text-xl tablet:text-2xl font-bold mb-2">
                  {word.english}
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
