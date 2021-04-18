import React, { useState, useEffect } from "react";
import './App.css';
export default function Home() {
//collect the post-list from localstorage and parse it with JSON.parse() method
const postsData = JSON.parse(localStorage.getItem("posts"));
//initilize our parsed data if there is no data inside our initial state will be set as empty array []
  const [posts, setPosts] = useState(postsData || []);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleMessage = e => {
    setMessage(e.target.value);
  };
  const AddPost = e => {
    e.preventDefault();
    setPosts([...posts, {
        title,
        message
      }
    ]);
    //let clear the input box after adding our post
    setTitle("");
    setMessage("");
  };
  const removePost = (title) => {
     //removePost take title as argument
    //let's reset the post list after filtering post title which are not equal to title
    setPosts(posts.filter(item => item.title !== title));
  };
 
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  });
 
  return (
    <div className="Section__one">
      <div className="container">
        <div className="row">
          <div className="local__storage">
            <h1>React with local storage</h1>
            <form onSubmit={AddPost}>
              <div className="form-container">
                <label htmlFor="title" className="label"> Title </label>
                <input type="text" value={title} onChange={handleTitle} required/>
              </div>
              <div>
                <label htmlFor="message" className="label"> Message</label>
                <textarea type="text" value={message} rows="4" onChange={handleMessage} required />
              </div>
              <button type="submit">Add Post</button>
            </form>
            {posts.map(item => ( 
              //remember to set the key , each item need to have a key
              <div className="post" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <span className="close__buttons">
                  <button onClick={() => removePost(item.title)}>X</button>
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

