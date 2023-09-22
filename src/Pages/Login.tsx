import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../Context/authContext";

const Login = () => {
  const authUser = useContext(authContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      username,
      password,
    };
    setIsLoading(true);
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      authUser?.login(data);
      setIsLoading(false);
    }
    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
    }
  };
  return (
    <form className="signup-login-form" id="login-form" onSubmit={login}>
      <h1>Log In</h1>

      <input
        type="text"
        placeholder="Enter your Username"
        value={username}
        onChange={handleUsername}
      />

      <input
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={handlePassword}
      />

      <button disabled={isLoading}>
        {isLoading ? "Signing In..." : "Login"}
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      {!error ? (
        ""
      ) : (
        <p className="error-message" id="error-message-1">
          {error}
        </p>
      )}
    </form>
  );
};

export default Login;
