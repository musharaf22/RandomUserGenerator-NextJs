import React from "react";

const Loading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-[3rem]">Loadeing....</h1>
      {children}
    </div>
  );
};

export default Loading;
