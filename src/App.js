

import { TodoList } from './components/TodoList';
import { AddTodoEdit } from './components/AddTodoEdit';



import { GlobalProvider } from './context/GlobalState';

import './App.css';
import  axios  from 'axios';





function App() {

	

 



  return (
    <div className="App">
      <GlobalProvider>
        <AddTodoEdit />
        <TodoList />
      </GlobalProvider> 
    </div>
  );
}

export default App;
