export default (state, action) => {

    switch(action.type) {

      case 'GET_TODOS':
        return {
          ...state,
          loading:false,
        todos: action.payload.reverse()
      }

      case 'GET_TODOS_ERROR':
        return {
          ...state,
          error: action.payload
      }
      
      case 'DELETE_TODO':
        return {
            ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload),
           idEdit:{}
        }

      case 'EDIT_TODO':
        return { 
            todos:state.todos,
            idEdit: state.todos.filter(todo => todo.id == action.payload)
        }
        
      case 'CHANGE_COMPLETED':
          return {
            ...state,
            todos: state.todos
        }  


      case 'CHANGE_ADD_COMPLETED':
        return {
          ...state,
          idEdit:{},
          todos: state.todos.map((todo => {
            
              if (todo.id ===  action.payload.id) {
                return Object.assign({}, {
                  ...action.payload
                })
              }
              
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