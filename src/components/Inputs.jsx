import React, { useState } from "react";

const Inputs = ({
  onSpaceHit,
  onCharChange,
  setInputWords,
  inputWords,
  focusRef,
  onKeyUpHandler,
}) => {
  // const [inputWords, setInputWords] = useState("");
  // const [typedIdx, setTypedIdx] = useState(0);

  const onChangeHandler = (e) => {
    const input = e.target.value;
    setInputWords(input);

    onCharChange(input);
  };

  // const onKeyUpHandler = (e) => {
  //   if (e.keyCode === 32) {
  //     onSpaceHit(inputWords);

  //     setInputWords("");
  //   } else if (e.keyCode === 8) {
  //     setTypedIdx((curVal) => curVal - 1);
  //   } else {
  //     setTypedIdx((curVal) => curVal + 1);
  //   }
  // };

  // console.log(typedIdx);

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        className="bg-slate-300 w-[800px] h-[70px] outline-none px-6 py-4 text-center text-lg"
        value={inputWords}
        onKeyUp={onKeyUpHandler}
        onChange={onChangeHandler}
        ref={focusRef}
      />
    </div>
  );
};

export default Inputs;
