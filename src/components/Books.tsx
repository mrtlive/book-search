import React from "react";
import { useState } from "react";
import Cards from "./Cards";

const Book: React.FC = () => {
  const [searchingText, setSearchingText] = useState("");
  // set selected mangaid and send to component DetailBook and function

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchingText = e.target.value;
    setSearchingText(searchingText);
  };

  return (
    <>
      <Cards searchingText={searchingText} />
    </>
  );
};

export default Book;
