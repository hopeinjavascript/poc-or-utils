import React from 'react';
import './Post.css';

const Post = ({ elem }) => {
  return (
    <div className="post-wrapper">
      <div className="post-img-container">
        <img src={elem.url} alt="pic" />
      </div>
      <div className="post-container">
        <div className="post-avatar-container">
          <img className="post-avatar" src={elem.thumbnailUrl} alt="pic" />
        </div>
        <div className="post-info">
          <p className="post-title">{elem.title?.slice(0, 35)}...</p>
          <p className="post-channel-name">John Doe</p>
          <p className="post-meta">141K views 5 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
