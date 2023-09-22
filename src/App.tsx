import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";

import RootLayout from "./components/RootLayout";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { authContext } from "./Context/authContext";

function App() {
  const auth = useContext(authContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/dashboard"
          element={!auth?.user ? <Navigate to="/login" /> : <Dashboard />}
        />
        <Route
          path="/login"
          element={auth?.user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={auth?.user ? <Navigate to="/dashboard" /> : <Signup />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
