import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../Context/authContext";

const Signup = () => {
  const authUser = useContext(authContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirm(value);
  };

  const signup = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match");
    } else {
      const params = {
        username,
        password,
      };
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/signup", {
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
    }
  };
  return (
    <form className="signup-login-form" onSubmit={signup} id="signup-form">
      <h1>Sign Up</h1>

      <input
        type="text"
        placeholder="Create your Username"
        value={username}
        onChange={handleUsername}
      />

      <input
        type="password"
        placeholder="Create your Password"
        value={password}
        onChange={handlePassword}
      />

      <input
        type="password"
        placeholder="Confirm your Password"
        value={confirm}
        onChange={handleConfirm}
      />

      <button disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
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

export default Signup;
