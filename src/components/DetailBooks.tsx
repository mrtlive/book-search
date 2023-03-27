import React from "react";
import Modal from "react-modal";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { fetchMangaById } from "../api/fetchManga";
import { Books, BooksResponse } from "../types/Books";

type MangaDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "50%",
    bottom: "auto",
    borderRadius: "30px",
    transform: "translate(-50%, -50%)",
  },
};

const DetailBook = ({ isOpen, onClose, id }: MangaDetailProps) => {
  const { data, error, isLoading, isSuccess } = useQuery(["mangaDetail", id], fetchMangaById);

  if (error) return <div>error</div>;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} appElement={document.getElementById("root") as HTMLElement}>
      <div className="w-full flex flex-col items-center justify-center ">
        {isLoading && <div>loading...</div>}
        {isSuccess && data.data && (
          <div className="w-full flex flex-col justify-center items-center">
            <img src={data.data.images.jpg.image_url} alt="book" className="m-1 rounded-3xl " />
            <div className="w-full m-2 text-center">
              <p className="font-bold text-3xl">{data.data.title}</p>
              <p className="font-bold my-3">{data.data.authors[0].name}</p>
              <p className="text-sm">{data.data.synopsis}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DetailBook;
