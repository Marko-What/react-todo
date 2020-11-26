import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

import '../css/Todo.css';

export const Todo = ({todo}) => {

    const {deleteTodo, editTodo, changeTCompleted} = useContext(GlobalContext);


    return (
        <div className="todoContainer">
             <li key={todo.id} className="liTodo">
            <div className="todoId"> id: {todo.id}</div>
            <div className="todoNaziv">{todo.naziv}</div>
	    <div className={todo.completed ? 'done':'todoOpis'}>{todo.opis}</div>
            <div className="todoOseba"><span className="by">by: </span>  {todo.oseba}</div>
<br />
            <div className={todo.completed ? 'completedDate':'todoDateCompleted'}>completed:  <span className="date">{todo.datumZakljucevanja }</span></div>

<br />
            <div className="todoCompleted"><input type="checkbox" checked={todo.completed} onChange={() => changeTCompleted(todo)}/> completed</div>

<br />
	<div className="todoButtons">
            <button onClick={() => deleteTodo(todo.id)} className="todoButton Delete">delete todo</button>
            <button onClick={() => editTodo(todo.id)} className="todoButton Edit">edit todo</button>
        
	</div>
    
	</li>
        </div>
    )
}
