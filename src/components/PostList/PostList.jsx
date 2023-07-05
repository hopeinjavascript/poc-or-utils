import React, { useState, useEffect } from 'react';
import './PostList.css';
import Skeleton from '../Skeleton/Skeleton';
import Post from '../Post/Post';

const LIMIT = 10;

export default function PostList() {
  const [loading, setLoading] = useState('loading');

  useEffect(() => {
    // imitating delay
    setTimeout(() => {
      setLoading('loaded');
    }, 3000);
  }, []);

  return (
    <div className="post-list-wrapper">
      <h1>Your personalized curated list</h1>
      <hr />
      <div className="post-list">
        {loading === 'loading' &&
          Array(LIMIT)
            .fill(Skeleton)
            .map((Component, index) => <Component key={index} />)}

        {loading === 'loaded' &&
          Array(LIMIT)
            .fill(Post)
            .map((Component, index) => (
              <Component key={index} counter={index} />
            ))}
      </div>
    </div>
  );
}
