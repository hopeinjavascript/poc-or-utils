import React, { useEffect, useState } from 'react';
import CONFIGS from '../../configs/config.json';

const ACTIVE_BUTTON_STYLES = {
  backgroundColor: 'steelblue',
  color: '#f5f5f5',
  transform: 'scale(1.01)',
};

// TODO: Implement Next and Previous for Page and Page Set both
const Todos = () => {
  // DERIVED
  const [todos, setTodos] = useState([]); // derived from fetch request
  const [visibleTodos, setVisibleTodos] = useState([]); // derived from "todos" state
  // DEFAULT
  // default values to use while rendering 1st time should always be set while declaring useState
  // BASIC but worth remembering to save time/plan.
  const [btnCounter, setBtnCounter] = useState(20); // Should be derived? (1.)
  const [todosPerPage, setTodosPerPage] = useState(CONFIGS.TODOS_PER_PAGE);
  const [activeButton, setActiveButton] = useState(true);

  useEffect(() => {
    async function fetchTodos(URL) {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error('Response not OK!');
        const todosData = await res.json();
        setTodos(todosData);
      } catch (error) {
        console.log(error);
      }
    }
    console.log('effect 1');
    fetchTodos(CONFIGS.URL);
  }, []);

  useEffect(() => {
    console.log('effect 2');
    setActiveButton(`active-1`);
    setVisibleTodos(todos.slice(0, CONFIGS.TODOS_PER_PAGE));
  }, [todos]);

  const todosPerPageHandler = (e) => {
    const val = e.target.value;
    setTodosPerPage(val);
    setActiveButton(`active-1`);
    setVisibleTodos(todos.slice(0, val));
    setBtnCounter(todos.length / val);
  };

  const changeTodos = (e) => {
    let pageNo = e.target.innerText,
      end = todosPerPage * pageNo,
      start = end - todosPerPage;
    // console.table({ pageNo, start, end });
    setActiveButton(`active-${pageNo}`);
    setVisibleTodos(todos.slice(start, end));
  };

  // buttons
  const elem = (
    <div className="btns">
      {Array(Math.ceil(btnCounter)) // (1.) ttodos.length / TODOS_PER_PAGE
        .fill()
        .map((el, i) => {
          return (
            <button
              key={i}
              onClick={changeTodos}
              className={
                activeButton === `active-${i + 1}` ? 'btn btn-active' : 'btn'
              }
              // can use above className or below style attribute syntax
              //   {...(activeButton === `active-${i + 1}` && {
              //     style: ACTIVE_BUTTON_STYLES,
              //   })}
            >
              {i + 1}
            </button>
          );
        })}
    </div>
  );

  if (!todos.length) return <h1>Loading...</h1>;

  return (
    <>
      <div className="pagination-wrapper">
        <h2>Client side Pagination</h2>
        <h4>
          Total todos : {todos.length} | Visible todos : {visibleTodos.length} |
        </h4>
        <span> Todos Per Page : </span>
        <select
          name="todosPerPage"
          id="todosPerPage"
          onChange={todosPerPageHandler}
        >
          {CONFIGS.OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {elem}
        {visibleTodos.map((todo) => (
          <p key={todo.id}>
            {todo.id} - {todo.title}
          </p>
        ))}
        {elem}
      </div>
    </>
  );
};

export default Todos;
