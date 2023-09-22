import { useEffect, useContext } from "react";
import { animeContext } from "../Context/animeContext";
import AnimeItem from "../components/AnimeItem";
import InputField from "../components/InputField";
import { authContext } from "../Context/authContext";

const Dashboard = () => {
  const context = useContext(animeContext);
  const auth = useContext(authContext);
  const anime = context?.anime;
  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch("http://localhost:4000/anime", {
        method: "GET",
        headers: {
          authorization: `Bearer ${auth?.user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        context?.allAnime(data);
      }
    };
    fetchList();
  }, []);

  const render = anime?.map((a) => {
    return (
      <AnimeItem
        key={a._id}
        id={a._id}
        name={a.name}
        genre={a.genre}
        year={a.year}
      />
    );
  });

  return (
    <div className="dashboard-container">
      <div className="items">{render}</div>
      <div className="input">
        <InputField />
      </div>
    </div>
  );
};

export default Dashboard;
