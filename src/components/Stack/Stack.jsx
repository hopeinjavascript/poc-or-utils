import { useState } from 'react';
import './Stack.css';
import { mySlice } from '../../helpers';

let poppedItem;
const Stack = ({ maxSize = 5 }) => {
  const [stackItems, setStackItems] = useState([]);
  const [count, setCount] = useState(0);

  const handlePush = () => {
    setStackItems((prevStackItems) => [
      ...prevStackItems,
      Number(Math.random().toString().split('.')[1].slice(0, 3)) + count + 1, // (1.) doesn't work properly because of sorting
    ]);

    setCount((prevCount) => prevCount + 1);
  };

  const handlePop = () => {
    poppedItem = stackItems[count - 1];

    // setStackItems((prevStackItems) => prevStackItems.slice(0, -1));
    // const updatedStackItems = stackItems.filter((item, index) => {
    //   // return count - 1 !== index; // implicit
    //   if (count - 1 !== index) return item; // explicit
    // });

    let updatedStackItems = mySlice(stackItems, 0, stackItems.length - 1);

    console.log({ poppedItem, updatedStackItems });
    setStackItems(updatedStackItems);
    setCount((prevCount) => prevCount - 1);
  };

  const handleClear = () => {
    setStackItems([]);
    setCount(0);
  };

  //helpers
  const size = () => count;

  const isEmpty = () => count === 0;

  const isFull = () => count === maxSize;

  const peek = () => (!isEmpty() ? stackItems[count - 1] : null);

  return (
    <div className="wrapper stack-wrapper">
      <h1 className="heading">Stack</h1>
      <h2>
        Max Size: {maxSize} | Count: {size()} | isEmpty: {`${isEmpty()}`} |
        isFull: {`${isFull()}`} | Peek: {peek() ?? `${peek()}`}
        {/* | Last popped: {poppedItem} */}
      </h2>
      <div className="controls">
        <button type="button" onClick={handlePush} disabled={isFull()}>
          Push
        </button>
        <button type="button" onClick={handlePop} disabled={isEmpty()}>
          Pop
        </button>
        <button type="button" onClick={handleClear} disabled={isEmpty()}>
          Clear
        </button>
      </div>

      {/* {stackItems.length ? ( */}
      <div className="stack-container" style={{ height: maxSize * 55 }}>
        {stackItems.length
          ? [...stackItems]
              // .sort((a, b) => b - a) // removed because of pop logic -> refer (1.)
              .map((item, index, arr) => {
                return (
                  item && (
                    <span
                      key={item}
                      className="stack-item"
                      data-before={`index - ${count - index - 1}`} // little trick to adjust the index on descending sorted list
                    >
                      {/* (2.)  */}
                      {arr[count - index - 1]}
                    </span>
                  )
                );
              })
          : null}
      </div>
      {/* // ) : null} */}
    </div>
  );
};

export default Stack;
