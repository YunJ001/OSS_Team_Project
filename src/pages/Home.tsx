import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import backgroundImage from '../assets/main_background.jpg';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [soundOn, setSoundOn] = useState(true);

  const cards = [
    {
      title: "Today's Word",
      description: '오늘의 영단어를 확인해보세요.',
      route: '/word',
    },
    {
      title: 'Test',
      description: '배운 단어를 테스트해요!\n(오늘의 단어 확인 후 보기 가능.)',
      route: '/test',
    },
    {
      title: 'Review',
      description: '공부한 내용을 복습해요!\n(테스트 후 보기 가능.)',
      route: '/review',
    },
  ];

  return (
    <div className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Sound toggle button */}
      <div className="absolute top-6 right-6 flex items-center gap-4 text-white text-2xl z-10">
        <button onClick={() => setSoundOn(!soundOn)}>{soundOn ? <FaMusic /> : <FaVolumeMute />}</button>
      </div>
      {/* Title */}
      <div className="mt-[4vh] mb-[2vh] text-white text-5xl font-bold tracking-wide leading-tight">STUDY English</div>
      <div className="mb-[6vh] text-orange-300 text-3xl font-semibold">with</div>
      {/* Main */}
      <div className="flex flex-row justify-center items-end gap-[7vw] px-6">
        {cards.map((card) => (
          <div key={card.title} className="relative w-[260px] h-[360px] rounded-[24px] cursor-pointer group" onClick={() => navigate(card.route)}>
            {/* 카드 본체 */}
            <div
              className="w-full h-full rounded-[24px] flex justify-center items-center relative border border-gray-300"
              style={{
                backgroundColor: 'white',
                boxShadow: 'inset 0 10px 24px rgba(0,0,0,0.5)',
              }}
            >
              {/* 기본 텍스트 (hover 시 숨김) */}
              <span className="text-2xl font-bold text-gray-800 group-hover:opacity-0 transition duration-300">{card.title}</span>

              {/* Hover 시 설명 표시 */}
              <div className="absolute inset-0 bg-gray-700 bg-opacity-90 rounded-[24px] flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="whitespace-pre-line text-white text-center font-bold text-base px-4">{card.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
