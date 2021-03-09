import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

function Signup({ history }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:1337/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }
      setUser(data);
    } catch (error) {
      setError(error);
      setUser("");
    }
  };
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
