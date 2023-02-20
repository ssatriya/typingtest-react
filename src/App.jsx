import randomWords from "random-words";
import { IoMdRefresh } from "react-icons/io";

import Words from "./components/Words";
import Inputs from "./components/Inputs";
import Button from "./components/UI/Button";
import Container from "./components/UI/Container";
import { useEffect, useState, useRef } from "react";
import Result from "./components/Result";
import Duration from "./components/Duration";
import Footer from "./components/UI/Footer";

const App = () => {
  const [words, setWords] = useState([]);
  const [duration, setDuration] = useState(60);
  const [curIndex, setCurIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState([]);
  const [curWordIndex, setCurWordIndex] = useState(0);
  const [status, setStatus] = useState("pending");
  const [counter, setCounter] = useState(0);
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

  useEffect(() => {
    setCounter(duration);
  }, [duration]);

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

        setCurChar([]);
      } else if (keyCode === 8) {
        setCharIndex((val) => val - 1);

        setCurChar(curChar.slice(undefined, -1));
      } else {
        setCharIndex((val) => val + 1);

        setCurChar((val) => [...val, key]);
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
    <>
      <Container>
        <Result
          setDuration={setDuration}
          duration={duration}
          counter={counter}
          correct={correct}
          incorrect={incorrect}
          status={status}
        />
        <Duration
          setDuration={setDuration}
          duration={duration}
          status={status}
          counter={counter}
        />
        <div className="mb-4 mt-4 font-semibold text-yellow-400">{counter}</div>
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
        <div className="flex justify-center items-center">
          <Button className="mt-8 text-white " onClick={refreshHandler}>
            <IoMdRefresh className="w-[24px] h-[24px]" />
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default App;
