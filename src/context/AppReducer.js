export default (state, action) => {

    switch(action.type) {

      case 'GET_TODOS':
        console.log("GET_TODOS: " + JSON.stringify(action.payload));
        return {
          ...state,
          loading:false,
        todos: action.payload
      }

      case 'GET_TODOS_ERROR':
        return {
          ...state,
          error: action.payload
      }
      
      case 'DELETE_TODO':
        return {
            ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        }

      case 'EDIT_TODO':
        console.log("EDIT_TODO: "+ JSON.stringify(action.payload));
        return { 
            todos:state.todos,
            idEdit: state.todos.filter(todo => todo.id == action.payload)
        }
        
      case 'CHANGE_COMPLETED':
          return {
            ...state,
          /*  todos: state.todos.map((todo => {
                // editing one item
                if (todo.id ===  action.payload) {
                  return Object.assign({}, todo, { completed: !todo.completed })
                }
                // return all the ones we're not changing
                return todo
              }))
           */
          todos: state.todos
        }  


      case 'CHANGE_ADD_COMPLETED':
        console.log("newTodo changeAddEdit CHANGE_ADD_COMPLETED:"+JSON.stringify(action.payload));
        return {
          ...state,
          idEdit:{},
          todos: state.todos.map((todo => {
              // editing one item
              if (todo.id ===  action.payload.id) {
                return Object.assign({}, {
                  ...action.payload
                 /* id:action.payload.id,
                  naziv:action.payload.naziv,
                  oseba:action.payload.oseba,
                  opis:action.payload.opis,
                  dateCompleted:action.payload.dateCompleted,
                  completed:action.payload.completed */
                })
              }
              // return all the ones we're not changing
              return todo
            }))
          
      } 


      case 'ADD_TODO':
        return {
            ...state,
            todos: [action.payload, ...state.todos],
            idEdit:{}
        }
        
      default:
        return state;
    }
  }