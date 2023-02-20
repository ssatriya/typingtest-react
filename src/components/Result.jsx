import React from "react";

import Button from "./UI/Button";

const Result = ({ duration, correct, incorrect, status }) => {
  return (
    <div
      className={`${
        status === "started"
          ? "opacity-0 ease-out duration-100"
          : "opacity-100 ease-in duration-100"
      } mb-12 flex justify-between`}
    >
      <div className="text-white mb-1">
        Accuracy:{" "}
        {correct === 0 ? (
          ""
        ) : (
          <span className="text-yellow-400">
            {Number.parseFloat((correct / (correct + incorrect)) * 100).toFixed(
              2
            )}
          </span>
        )}
        {" %"}
      </div>
      <div className="text-white mb-4">
        WPM:{" "}
        <span className="text-yellow-400">{correct / 5 / (duration / 60)}</span>
        <span> per Minute</span>
      </div>
    </div>
  );
};

export default Result;
