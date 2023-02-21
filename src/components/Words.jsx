import React, { useEffect } from "react";

import BlurText from "./UI/BlurText";

const Words = ({
  randomWords,
  correctWord,
  curWordIndex,
  wordRef,
  charIndex,
  curChar,
  isBlur,
}) => {
  useEffect(() => {
    if (!wordRef) {
      return;
    } else {
      wordRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [correctWord]);

  const styles = (charIdx, char) => {
    if (charIdx === charIndex && curChar[charIdx] !== char) {
      return " bg-red-400 ease-in-out text-black";
    } else if (charIdx === charIndex && curChar[charIdx] === char) {
      return " bg-green-400 ease-in-out text-black";
    } else {
      return "";
    }
  };

  console.log(curChar);

  return (
    <>
      {isBlur && (
        <BlurText
          className={
            "absolute top-[50%] translate-y-[-50%] text-yellow-400 font-semibold w-full text-center "
          }
        >
          Click here and start typing
        </BlurText>
      )}
      <div
        className={`flex justify-center items-center mb-8 text-white ${
          isBlur ? "blur-sm" : ""
        } ease-in-out duration-200 relative`}
      >
        <div className="w-[250px] h-[105px] sm:w-[570px] md:w-[700px] lg:w-[800px] bg-transparent flex justify-center items-center">
          <div className="w-[800px] h-[85px] bg-transparent overflow-hidden text-ellipsis flex-col items-center justify-center">
            <p className="block w-[100%] break-words">
              {randomWords.map((word, i) => (
                <span key={i} className="text-lg">
                  {correctWord[i] ? (
                    correctWord[i] && (
                      <span
                        className={
                          correctWord[i]?.isTrue
                            ? "border-b-4 border-x-0 border-t-0 border-green-500 ease-in-out duration-100"
                            : "border-b-4 border-x-0 border-t-0 border-red-500 ease-in-out duration-100"
                        }
                      >
                        {word}
                      </span>
                    )
                  ) : i === curWordIndex ? (
                    <span
                      className="bg-black bg-opacity-40 py-1 px-1 ease-in-out duration-100 top-0"
                      ref={wordRef}
                    >
                      {word.split("").map((w, idx) => (
                        <span
                          key={idx}
                          className={styles(idx, w)}
                          ref={wordRef}
                        >
                          {w}
                        </span>
                      ))}
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
    </>
  );
};

export default Words;
