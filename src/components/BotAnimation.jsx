// /src/components/BotAnimation.jsx
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function BotAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("ai-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <Lottie animationData={animationData} loop={true} className="w-80 md:w-200 lg:w-300   opacity-50 mx-auto " />
  );
}
  