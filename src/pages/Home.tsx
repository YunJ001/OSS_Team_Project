import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import backgroundImage from "../assets/main_background.jpg";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [soundOn, setSoundOn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/Technology.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Handle sound state changes
    if (audioRef.current) {
      if (soundOn) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error);
            setSoundOn(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundOn]);

  const handleSoundToggle = () => {
    setSoundOn(!soundOn);
  };

  const cards = [
    {
      title: "Today's Word",
      description: "오늘의 영단어를 확인해보세요.",
      route: "/word",
    },
    {
      title: "Test",
      description: "배운 단어를 테스트해요!\n(오늘의 단어 확인 후 보기 가능.)",
      route: "/test",
    },
    {
      title: "Review",
      description: "공부한 내용을 복습해요!\n(테스트 후 보기 가능.)",
      route: "/review",
    },
  ];

  const Card = ({ card }: { card: (typeof cards)[0] }) => (
    <div
      className="relative w-[260px] h-[360px] rounded-[24px] cursor-pointer group mx-auto"
      onClick={() => navigate(card.route)}
    >
      <div
        className="w-full h-full rounded-[24px] flex justify-center items-center relative border border-gray-300"
        style={{
          backgroundColor: "white",
          boxShadow: "inset 0 10px 24px rgba(0,0,0,0.5)",
        }}
      >
        <span className="text-2xl font-bold text-gray-800 group-hover:opacity-0 transition duration-300">
          {card.title}
        </span>
        <div className="absolute inset-0 bg-gray-700 bg-opacity-90 rounded-[24px] flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="whitespace-pre-line text-white text-center font-bold text-base px-4">
            {card.description}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Sound toggle button */}
      <div className="absolute top-6 right-6 flex items-center gap-4 text-white text-2xl z-10">
        <button
          onClick={handleSoundToggle}
          className="hover:scale-110 transition-transform duration-200"
        >
          {soundOn ? <FaMusic /> : <FaVolumeMute />}
        </button>
      </div>
      {/* Title */}
      <div className="mt-[4vh] mb-[2vh] text-white text-5xl font-bold tracking-wide leading-tight">
        STUDY English
      </div>
      <div className="mb-[6vh] text-orange-300 text-3xl font-semibold">
        with
      </div>
      {/* Main */}
      {isMobile ? (
        <div className="w-full max-w-md px-4">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="h-[360px]"
          >
            {cards.map((card) => (
              <SwiperSlide
                key={card.title}
                className="flex justify-center items-center"
              >
                <Card card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-end gap-[7vw] px-6">
          {cards.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
