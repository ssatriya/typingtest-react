import React from "react";

const Container = ({ children }) => {
  return (
    <main className="mx-8 min-h-screen flex justify-center items-center">
      <div>{children}</div>
    </main>
  );
};

export default Container;
