import React from 'react';
import './Folder.css';
/*
Features:
Collapse all
Expand all
*/
const Folder = ({ explorer, margin }) => {
  const { name, isFolder, items } = explorer;

  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleClick = () => setIsCollapsed(!isCollapsed);
  const handleRefresh = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <span
        className={isFolder ? 'folder' : 'file'}
        style={{
          // marginLeft: `${margin}rem`,
          marginBottom: `1rem`,
        }}
        onClick={handleClick}
      >
        {isFolder && (isCollapsed ? '+' : '-')}
        {name}
      </span>
      {/* <span className="refresh" onClick={handleRefresh}>
        Refresh
      </span> */}
      {/* items.length !== 0 then only updated margin viz. margin + 1 will get applied */}
      <div
        style={{
          borderLeft: '1px solid black',
          // marginLeft: `${1}rem`,
          paddingLeft: `1rem`,
        }}
      >
        {!isCollapsed &&
          items.map((item) => {
            return (
              <Folder key={item.name} explorer={item} margin={margin + 1} />
            );
          })}
      </div>
    </>
  );
};

export default Folder;
