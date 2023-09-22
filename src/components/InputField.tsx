import { useState, useContext } from "react";
import { animeContext } from "../Context/animeContext";
import { authContext } from "../Context/authContext";

const InputField = () => {
  const context = useContext(animeContext);
  const auth = useContext(authContext);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState<number>();
  const [isLoading, SetIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setGenre(value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    setYear(valueAsNumber);
  };

  const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      name: name,
      genre: genre,
      year: year,
    };
    SetIsLoading(true);
    const response = await fetch("http://localhost:4000/anime", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth?.user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      context?.createAnime(data);
      setName("");
      setGenre("");
      setYear(0);
      setError("");
      SetIsLoading(false);
    }
    if (!response.ok) {
      setError(data.message);
      SetIsLoading(false);
    }
  };
  return (
    <form className="create-form" onSubmit={submitForm}>
      <div className="label-input">
        <label>Anime Title</label>
        <input type="text" onChange={handleNameChange} value={name} />
      </div>
      <div className="label-input">
        <label>Genre</label>
        <input type="text" onChange={handleGenreChange} value={genre} />
      </div>
      <div className="label-input">
        <label>Year of Release</label>
        <input type="number" onChange={handleYearChange} value={year} />
      </div>
      <button className="form-button" disabled={isLoading}>
        {isLoading ? "Creating..." : "Add Anime"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default InputField;
