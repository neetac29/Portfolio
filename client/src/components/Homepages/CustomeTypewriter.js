import React, { useEffect, useState } from "react";

const messages = [
  "Full Stack Developer | 5+ Years of Experience | BE Graduate | CDAC Certified | Expert in Angular, React.js, Node.js, Express.js, MongoDB, PostgreSQL | Skilled in Scalable Web App Development, Unit Testing & Documentation",
];

const CustomTypewriter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (msgIndex < messages.length) {
      if (charIndex < messages[msgIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + messages[msgIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 100); // typing speed
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + "\n");
          setMsgIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 800); // pause before next line
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setMsgIndex(0);
        setCharIndex(0);
      }, 1500); // pause before restarting
    }

    return () => clearTimeout(timeout);
  }, [msgIndex, charIndex]);

  return (
      <textarea
        rows="10"
        cols="80"
        value={displayedText}
        className="typewriter-box"
        readOnly
      />
  );
};

export default CustomTypewriter;
