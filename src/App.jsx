import randomWords from "random-words";
import { BsGithub } from "react-icons/bs";

import Words from "./components/Words";
import Inputs from "./components/Inputs";
import Container from "./components/Container";
import { useEffect, useState, useRef } from "react";

const App = () => {
  const [words, setWords] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState([]);

  const [curWordIndex, setCurWordIndex] = useState(0);
  const [curCharIndex, setCurCharIndex] = useState(-1);
  const [curChar, setCurChar] = useState("");

  const [status, setStatus] = useState("pending");

  const [counter, setCounter] = useState(60);
  const [inputWords, setInputWords] = useState("");

  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const inputRef = useRef();

  const getRandomWords = () => {
    // return randomWords(100);
    return new Array(100).fill(null).map(() => randomWords());
  };

  useEffect(() => {
    setWords(getRandomWords());
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (status === "started") {
        setCounter((curCounter) => {
          if (curCounter === 0) {
            setStatus("finished");
            inputRef.current.disabled = true;
            clearInterval(interval);
            return curCounter;
          } else {
            return curCounter - 1;
          }
        });
      } else {
        return;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const onChangeHandler = (charCount) => {
    // setCurrentChar(charCount.split(""));

    if (counter === 0) {
      return;
    } else {
      setStatus("started");
    }
  };

  const onKeyUp = ({ key, keyCode }) => {
    if (status === "started" && counter !== 0) {
      if (keyCode === 32) {
        checkWords(inputWords);
        setInputWords("");
        setCurWordIndex((val) => val + 1);
        setCurCharIndex(-1);
      } else if (keyCode === 8) {
        setCurCharIndex((val) => val - 1);
        setCurChar("");
      } else {
        setCurCharIndex((val) => val + 1);
        setCurChar(key);
      }
    } else {
      return;
    }
  };

  const checkWords = (wordInput) => {
    if (wordInput.trim() === words[curIndex]) {
      setCorrect((curVal) => curVal + 1);
      setCurIndex((curIdx) => curIdx + 1);

      // setCurrentChar((curChar) => curChar + 1);

      setCorrectWord((curWord) => [
        ...curWord,
        {
          curIndex,
          userInput: wordInput.trim(),
          word: words[curIndex],
          isTrue: true,
        },
      ]);
    } else {
      setIncorrect((curVal) => curVal + 1);
      setCurIndex((curIdx) => curIdx + 1);

      // setCurrentChar((curChar) => curChar + 1);

      setCorrectWord((curWord) => [
        ...curWord,
        {
          curIndex,
          userInput: wordInput.trim(),
          word: words[curIndex],
          isTrue: false,
        },
      ]);
    }
  };

  const wordRef = useRef();

  const refreshHandler = () => {
    setWords(getRandomWords());
    setCurIndex(0);
    setCorrectWord([]);
    setCounter(60);
    setCorrect(0);
    setIncorrect(0);
    setStatus("pending");
    setInputWords("");
    setCurWordIndex(0);
    inputRef.current.focus();
    inputRef.current.disabled = false;
    wordRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <div>
        <div className="text-white">
          <p>Choose duration below every try (default will be 60 seconds)</p>
          <div>
            <button
              type="button"
              className="mr-4"
              onClick={() => setCounter(20)}
            >
              20
            </button>
            <button
              type="button"
              className="mr-4"
              onClick={() => setCounter(40)}
            >
              40
            </button>
            <button
              type="button"
              className="mr-4"
              onClick={() => setCounter(60)}
            >
              60
            </button>
          </div>
          <div className="mb-8 mt-4 font-semibold">
            TIMER: {counter} seconds
          </div>
        </div>
        <div className="text-white mb-1">
          Accuracy:{" "}
          <span>
            {correct === 0 && incorrect === 0
              ? ""
              : Number.parseFloat(
                  (correct / (correct + incorrect)) * 100
                ).toFixed(2) + "%"}
          </span>
        </div>
        <div className="text-white mb-4">
          WPM: <span>{correct !== 0 && correct + " per Minute"} </span>
        </div>
      </div>
      <Words
        randomWords={words}
        correctWord={correctWord}
        charIndex={curCharIndex}
        wordIndex={curWordIndex}
        curChar={curChar}
        status={status}
        wordRef={wordRef}
      />
      <Inputs
        onCharChange={onChangeHandler}
        inputWords={inputWords}
        setInputWords={setInputWords}
        focusRef={inputRef}
        onKeyUpHandler={onKeyUp}
      />
      <button
        type="button"
        className="mt-8 text-white border border-white px-6 py-4 hover:border-opacity-50"
        onClick={refreshHandler}
      >
        Try Again
      </button>
      <div className="mt-[8rem] flex justify-center items-center">
        <a
          href="https://github.com/ssatriya/typingtest-react"
          className="text-yellow-400"
          target="__blank"
        >
          Visit GitHub for Repo
        </a>
      </div>
    </Container>
  );
};

export default App;
