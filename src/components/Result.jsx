import React from "react";

import Button from "./UI/Button";

const Result = ({
  setDuration,
  duration,
  counter,
  correct,
  incorrect,
  status,
}) => {
  return (
    <div
      className={`${
        status === "started"
          ? "opacity-0 ease-out duration-100"
          : "opacity-100 ease-in duration-100"
      } mb-12`}
    >
      <div className="text-white">
        <p>Choose duration below every try (default will be 60 seconds)</p>
        <div>
          <Button onClick={() => setDuration(15)} className={"mr-4"}>
            15
          </Button>
          <Button onClick={() => setDuration(30)} className={"mr-4"}>
            30
          </Button>
          <Button onClick={() => setDuration(45)} className={"mr-4"}>
            45
          </Button>
          <Button onClick={() => setDuration(60)} className={"mr-4"}>
            60
          </Button>
        </div>
        <div className="mb-8 mt-4 font-semibold">TIMER: {counter} seconds</div>
      </div>
      <div className="text-white mb-1">
        Accuracy:{" "}
        {correct === 0
          ? ""
          : Number.parseFloat((correct / (correct + incorrect)) * 100).toFixed(
              2
            )}
        <span> %</span>
      </div>
      <div className="text-white mb-4">
        WPM: <span>{correct / 5 / (duration / 60)} per Minute</span>
      </div>
    </div>
  );
};

export default Result;
