import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMangaList, fetchReccomendedManga } from "../api/fetchManga";
import DetailBook from "./DetailBooks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Books, ReccomendedManga } from "../types/Books";
import MovieAutosuggest from "./AutoSuggest";

const Cards = ({ searchingText }: { searchingText: string }) => {
  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 7,
    centerMode: true,
    swipeToSlide: true,
    stopOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMangaId, setSelectedMangaId] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const { data, isLoading, error, isSuccess } = useQuery(["mangaList"], fetchMangaList);

  const { data: mangaData, isLoading: mangaLoading, error: mangaError, isSuccess: mangaIsSuccess } = useQuery(["reccomendedManga"], fetchReccomendedManga);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMangaId = (id: number) => {
    setSelectedMangaId(id);
  };

  const handleClick = (book: Books) => {
    if (!isDragging) {
      handleMangaId(book.mal_id);
      openModal();
    }
  };

  return (
    <>
      <div className="w-full justify-center flex items-center ">
        <MovieAutosuggest setIsOpen={setIsOpen} handleMangaId={handleMangaId} />
      </div>
      <div className="w-full justify-center items-center ">
        <h1 className="text-3xl font-bold text-center text-gray-800 uppercase tracking-wider mt-10 mb-5">Top Mangas</h1>
        <Slider {...settings}>
          {isLoading && <div>Loading...</div>}
          {isSuccess &&
            Array.isArray(data.data) &&
            data.data
              .filter((book: Books) => book.title.toLowerCase().includes(searchingText.toLowerCase()))
              .map((book: Books) => (
                <div key={book.mal_id}>
                  <div className="flex relative justify-center items-center mx-5 pt-10">
                    <div className="w-64 h-96 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                      <div className="text-slate-100 text-xs w-full h-28 bottom-0 absolute flex justify-center items-end z-20 text-center font-bold p-2 bg-gradient-to-t from-black ">
                        <h3>{book.title}</h3>
                      </div>
                      <img
                        src={book.images.jpg.image_url}
                        alt="book"
                        onClick={() => handleClick(book)}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseLeave={() => setIsDragging(false)}
                        onMouseUp={() => setIsDragging(false)}
                        className="h-96 w-full rounded-t-3xl shadow-xl object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center my-3">
                    <div className="flex justify-center items-center"></div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
      <div className=" bg-white border rounded-lg px-4 py-5 mx-5 shadow-xl">
        <div className="bg-white w-full py-12 flex flex-col justify-center items-center my-5">
          <h1 className="text-4xl font-bold text-gray-800">Discover Your Next Favorite Manga</h1>
          <p className="text-xl text-gray-600">Find and explore thousands of manga series with our easy-to-use search engine.</p>
        </div>
      </div>

      <div className=" bg-white border rounded-lg px-4 py-5 mx-5 my-10 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 uppercase tracking-wider mt-10 mb-5">Reccomended Mangas</h1>

        {mangaLoading && <div>Loading...</div>}
        <div className="flex flex-wrap px-10">
          {mangaIsSuccess &&
            Array.isArray(mangaData.data) &&
            mangaData?.data.slice(0, 10).map((book: ReccomendedManga) => (
              <div key={book.mal_id} className="w-1/2 flex items-center p-5">
                <div className="w-1/12 flex justify-start">
                  <img
                    src={book.entry[0].images.jpg.image_url}
                    className="
                  w-32 object-cover rounded-3xl shadow-xl"
                    alt={book.title}
                  />
                </div>
                <div className="w-11/12 flex flex-col justify-start items-start ml-2">
                  <p className="pl-5 text-2xl font-bold">{book.entry[0].title}</p>
                  <p className="pl-5 text-lg">{book.content.slice(0, 200)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="py-4 px-6 my-5 text-center">
        <div className=" bg-white border rounded-lg px-4 py-5 shadow-lg">
          <p className="text-gray-600 font-bold text-xl pt-5">Subscribe to our newsletter</p>
          <div className="flex flex-col gap-4 items-center justify-center py-10">
            <input type="text" className="w-2/12 border rounded-lg px-2 py-1" placeholder="Enter your email" />
            <button className="w-2/12 bg-blue-500 text-white rounded-lg px-4 py-1 ml-2">Subscribe</button>
          </div>
        </div>
      </div>

      <DetailBook id={selectedMangaId} isOpen={modalIsOpen} onClose={closeModal} />
    </>
  );
};

export default Cards;
