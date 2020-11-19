import React, {useContext, useState, useEffect}  from 'react'
import {GlobalContext} from '../context/GlobalState';

import { useForm } from 'react-hook-form';


export const AddTodoEdit = () => {

  const { register, handleSubmit, errors } = useForm();

    const {addTodo, editTodoId, changeAddEdit} = useContext(GlobalContext);
    /* mogoce bo treba object na context  */
    /*const [id, setId] = useState('');
    const [naziv, setNaziv] = useState('');
    const [oseba, setOseba] = useState('');
    const [opis, setOpis] = useState('');
    const [editTodoB, setEditTodoB] = useState(false);
    */
    /* mogoce bo treba object na context  */
    const [formData, setFormData] = useState({});

    function inputTyping(event){ 
    //  [event.target.name]: event.target.value,
        console.log("inputTyping: " +JSON.stringify(event.target.name));
     //   let ss = formData();
   
     setFormData(formData => ({
          ...formData,    
         [event.target.name]: event.target.value    
      
      }))
   
    };


    const onSubmit = data => {
    //     e.preventDefault();
    console.log("onSubmit: " + JSON.stringify(data));
    console.log("onSubmit:formData " + JSON.stringify(formData));
       


      Object.keys(editTodoId).length == 0 ?  addTodo(data)  :  changeAddEdit(formData);
      setFormData( {"naziv":"","oseba":"","opis":""});
          

    }






    useEffect(()=>{
        console.log("editTodoId: "+JSON.stringify(editTodoId[0]));
        // editTodo should toggle button add to edit and populate input fields with appropriate value
   /*     setId(editTodoId[0].id);
        setNaziv(editTodoId[0].naziv);
        setOseba(editTodoId[0].oseba);
        setOpis(editTodoId[0].opis);
        setEditTodoB(true);
      */
     /* refactpr */ 
     if(Object.keys(editTodoId).length !== 0){ setFormData(...editTodoId)
      console.log("formData: "+JSON.stringify(formData)); 
    }
     
      },[editTodoId]);

    
    return (
        <div>
            <h2>AddTodoEdit</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control">
            <label htmlFor="naziv">naziv</label>
            <input type="text"  value={formData.naziv} onChange={(e) => inputTyping(e)} name="naziv" ref={register({ required: 'naziv name is required', minLength:{value:3, message:"Too Short"} })} placeholder="Enter text..." />
                      {errors.naziv && <p>{errors.naziv.message}</p>}
           </div>

            <div className="form-control">
            <label htmlFor="oseba">oseba</label>
            <input type="text" value={formData.oseba} onChange={(e) => inputTyping(e)} name="oseba" ref={register({ required: 'oseba name is required', minLength:{value:3, message:"Too Short"} })} placeholder="Enter text..." />
                    {errors.oseba && <p>{errors.oseba.message}</p>}
            </div>

            <div className="form-control">
            <label htmlFor="opis">opis</label>
            <input type="text" value={formData.opis} onChange={(e) => inputTyping(e)} name="opis" ref={register({ required: 'opis name is required', minLength:{value:3, message:"Too Short"} })} placeholder="Enter text..." />
                  {errors.opis && <p>{errors.opis.message}</p>} 
            </div>

            <button className="btn">  {Object.keys(editTodoId).length == 0 ? "Add todo" : "Edit Todo"  }</button>
            
            </form>
        </div>
    )
}
