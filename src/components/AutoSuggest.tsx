import React, { useState, useRef } from "react";
import debounce from "lodash/debounce";
import { Books } from "../types/Books";
const MovieSearch = ({ handleMangaId, setIsOpen }: { handleMangaId: (id: number) => void; setIsOpen: (isOpen: boolean) => void }) => {
  const [value, setValue] = useState("");
  const [bookResults, setbookResults] = useState<Books[]>([]);
  const [selectedResult, setSelectedResult] = useState<Books | null>(null); // <-- add state for selected result
  const debouncedGetResults = useRef(
    debounce(async (inputValue: string) => {
      const results = await getResults(inputValue);
      setbookResults(results);
    }, 1000)
  ).current;

  const getResults = async (inputValue: string) => {
    if (!inputValue) return;
    const inputValueLowercase = inputValue.toLowerCase();
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${inputValueLowercase}`);
      const data = await response.json();
      console.log("ben calısıyorum");
      return data.data.slice(0, 15);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (inputValue.length > 3) {
      debouncedGetResults.cancel();
      debouncedGetResults(inputValue);
    } else {
      setbookResults([]);
    }
    setSelectedResult(null); // <-- reset selected result when input value changes
  };

  const renderResults = (books: Books) => (
    <div
      className=" pb-2 items-center justify-center flex flex-col text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      key={books.mal_id}
      onClick={() => {
        setIsOpen(true);
        handleMangaId(books.mal_id);
        setSelectedResult(books); // <-- update selected result when a result is clicked
        setValue("");
      }}
    >
      <img src={`${books.images.jpg.image_url}`} alt={books.title} className="rounded-xl w-44 h-44 object-cover object-top" />
      <div>
        <p>{books.title}</p>
        <p className="text-xs text-gray-400">{books.authors[0]?.name}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full justify-center flex flex-col items-center">
      <input
        placeholder="Search for a movie 🔎"
        className="w-1/2 flex justify-center items-center border border-gray-400 rounded-full p-5 my-5"
        value={value}
        onChange={handleInputChange}
      />

      {bookResults.length > 0 &&
        value.length > 3 &&
        !selectedResult && ( // <-- check if a result has been selected before rendering the results panel
          <div className="w-full grid gap-2 grid-cols-5 py-5 my-5 ">{bookResults.map((movie) => renderResults(movie))}</div>
        )}
    </div>
  );
};

export default MovieSearch;
