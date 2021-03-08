import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function Login({ history }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }
      setUser(data);
    } catch (err) {
      setError("Something went wrong" + err);
    }
  };
  return (
    <div>
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <button>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
