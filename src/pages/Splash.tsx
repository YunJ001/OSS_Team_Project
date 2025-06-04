import { useGSAP } from "@gsap/react";
import BookIcon from "../assets/book_icon.png";
import gsap from "gsap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface QuotesInteface {
  author: string;
  content: string;
}

const Splash = () => {
  gsap.registerPlugin(useGSAP);
  const nav = useNavigate();
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".splash",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 }
    );
  }, []);
  const [quote, setQuote] = useState<QuotesInteface>();
  useEffect(() => {
    const getQuotes = async () => {
      const data = await axios.get("http://api.quotable.io/random");
      setQuote(data.data);
    };
    getQuotes();
    setTimeout(() => {
      nav("/home");
    }, 3000);
  }, []);
  return (
    <div className="flex flex-col items-center gap-5 justify-center w-[100vw] h-[100vh] splash">
      <div className="text-xl tablet:text-3xl font-bold">
        Today's English & Quotes
      </div>

      <div>
        <img src={BookIcon} alt="icon" className="w-[50px]" />
        <BeatLoader color="#674100" size={13} />
      </div>
      <div className="tablet:max-w-[60%] px-5 flex-col items-center w-full">
        <div className="text-center">{quote?.content}</div>
        <div className="w-full text-end text-neutral-400">
          - {quote?.author}
        </div>
      </div>
    </div>
  );
};

export default Splash;
