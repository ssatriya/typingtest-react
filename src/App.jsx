import randomWords from "random-words";

import Words from "./components/Words";
import Inputs from "./components/Inputs";
import Button from "./components/UI/Button";
import Container from "./components/UI/Container";
import { useEffect, useState, useRef } from "react";
import Result from "./components/Result";

const App = () => {
  const [words, setWords] = useState([]);
  const [duration, setDuration] = useState(60);
  const [curIndex, setCurIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState([]);
  const [curWordIndex, setCurWordIndex] = useState(0);
  const [status, setStatus] = useState("pending");
  const [counter, setCounter] = useState(duration);
  const [inputWords, setInputWords] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [charIndex, setCharIndex] = useState(-1);
  const [curChar, setCurChar] = useState([]);
  const [isBlur, setIsBlur] = useState(true);

  const inputRef = useRef();
  const wordRef = useRef();

  const getRandomWords = () => {
    return new Array(100).fill(null).map(() => randomWords());
  };

  useEffect(() => {
    setWords(getRandomWords());
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "pending") {
        return setIsBlur(true);
      }
    }, 10000);

    if (status === "finished") {
      return setIsBlur(true);
    }

    return () => clearTimeout(timeout);
  }, [isBlur, status]);

  const onChangeHandler = () => {
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
        setCharIndex(-1);
        setCurWordIndex((val) => val + 1);
      } else if (keyCode === 8) {
        setCharIndex((val) => val - 1);
        setCurChar(words[curIndex][charIndex - 1]);
      } else {
        setCharIndex((val) => val + 1);
        setCurChar(key);
      }
    } else {
      return;
    }
  };

  const checkWords = (wordInput) => {
    if (wordInput.trim() === words[curIndex]) {
      setCorrect((curVal) => curVal + words[curIndex].length);
      setCurIndex((curIdx) => curIdx + 1);

      setCorrectWord((curWord) => [
        ...curWord,
        {
          curIndex,
          userInput: wordInput.trim(),
          word: words[curIndex],
          isTrue: true,
          charLength: words[curIndex].length,
        },
      ]);
    } else {
      setIncorrect((curVal) => curVal + words[curIndex].length);
      setCurIndex((curIdx) => curIdx + 1);

      setCorrectWord((curWord) => [
        ...curWord,
        {
          curIndex,
          userInput: wordInput.trim(),
          word: words[curIndex],
          isTrue: false,
          charLength: words[curIndex].length,
        },
      ]);
    }
  };

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
    setCharIndex(-1);
    setIsBlur(true);

    inputRef.current.focus();
    inputRef.current.disabled = false;
    wordRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <Result
        setDuration={setDuration}
        duration={duration}
        counter={counter}
        correct={correct}
        incorrect={incorrect}
        status={status}
      />
      <div className="relative">
        <Words
          randomWords={words}
          correctWord={correctWord}
          curWordIndex={curWordIndex}
          wordRef={wordRef}
          status={status}
          charIndex={charIndex}
          curChar={curChar}
          isBlur={isBlur}
        />
        <Inputs
          setIsBlur={setIsBlur}
          onCharChange={onChangeHandler}
          inputWords={inputWords}
          setInputWords={setInputWords}
          focusRef={inputRef}
          onKeyUpHandler={onKeyUp}
        />
      </div>
      <Button
        className="mt-8 text-white border border-white px-6 py-4 hover:border-opacity-50"
        onClick={refreshHandler}
      >
        Try Again
      </Button>
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
