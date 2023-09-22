import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AnimeContextProvider from "./Context/animeContext";
import AuthContextProvider from "./Context/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AnimeContextProvider>
        <App />
      </AnimeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
