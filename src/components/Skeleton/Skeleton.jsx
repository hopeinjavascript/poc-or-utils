import React from 'react';
import './Skeleton.css';

export default function Skeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-img-container"></div>
      <div className="skeleton-container">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-info">
          <p className="skeleton-title"></p>
          <p className="skeleton-title sm"></p>
          <p className="skeleton-channel-name"></p>
          <p className="skeleton-meta"></p>
        </div>
      </div>
    </div>
  );
}
