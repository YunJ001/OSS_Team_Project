import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

const Layout = () => {
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
  return (
    <div>
      {/* Sound toggle button */}
      <div className="absolute top-6 right-6 flex items-center gap-4 text-white text-2xl z-10">
        <button
          onClick={handleSoundToggle}
          className="hover:scale-110 transition-transform duration-200"
        >
          {soundOn ? <FaMusic /> : <FaVolumeMute />}
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
