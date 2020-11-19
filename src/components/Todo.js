import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const Todo = ({todo}) => {

    const {deleteTodo, editTodo, changeTCompleted} = useContext(GlobalContext);


    return (
        <div>
             <li key={todo.id} className={todo.completed ? "done":""}>
            <div> id: {todo.id}</div>
            <div> naziv: {todo.naziv}</div>
            <div>oseba:  {todo.oseba}</div>
            <div>opis:  {todo.opis}</div>
            <div>dateCompleted:  {todo.dateCompleted}</div>
            <div>completed: <input type="checkbox" checked={todo.completed} onChange={() => changeTCompleted(todo)}/></div>
            <button onClick={() => deleteTodo(todo.id)}>delete todo</button>
            <button onClick={() => editTodo(todo.id)}>edit todo</button>
            </li>
        </div>
    )
}
