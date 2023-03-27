//fetch top manga
import { QueryFunction, QueryFunctionContext } from "@tanstack/react-query";
import { Books, BooksResponse } from "../types/Books";

const fetchMangaList: QueryFunction<BooksResponse> = async () => {
  const response = await fetch("https://api.jikan.moe/v4/top/manga");
  if (!response.ok) throw new Error("Error");

  return response.json();
};

//fetch manga by id

const fetchMangaById: QueryFunction<BooksResponse, [string, number]> = async ({ queryKey }: QueryFunctionContext<[string, number], unknown>) => {
  const [, id] = queryKey;
  const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);

  if (!response.ok) throw new Error("Error");

  return response.json();
};

const fetchReccomendedManga: QueryFunction<BooksResponse> = async () => {
  const response = await fetch(`https://api.jikan.moe/v4/recommendations/manga`);

  if (!response.ok) throw new Error("Error");

  return response.json();
};

export { fetchMangaList, fetchMangaById, fetchReccomendedManga };
