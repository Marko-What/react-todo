import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import  axios  from 'axios';
import moment from "moment";


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

 
  const backendServerAddress = "https://34.66.193.231/api/v1/opravilo";
//const backendServerAddress = "http://127.0.0.1"+ PORT+ "/api/v1/opravilo/";
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      }
    } 
    // Actions

    async function getTodos() {
      try {                          
        const res = await axios.get(backendServerAddress, config);
          dispatch({
            type: 'GET_TODOS',
            payload: res.data
          }); 
          } catch(err) {
            dispatch({
              type: 'GET_TODOS_ERROR',
              payload: err
            });
          }
    }


  
    async function deleteTodo(id) {

      try {                           
        await axios.delete(backendServerAddress +'/'+id);
          dispatch({
            type: 'DELETE_TODO',
            payload: id
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err
          });
        }

    }




  
    async function addTodo(todo) {      
      try {                            
        const res =  await axios.post(backendServerAddress, todo, config);
          dispatch({
            type: 'ADD_TODO',
            payload: res.data
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err
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
      //const date_create = moment().format("YYYY-MM-DD");  
      todo.completed === true ? todo.datumZakljucevanja = moment().format("YYYY-MM-DD") : todo.datumZakljucevanja = null;

     
      try {                            
       const res = await axios.put(backendServerAddress +'/'+ todo.id, todo, config);
       
          dispatch({
            type: 'CHANGE_COMPLETED',
            payload: res.data.id
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err
          });
        }

       
    }






    async function changeAddEdit(todo) {
     
      try {                           
       const res = await axios.put(backendServerAddress +'/'+todo.id, todo, config);
          dispatch({
            type: 'CHANGE_ADD_COMPLETED',
            payload: res.data
          }); 
        } catch(err) {
          dispatch({
            type: 'GET_TODOS_ERROR',
            payload: err
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
