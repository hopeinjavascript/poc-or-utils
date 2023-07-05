import React from 'react';
import './Post.css';

let text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

const Post = ({ counter }) => {
  return (
    <div className="post-wrapper">
      <div className="post-img-container">
        <img src={`//unsplash.it/${200 + counter}`} alt="pic" />
      </div>
      <div className="post-container">
        <div className="post-avatar-container">
          <img
            className="post-avatar"
            src={`//unsplash.it/${100 + counter}`}
            alt="pic"
          />
        </div>
        <div className="post-info">
          <p className="post-title">{text.slice(0, 35)}...</p>
          <p className="post-channel-name">John Doe</p>
          <p className="post-meta">141K views 5 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
