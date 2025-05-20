import { useGSAP } from "@gsap/react";
import BookIcon from "../assets/book_icon.png";
import gsap from "gsap";
import { useEffect } from "react";

const Splash = () => {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".splash",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 }
    );
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `${import.meta.env.VITE_BASE_URL}/home`;
    }, 3000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] splash">
      <img src={BookIcon} alt="icon" className="w-[50px]" />
      <div>Loading...</div>
    </div>
  );
};

export default Splash;
