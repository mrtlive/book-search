import React from "react";

const Header = () => {
  return (
    <>
      <div
        className="bg-gray-800 text-white  text-center items-center justify-center text-3xl font-bold uppercase py-4 flex h-44"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundImage: `url("https://64.media.tumblr.com/08af87a3af1336766535615e1b1f1dea/tumblr_poo8d3bpat1ttp01so1_1280.jpg")`,
        }}
      >
        <h1> Manga Search </h1>
      </div>
    </>
  );
};

export default Header;
