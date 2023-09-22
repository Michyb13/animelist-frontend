import { useContext, useState } from "react";
import { BsFillTrash3Fill, BsCheckCircleFill } from "react-icons/bs";
import { animeContext } from "../Context/animeContext";
import { authContext } from "../Context/authContext";

type AnimeProps = {
  id: string;
  name: string;
  genre: string;
  year: number;
};

const AnimeItem = (props: AnimeProps) => {
  const context = useContext(animeContext);
  const auth = useContext(authContext);
  const [isComplete, setIsComplete] = useState(false);

  const checkBox = () => {
    setIsComplete((prev) => !prev);
  };

  const deleteAnime = async () => {
    const response = await fetch("http://localhost:4000/anime/" + props.id, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${auth?.user.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      context?.deleteAnime(data);
    }
  };

  return (
    <div className="anime-item-container">
      <span className="empty-check-box" onClick={checkBox}>
        {!isComplete ? "" : <BsCheckCircleFill className="check-mark" />}
      </span>

      <h2>{props.name}</h2>
      <h3>{props.year}</h3>
      <h3>{props.genre}</h3>
      <button className="delete-button" onClick={deleteAnime}>
        <BsFillTrash3Fill />
      </button>
    </div>
  );
};

export default AnimeItem;
