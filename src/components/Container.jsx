import React from "react";

const Container = ({ children }) => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div>{children}</div>
    </main>
  );
};

export default Container;
