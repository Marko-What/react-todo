import React, {useContext, useEffect } from 'react'
import { Todo } from './Todo';
import {GlobalContext} from '../context/GlobalState';


export const TodoList = () => {

    const {todos, getTodos} = useContext(GlobalContext);

    useEffect(()=>{
        getTodos();
        // esLint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  
    return (
        <div>
            <h2>todoList</h2>
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
            ))}
           
        </div>
    )
}
