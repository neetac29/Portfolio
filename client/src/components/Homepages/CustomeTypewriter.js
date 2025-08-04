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
      readOnly
      style={{
        fontSize: "20px",
        padding: "12px",
        whiteSpace: "pre-line",
        backgroundColor: "transparent",
        outline: "none",
        border: "none",
        color: "rgb(241,240,240)",
        letterSpacing: "0.1rem",
        fontStyle: "italic",
        textShadow:
          "1px 1px 2px black, 0 0 1em rgb(21,164,221), 0 0 0.2em rgb(17,17,17)",
        marginTop: "70%",
        alignContent:"center"
      }}
    />
  );
};

export default CustomTypewriter;
