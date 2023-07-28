import { useState, useEffect } from "react";

const Typewriter = ({ text }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [underlineText, setUnderlineText] = useState(false);

  useEffect(() => {
    let timeout;

    if (currentIndex <= text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
    } else {
      setCurrentText(text);
      // setCurrentIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, , text]);

  return (
    <span
    className={`${underlineText ? "underline" : ""} cursor-pointer`}
      onMouseEnter={() => setUnderlineText(true)}
      onMouseLeave={() => setUnderlineText(false)}>
      {currentText}
    </span>
  );
};

export default Typewriter;
