import React from "react";

const Inputs = ({
  onCharChange,
  setInputWords,
  inputWords,
  focusRef,
  onKeyUpHandler,
}) => {
  const onChangeHandler = (e) => {
    const input = e.target.value;
    setInputWords(input);

    onCharChange(input);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        className="bg-slate-300 w-[250px] h-[70px] sm:w-[570px] md:w-[700px] lg:w-[800px] outline-none px-6 py-4 text-center text-lg"
        value={inputWords}
        onKeyUp={onKeyUpHandler}
        onChange={onChangeHandler}
        ref={focusRef}
      />
    </div>
  );
};

export default Inputs;
