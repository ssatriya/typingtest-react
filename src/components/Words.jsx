import React, { useEffect, useRef } from "react";

const Words = ({
  randomWords,
  correctWord,
  charIndex,
  wordIndex,
  curChar,
  status,
}) => {
  const wordRef = useRef();

  // console.log(wordIndex);

  useEffect(() => {
    if (!wordRef) {
      return;
    } else {
      wordRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [correctWord]);

  // const getClass = (wordIdx, charIdx, char) => {
  //   if (
  //     wordIdx === wordIndex &&
  //     charIdx === charIndex &&
  //     curChar &&
  //     status !== "finished"
  //   ) {
  //     if (char === curChar) {
  //       return "bg-green-300";
  //     } else {
  //       return "bg-red-300";
  //     }
  //   } else if (
  //     wordIdx === wordIndex &&
  //     charIndex >= randomWords[wordIndex].length
  //   ) {
  //     return "bg-red-300";
  //   } else {
  //     return "";
  //   }
  // };

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="w-[800px] h-[105px] bg-slate-300 flex justify-center items-center">
        <div className="w-[800px] h-[85px] bg-slate-300 overflow-hidden text-ellipsis px-4 flex-col items-center justify-center">
          <p className="block w-[100%] break-words">
            {/* {randomWords.map((word, i) => (
              <span key={i}>
                <span key={i}>
                  {word.split("").map((char, idx) => (
                    <span key={idx} className={`${getClass(i, idx, char)}`}>
                      {char}
                    </span>
                  ))}
                </span>

                <span> </span>
              </span>
            ))} */}
            {randomWords.map((word, i) => (
              <span key={i} className="text-lg">
                {correctWord[i] ? (
                  correctWord[i] && (
                    <span
                      className={
                        correctWord[i]?.isTrue ? "bg-green-200" : "bg-red-200"
                      }
                      ref={wordRef}
                    >
                      {word}
                    </span>
                  )
                ) : i === wordIndex ? (
                  <span className="bg-black bg-opacity-30 py-2 px-1">
                    {word}
                  </span>
                ) : (
                  <span className="opacity-50">{word}</span>
                )}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Words;
