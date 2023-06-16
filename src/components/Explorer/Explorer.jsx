import React from 'react';
import explorer from '../../data/folder-structure.json';
import Folder from '../Folder/Folder';

const Explorer = () => {
  return (
    <div style={{ marginLeft: '1rem' }}>
      <Folder explorer={explorer} margin={0} />
    </div>
  );
};

export default Explorer;
