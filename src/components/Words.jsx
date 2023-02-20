import React, { useEffect } from "react";

const Words = ({ randomWords, correctWord, curWordIndex, wordRef }) => {
  useEffect(() => {
    if (!wordRef) {
      return;
    } else {
      wordRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [correctWord]);

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="w-[250px] h-[105px] sm:w-[570px] md:w-[700px] lg:w-[800px] bg-slate-300 flex justify-center items-center">
        <div className="w-[800px] h-[85px] bg-slate-300 overflow-hidden text-ellipsis px-4 flex-col items-center justify-center">
          <p className="block w-[100%] break-words">
            {randomWords.map((word, i) => (
              <span key={i} className="text-lg">
                {correctWord[i] ? (
                  correctWord[i] && (
                    <span
                      className={
                        correctWord[i]?.isTrue ? "bg-green-200" : "bg-red-200"
                      }
                    >
                      {word}
                    </span>
                  )
                ) : i === curWordIndex ? (
                  <span
                    className="bg-black bg-opacity-30 py-1 px-1"
                    ref={wordRef}
                  >
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
