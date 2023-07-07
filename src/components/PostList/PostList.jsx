import React, { useState, useEffect } from 'react';
import './PostList.css';
import Skeleton from '../Skeleton/Skeleton';
import Post from '../Post/Post';
import Alert from '../Alert/Alert';
import { useFetchCustom } from '../../hooks/useFetch';

const LIMIT = 10;

export default function PostList() {
  const [page, setPage] = useState(1);
  const { data, error, loading } = useFetchCustom(
    `https://jsonplaceholder.typicode.com/photos?_limit=${LIMIT}&_page=${page}`,
    page
  );
  console.log({ data, error, loading });

  const trackScrollPosition = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    // console.table({ scrollHeight, scrollTop, innerHeight });

    /* to satisfy the below if condition
          - add one to scrollTop or
          - subtract one from scrollHeight
       because sometime either of the above three values can be in decimal thereby not satisfying the below if condition
       you have to check for your case by logging those values in the console
    */
    if (innerHeight + scrollTop >= scrollHeight - 1) {
      console.log('here');
      setPage((prevPageNum) => prevPageNum + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', trackScrollPosition);

    return () => {
      window.removeEventListener('scroll', trackScrollPosition); //remove this and check
    };
  }, []);

  return (
    <div className="post-list-wrapper">
      <h1>Your personalized curated list</h1>
      <hr />
      <div className="post-list">
        {error && (
          <Alert>
            Something went wrong. Please check your Network Connection - {error}
          </Alert>
        )}

        {loading === 'loading' &&
          Array(LIMIT)
            .fill(Skeleton)
            .map((Component, index) => <Component key={index} />)}

        {loading === 'loaded' &&
          data.map((elem, index) => {
            return <Post key={index} elem={elem} />;
          })}
      </div>
    </div>
  );
}
