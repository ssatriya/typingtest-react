import React from "react";

import Button from "./UI/Button";

const Duration = ({ setDuration, duration, status }) => {
  return (
    <div
      className={`${
        status === "started"
          ? "opacity-0 ease-out duration-100"
          : "opacity-100 ease-in duration-100"
      } text-yellow-400`}
    >
      <div className="mb-12 bg-[#063130] py-1 flex justify-end gap-4">
        <Button
          onClick={() => setDuration(15)}
          className={`mr-4 ${duration !== 15 && "opacity-70"}`}
        >
          15
        </Button>
        <Button
          onClick={() => setDuration(30)}
          className={`mr-4 ${duration !== 30 && "opacity-70"}`}
        >
          30
        </Button>
        <Button
          onClick={() => setDuration(45)}
          className={`mr-4 ${duration !== 45 && "opacity-70"}`}
        >
          45
        </Button>
        <Button
          onClick={() => setDuration(60)}
          className={`mr-4 ${duration !== 60 && "opacity-70"}`}
        >
          60
        </Button>
      </div>
    </div>
  );
};

export default Duration;
