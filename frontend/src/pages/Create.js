import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function Create() {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const baseURI = "http://localhost:1337";

  const reset = () => {
    setFile(null);
    setDescription("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Pleases login");
      return;
    }
    if (!description) {
      setError("Please add description");
      return;
    }
    if (!file) {
      setError("Please add file");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ description }));
    formData.append("files.image", file);
    try {
      await fetch(`${baseURI}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });
      // const data = await response.json()
    } catch (err) {
      setError(err);
    }
    reset();
  };
  return (
    <div className="Create">
      <h2>Create</h2>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setError("");
            setDescription(e.target.value);
          }}
          value={description}
        />
        <input
          type="file"
          placeholder="Add file"
          onChange={(e) => {
            setError("");
            setFile(e.target.files[0]);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Create;
