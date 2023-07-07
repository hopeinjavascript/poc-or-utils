import { useState } from 'react';
import './Queue.css';
import { mySlice } from '../../helpers';

// Queue without in-built methods -> very low-level

const Queue = ({ maxSize = 5 }) => {
  const [queueItems, setQueueItems] = useState([]);
  const [count, setCount] = useState(0);

  const handleEnqueue = () => {
    setQueueItems((prevQueueItems) => [
      ...prevQueueItems,
      Number(Math.random().toString().split('.')[1].slice(0, 3)) + count + 1,
    ]);

    setCount((prevCount) => prevCount + 1);
  };

  const handleDequeue = () => {
    let dequeuedItem = queueItems[0];

    let updatedQueueItems = mySlice(queueItems, 1);

    console.log({ dequeuedItem, updatedQueueItems });
    setQueueItems(updatedQueueItems);
    setCount((prevCount) => prevCount - 1);
  };

  const handleClear = () => {
    setQueueItems([]);
    setCount(0);
  };

  //helpers
  const size = () => count;

  const isEmpty = () => count === 0;

  const isFull = () => count === maxSize;

  return (
    <div className="wrapper queue-wrapper">
      <h2>
        Max Queue Size : {maxSize} | Count: {size()} | isEmpty:{`${isEmpty()}`}{' '}
        | isFull:{`${isFull()}`}
      </h2>
      <div className="controls">
        <button
          type="button"
          className="btn btn-add"
          onClick={handleEnqueue}
          disabled={isFull()}
        >
          Enqueue
        </button>
        <button
          type="button"
          className="btn btn-add"
          onClick={handleDequeue}
          disabled={isEmpty()}
        >
          Dequeue
        </button>
        <button
          type="button"
          className="btn btn-add"
          onClick={handleClear}
          disabled={isEmpty()}
        >
          Clear
        </button>
      </div>

      {/* {queueItems.length ? ( */}
      <div className="queue-container" style={{ width: maxSize * 55 - 5 }}>
        {queueItems.length
          ? [...queueItems].map((item, index, arr) => {
              return (
                item && (
                  <span
                    key={item}
                    className="queue-item"
                    data-before={`${index}`}
                  >
                    {item}
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

export default Queue;
