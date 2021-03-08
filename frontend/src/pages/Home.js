import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:1337/posts");
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="Home">
      {posts.map((post) => (
        <Link to={`/${post.id}`} key={post.id}>
          <Post
            likes={post.likes}
            description={post.description}
            url={post.image && post.image.url}
          />
        </Link>
      ))}
    </div>
  );
}

export default Home;
