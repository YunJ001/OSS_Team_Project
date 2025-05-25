import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background_2.jpg';

// 단어 데이터 타입 정의의
interface WordData {
  english: string;
  korean: string;
}

const Test = () => {
  // 페이지 이동 횟수
  const navigate = useNavigate();
  // 이전 페이지에서 넘겨준 state 접근
  const location = useLocation();
  // word 섹션에서 넘겨준 단어 배열을 받아옴.
  const allWords: WordData[] = location.state?.words || [];

  const [currentIndex, setCurrentIndex] = useState(-1); // 테스트 시작 전
  const [userAnswer, setUserAnswer] = useState(''); // 사용자의 입력값
  const [score, setScore] = useState(0); // 맞힌 갯수
  const [isFinished, setIsFinished] = useState(false); // 테스트 종료 여부

    // 테스트 시작 버튼 클릭 시 첫 문제로 진입
  const handleStart = () => {
    setCurrentIndex(0);
  };


  if (allWords.length === 0) {
    return <div className="bg-black text-white h-screen flex justify-center items-center">단어 데이터가 없습니다. 홈으로 돌아가주세요.</div>;
  }

  return (
    <div>
      {/* 테스트 시작 전 화면 */}
      {currentIndex === -1 ? (
        <>
          <br />
          <h1 className="text-3xl tablet:text-5xl font-bold mb-6">Let's get Test!</h1>
          <button
            className="mt-12 bg-gray-800/70 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-xl"
            onClick={handleStart}
          >
            Start!
          </button>
        </>
      ): isFinished ? (
      // 테스트 완료 화면
      ) : (
      // 테스트 문제 풀이 화면
      )}
    </div>
  );
};

export default Test;
