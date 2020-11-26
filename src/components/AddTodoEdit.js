import React, {useContext, useState, useEffect}  from 'react'
import {GlobalContext} from '../context/GlobalState';

import { useForm } from 'react-hook-form';

import '../css/AddTodoEdit.css';


export const AddTodoEdit = () => {

  const { register, handleSubmit, errors } = useForm();

    const {addTodo, editTodoId, changeAddEdit} = useContext(GlobalContext);

    const [formData, setFormData] = useState({});

    function inputTyping(event){ 
      setFormData(formData => ({
            ...formData,    
          [event.target.name]: event.target.value    
        
        }))
    };


    const onSubmit = data => {
    //     e.preventDefault();
      Object.keys(editTodoId).length === 0 ?  addTodo(data)  :  changeAddEdit(formData);
      setFormData( {"naziv":"","oseba":"","opis":""});
    }






    useEffect(()=>{
     
     Object.keys(editTodoId).length !== 0 ?  setFormData(...editTodoId)  :  setFormData( {"naziv":"","oseba":"","opis":""});

      },[editTodoId]);

    
    return (
        <div>
            <h2>AddTodoEdit</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control">
            <label htmlFor="naziv">naziv</label><br />
            <input type="text"  value={formData.naziv} onChange={(e) => inputTyping(e)} name="naziv" ref={register({ required: 'naziv name is required', minLength:{value:3, message:"Too Short"} })} placeholder="Enter text..." />
                <div className="errorsClass"> {errors.naziv && <p>{errors.naziv.message}</p>}  </div>
           </div>

            <div className="form-control">
            <label htmlFor="oseba">oseba</label><br />
            <input type="text" value={formData.oseba} onChange={(e) => inputTyping(e)} name="oseba" ref={register({ required: 'oseba name is required', minLength:{value:3, message:"Too Short"} })} placeholder="Enter text..." />
                  <div className="errorsClass">  {errors.oseba && <p>{errors.oseba.message}</p>} </div>
            </div>

            <div className="form-control">
            <label htmlFor="opis">opis</label><br />
            <textarea type="text" value={formData.opis} onChange={(e) => inputTyping(e)} name="opis" ref={register({ required: 'opis name is required', minLength:{value:3, message:"Too Short"} })} placeholder="Enter text..." />
             <div className="errorsClass"> {errors.opis && <p>{errors.opis.message}</p>} </div>
            </div>

            <button className="AdEdit">  {Object.keys(editTodoId).length == 0 ? "Add todo" : "Edit Todo"  }</button>
            
            </form>
        </div>
    )
}
