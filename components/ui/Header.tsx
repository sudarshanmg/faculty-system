import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold text-center my-8">
      {text}
    </h1>
  );
};

export default Header;
