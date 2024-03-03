import React, { useEffect } from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PostItemProps, stateArray } from './lib/interfaces';
import { getPosts, createPost, filterLocation, filterAi } from './lib/api';

import PostItem from './components/PostItem';
import CreatePost from './components/CreatePost';

function App() {
  const [fpOpen, isFpOpen] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostItemProps[]>([]);

  function loadPosts() {
    getPosts()
      .then((data) => {
        setPosts(
          data.map(
            (post) =>
              ({
                title: post.title,
                author: post.author,
                location_city: post.location_city,
                location_state: post.location_state,
                description: post.description
              }) as PostItemProps
          )
        )
      })
  }

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function querySearch() {
    let city = (document.getElementById('search-city') as HTMLInputElement).value;
    let state = (document.getElementById('search-state') as HTMLInputElement).value;
    let prompt = (document.getElementById('search-ai') as HTMLInputElement).value;

    if (prompt === "") {
      filterLocation(state, city)
        .then((data) => {
          setPosts(data);
        })
      
      return
    }

    filterLocation(state, city)
      .then((data) => {
        filterAi(prompt, data)
          .then((lastdata) => {
            const index = data.findIndex(item => item.title == lastdata[0].title);
            if (index > -1) {
              const newList = [...data];
              const [item] = newList.splice(index, 1);
              newList.unshift(item);

              setPosts(newList);
            }
          })
      })
  }

  function addPost(props: PostItemProps) {
    console.log('hi')

    createPost({
      title: props.title,
      author: props.author,
      location_state: props.location_state,
      location_city: props.location_city,
      description: props.description
    }).then(() => {
      loadPosts();
      
    })
  }

  useEffect(loadPosts, []);
  
  return (
    <div className="App">
      
      {isOpen && <CreatePost callback={addPost} closeCallback={toggleIsOpen}/>}

      <button className='create-post' onClick={() => {
        toggleIsOpen();
      }}> Create Post </button>

      <div className="top-section">
          <select id="search-state" className="cp-field-container cp-input">
              {stateArray.map((state) => {
                  return <option value={state}> {state} </option>
              })}
          </select>
        <input id="search-city" className='search-smaller' placeholder='Search city'/>
        <input id="search-ai" className='search-bigger' placeholder='Search posts using AI'/>

        <button className="searchButton" onClick={querySearch}> Search </button>
      </div>

      <div className="postList">
        {posts.map((post) => {
          return <PostItem {...post}/>
        })}
      </div>
    </div>
    );
}

export default App;
