import React, { createContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';
import  axios  from 'axios';


// Initial state
const initialState = {
    todos: [],
    idEdit:{},
    error: null,
    loading: true  
    
  }


  // Create context
export const GlobalContext = createContext(initialState);


// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
  

    const backendServerAddress = "http://127.0.0.1:8000/api/opravilo/";
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      }
    } 
    // Actions

    async function getTodos() {
      try {                             /** hardcoded !!*/
        const res = await axios.get(backendServerAddress);
          console.log("getTodosaaa" + res);
          dispatch({
            type: 'GET_TODOS',
            payload: res.data
          }); 
          } catch(err) {
            dispatch({
              type: 'GET_TODOS_ERROR',
              payload: err.response.data.error
            });
          }
    }


  
    async function deleteTodo(id) {

      try {                             /** hardcoded !!*/
        await axios.delete(backendServerAddress + id);
          dispatch({
            type: 'DELETE_TODO',
            payload: id
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err.response.data.error
          });
        }

    }




  
    async function addTodo(todo) {
      console.log("addTodo: " + JSON.stringify(todo));
      
      try {                             /** hardcoded !!*/
        const res =  await axios.post(backendServerAddress, todo, config);
        console.log("addTodo: res" + JSON.stringify(res));
          dispatch({
            type: 'ADD_TODO',
            payload: res.data
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err.response.data.error
          });
        }


    }




    function editTodo(id) {
        dispatch({
          type: 'EDIT_TODO',
          payload: id
        });
    }





    async function changeTCompleted(todo) {
      
      todo.completed = !todo.completed;
      todo.datumZakljucevanja = "2020-11-17";
      console.log("changeTCompleted:  " + JSON.stringify(todo));
      try {                             /** hardcoded !!*/
       const res = await axios.put(backendServerAddress + todo.id, todo, config);
       console.log("checked: resA:  " + JSON.stringify(res));
       console.log("checked:  ididididi:  " + res.data.id);
          dispatch({
            type: 'CHANGE_COMPLETED',
            payload: res.data.id
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err.response.data.error
          });
        }

       
    }






    async function changeAddEdit(todo) {
      console.log("newTodo changeAddEdit :" + JSON.stringify(todo));
      todo.datumZakljucevanja ="2020-11-17";
      try {                           
       const res = await axios.put(backendServerAddress + todo.id, todo, config);
        console.log("newTodo changeAddEdit :" +res);
          dispatch({
            type: 'CHANGE_ADD_COMPLETED',
            payload: res.data
          }); 
        } catch(err) {
          console.log("newTodo changeAddEdit err :" +err);
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err.response.data.error
          });
        }

     
  }
    
  
    return (<GlobalContext.Provider value={{
      todos: state.todos, editTodoId:state.idEdit, error:state.error, loading:state.loading,
      deleteTodo,
      addTodo,
      editTodo,
      changeTCompleted,
      changeAddEdit,
      getTodos
    }}>
      {children}
    </GlobalContext.Provider>);
  }