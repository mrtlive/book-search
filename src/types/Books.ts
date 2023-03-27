export type Books = {
  mal_id: number;
  title: string;
  synopsis: string;
  authors: {
    name: string;
  }[];
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
    };
  };
  score: number;
  url: string;
  volumes: number;
  type: string;
};

export type ReccomendedManga = {
  mal_id: number;
  title: string;
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
      };
    };
    image_url: string;
    title: string;
  }[];
  date: string;
  content: string;
};

export type ReccomendedMangaResponse = {
  data: ReccomendedManga[];
};

export type BooksResponse = {
  data: Books;
};
