import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { authContext } from "../Context/authContext";
import { animeContext } from "../Context/animeContext";

const RootLayout = () => {
  const auth = useContext(authContext);
  const context = useContext(animeContext);

  const logout = () => {
    context?.clearData();
    auth?.logout();
  };

  return (
    <div className="root-layout">
      <nav>
        <div>
          <NavLink to="/">
            <h1>Anime WatchList</h1>
          </NavLink>
        </div>
        {auth?.user ? (
          <div className="right-side-nav">
            <h2>{auth?.user.user}</h2>

            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="right-side-nav">
            <NavLink to="/login">
              <h2>Login</h2>
            </NavLink>
            <NavLink to="/signup">
              <h2>Sign Up</h2>
            </NavLink>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
