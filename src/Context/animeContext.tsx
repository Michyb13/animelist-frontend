import { ReactNode, createContext, useState } from "react";
interface AnimeContextProps {
  anime: Anime[];
  allAnime: (response: Anime[]) => void;
  createAnime: (response: Anime) => void;
  deleteAnime: (response: Anime) => void;
  clearData: () => void;
}
type ContextProps = {
  children: ReactNode;
};

type Anime = {
  _id: string;
  name: string;
  genre: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const animeContext = createContext<AnimeContextProps | null>(null);

const AnimeContextProvider = (props: ContextProps) => {
  const [anime, setAnime] = useState<Anime[]>([]);

  const allAnime = (response: Anime[]) => {
    setAnime(response);
  };

  const createAnime = (response: Anime) => {
    setAnime((prev) => {
      return [response, ...prev];
    });
  };

  const deleteAnime = (response: Anime) => {
    const filter = anime.filter((a) => a._id !== response._id);
    setAnime(filter);
  };

  const clearData = () => {
    setAnime([]);
  };

  const exported = {
    anime,
    allAnime,
    createAnime,
    deleteAnime,
    clearData,
  };

  return (
    <animeContext.Provider value={exported}>
      {props.children}
    </animeContext.Provider>
  );
};

export default AnimeContextProvider;
