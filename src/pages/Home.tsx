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
      {/* navbar */}
      <div></div>
      {/* Title */}
      <div></div>
      {/* Main */}
      <div></div>
    </div>
  );
};

export default Home;
