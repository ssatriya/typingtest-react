import React from "react";

const Inputs = ({
  onCharChange,
  setInputWords,
  inputWords,
  focusRef,
  onKeyUpHandler,
  setIsBlur,
}) => {
  const onChangeHandler = (e) => {
    const input = e.target.value;
    setInputWords(input);

    onCharChange(input);
  };

  return (
    <div className="flex justify-center items-center top-0 absolute">
      <input
        type="text"
        className="bg-slate-300 w-[250px] h-[105px] sm:w-[570px] md:w-[700px] lg:w-[800px] outline-none text-center text-lg opacity-0 cursor-default"
        value={inputWords}
        onKeyUp={onKeyUpHandler}
        onChange={onChangeHandler}
        ref={focusRef}
        onClick={() => setIsBlur(false)}
      />
    </div>
  );
};

export default Inputs;
