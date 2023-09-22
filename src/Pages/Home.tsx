import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <div>
        <img src="https://e1.pxfuel.com/desktop-wallpaper/196/276/desktop-wallpaper-anime-icon-posted-by-ryan-peltier-aesthetic-anime-icons.jpg" />
        <h1>Anime WatchList</h1>
      </div>
      <h3>
        Do you ever see a nice anime that you want to watch but forget about it
        after a few days? You probably have, all of us have. But not any more.
        With Anime WatchList, you can add any anime you plan on watching and
        even check them off after you're done watching them.
      </h3>

      <p>
        Sign Up for a free account <Link to="/signup">here</Link>
      </p>
      <p>
        If you already have an account, Login in to your account{" "}
        <Link to="/login">here</Link>
      </p>
    </div>
  );
};

export default Home;
